# Webpack React ClientSide

- Webapck Version 4
- React Version 16

## Webpack

- webpack 4 doesn’t need a configuration file. It will look ./src/index.js and bundle in ./dist/main.js

### Mode
  - Production
    For defining ufigyJsPlugin, sourceMapn and so on
    Enables all sorts of optimizations out of the box. Including minification, scope hosting, tree-shaking and more
  - Development
    For defining dev server and other stuff
    Its optimized for speed and does nothing more than providin an un-monified bundle

### Override the default entry/output

  You can override the entry and output files

### Transpiling ES6 with Babel

  We need to use the plugin babel-loader in order to transpile ES6 to ES5. In order to make this works, we need to install some dependencies:
  - babel-core
  - babel-loader
  - babel-preset-env

  Add the configuration in a new file .babelsrc created in the root
    ```{
      "presets":{
        "env"
      }

    }```

## React

  - Install react and react-dom
  - Add the preset to babel in order to transpile the react components: npm i --save-dev babel-preset-react
  - Add the configuration to .babelsrc
      ```{
      "presets":{
        "env", "react"
      }

    }```
  - Add the configuration for reading jsx files in babel-loader
  - In order to process HTML, webpack needs html-webpack-plugin and html-loader