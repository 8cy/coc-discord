# coc-discord
an improved discord rich presence for coc.nvim

# Usage
1. For the time being, this isn't an official [coc.nvim](https://github.com/neoclide/coc.nvim) plugin. So please download it from the [releases](https://github.com/8cy/coc-discord/releases/latest).
2. Move the entire downloaded folder (should be called `coc-discord` once extracted) into your coc plugins directory. (On Windows, this is usually `C:\Users\${User}\AppData\Local\coc\extensions\node_modules`).
3. Run `$ yarn` or `$ npm i` to install all the dependencies.
4. Run `$ yarn build` or `$ npm run build` to build the plugin.
5. Enjoy!

## What is this?
This is just a simple fork of [coc-discord](https://github.com/amiralies/coc-discord) with some added extra features.

### Example
![](https://strelizia.cc/vkCTtka4hekOqIxQkGkEnlsaNc4ktYnu.gif)

## New features
- **.prettierrc.yml** 🎱 
    1. Change `tabwidth` to 4 instead of 2 spaces.
- **package.json** 👍 
    1. Make `clean` npm script use [rimraf](https://www.npmjs.com/package/rimraf) instead of `$ rm -rf` for multi-platform compatibility.
    2. Remove lint function from `prepack` npm script.
- **src/index.ts** ♨️ 
    1. Change line ending format from CRLF to LF, *don't remember, might be vice versa lol*.
    2. Change file indentation from 2 space to 1, 4 space tab.
    3. Change `clientId` to valid one for the project + assets.
    4. Change change `state` value in `setActivity` from `workspace.root` to `workspace.workspaceFolder.name` so the Discord rich presence doesn't show the whole path, just the folder's name.
    5. Change `state` value in `setActivity` from *"On:"* to *"Workspace:"*. *for easier readability*.
    6. Add a large image which corresponds to what type of file you are editing
    7. Add a large image hover which states what type of file you are editing. (e.g. "Editing a TS file").
    8. Add a small image to activity which is the Neovim logo.
    9. Add small image hover text for the small image which just states 'Neovim'.

## TODO
- [x] Language independent activity small images. *Sort of like this;*

![](https://strelizia.cc/1wallmCL9Pqo1hr8ol2tKX7fpQuhVEGQ.png)

**Finished!** But the large image is where it is displayed instead of the small image.
- [ ] Easier user customizability.

### License
MIT
