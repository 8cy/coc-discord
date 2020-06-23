# coc-discord
an improved discord rich presence for coc.nvim

## What is this?
This is just a simple fork of [coc-discord](https://github.com/amiralies/coc-discord) with some added extra features.

## New features
- **.prettierrc.yml** 🎱 
    1. Change `tabwidth` to 4 instead of 2 spaces.
- **package.json** 👍 
    1. Make `clean` npm script use [rimraf](https://www.npmjs.com/package/rimraf) instead of `$ rm -rf` for multi-platform compatibility.
    2. Remove lint function from `prepack` npm script.
- **src/index.ts** ♨️ 
    1. Change line ending format from CRLF to LF, *don't remember, might be vice versa lol*.
    2. Change file indentation from 2 space to 1, 4 space tab.
    3. Change `clientId` to valid one for project.
    4. Change change `state` value in `setActivity` from `workspace.root` to `workspace.workspaceFolder.name` so the Discord rich presence doesn't show the whole path, just the folder's name.
    5. Change `state` value in `setActivity` from *"On:"* to *"Workspace:"*.
    6. Add a large image to activity.
    7. Add large image hover text for the large image.

## TODO
- [ ] Language independent activity small images. *Sort of like [this](https://marketplace.visualstudio.com/items?itemName=icrawl.discord-vscode)*.
- [ ] Easier user customizability.

### License
MIT
