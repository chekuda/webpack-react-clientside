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

  Add the configuration in a new file .babelsrc created in the root:

  ```
    {
      "presets":{
        "env"
      }
    }
  ```

### Extract CSS to a file

  - Im going to use mini-css-extract-plugin
  NOTE: Make sure to update webpack to version 4.2.0. Otherwise mini-css-extract-plugin won’t work!

  - Add the configuration in webpack config

   In modules.rules:

  ```
    {
      test: /\.css$/,
      use: [
        MiniCssEctraPlugin.loader,
        "css-loader"
      ]
    }
  ```

  ```
    {
      plugins: [
         new MiniCssEctraPlugin({
          filename: '[name].css',
          chunkFilename: '[id].css'
        })
    }
  ```

  After all, create the css file and import it in

### Webpack dev server

  - Install webpack-dev-server
  - Will launch the app inside the browser
  - Add the script: `webpack-dev-server --mode-development --open`

### Enable HMR

  In order to use React Hot Reload, I have to enable Hot Modules Replacement.

  - How it works?
    - 1. The application asks the HMR runtime to check for updates
    - 2. THe runtime asynchrounously downloads the updates and notifies the application
    - 3. The application then asks the runtime to apply the updates
    - 4. The runtime synchronously applies the updates

## React

  - Install react and react-dom
  - Add the preset to babel in order to transpile the react components: npm i --save-dev babel-preset-react

  - Add the configuration to .babelsrc:

  ```
    {
      "presets":{
        "env", "react"
      }
    }
  ```

  - Add the configuration for reading jsx files in babel-loader
  - In order to process HTML, webpack needs html-webpack-plugin and html-loader


  ### React Hot Loader

  - How it works?
  Then the HMR runtime receives an updated module, it firs checks to see if the module knows hoe to update itself. It then goes up the import/require chain, lookinf dor a parent module that can accept the update. The added code allows our root component to accept an update from any child component.

  `Note that the internal state will not be preserved, since a new copy of the component has been mounted. State that is kept externally in a state store, such a Redux.`

  - Preserve the internal state
  I need to adda react-hot-loader. I have to ways of doing it.
  1. By .babelsrc
    ```
    {
      "plugins": ["react-hot-loader/babel]
    }
    ```

  2. By webpack
    ```
    {
      loaders: [{
        test: /\.(js|jsx)$/,]
        loaders: ['react-hot-loader/webpack', 'babel'],
        include: path.join(__dirname, 'src')
      }]
    }
    ```

  `Note: react-hot-loader/webpack only works in exported components, whereas react-hot-loader/babel picks up all top-level variables in your files. As a workaround, with webpack, you can export all the components whose state you want to maintain, even if they are not imported anywere else.`

  3. Add this lines in your webpack entry point.
    ```
    {
      entry: [
        'react-hot-loader/patch', // RHL patch
      './scripts/index' // Your appʼs entry point
      ]
    }
    ```

  4. Wrap my entry file with a top-level component provided by RHL called `<AppContainer>` which hanle hot reloading as well as error handling. Also handles disabling hot reloading/error handling when running in production environment.

    ```
    import React from 'react'
    import ReactDOM from 'react-dom'
    import { AppContainer } from 'react-hot-loader'
    import App from './pages/App/App.jsx'

    const render = Component => {
      ReactDOM.render(
        <AppContainer>
          <Component />
        </ AppContainer>,
        document.getElementById('app')
      )
    }

    render(App)

    if(module.hot) {
      module.hot.accept('./pages/App/App.jsx', () => {
        render(App)
      })
    }
    ```

  `Note: If I dont want to duplicate the require in the entry component, I will have to put `modules: false` in my .babelsrc`

  ```
    [ "env", { "modules": false } ],
  ```

