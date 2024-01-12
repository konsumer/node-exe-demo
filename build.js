// this will build SEA exe from blob

import { copyFile } from 'fs/promises'
import { exec as _exec } from 'child_process'
import { promisify } from 'util'

const exec = promisify(_exec)

let [,, outName, blobName] = process.argv

if (!outName || !blobName) {
  console.error('Usage: build <OUTPUT_FILE> <BLOB_FILE>')
  process.exit(1)
}

if (process.platform === 'win32') {
  outName += '.exe'
}
await copyFile(process.execPath, outName)

let pj = `postject "${outName}" NODE_SEA_BLOB ${blobName} --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2`

// commented out
// use your sig with https://github.com/marketplace/actions/signtool-code-sign
// if (process.platform === 'win32') {
//   await exec(`signtool remove /s "${outName}"`)
// }

if (process.platform === 'darwin') {
  await exec(`codesign --remove-signature "${outName}"`)
  pj += ' --macho-segment-name NODE_SEA'
}

await exec(pj)

// commented out
// use your sig with https://github.com/marketplace/actions/signtool-code-sign
// if (process.platform === 'win32') {
//   await exec(`signtool sign /fd SHA256 "${outName}"`)
// }

if (process.platform === 'darwin') {
  await exec(`codesign --sign - "${outName}"`)
}
