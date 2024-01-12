# node-exe-demo

This will build (as GH action artifacts) a node-raylib game for win/linux/mac (x86_64.)
It will be standalone (user does not need nodejs or anything else to run your game.)

Steps to use this as a template for your own project:

- Search & Replace "exe-demo" for the name of your program, in all files
- push to github, and it will build. View the "Artifacts" panel on the action-run.

To create a [release](https://github.com/konsumer/node-exe-demo/releases), add a tag to your project, and push. My favorite way to do this is with npm-version:

```
npm version patch
git push
```