// /** @format */

// import {AppRegistry} from 'react-native';
// import App from './App';

// AppRegistry.registerComponent(appName, () => App);

import { AppRegistry } from "react-native";
import React, { Component } from "react";
import { Provider } from "mobx-react";
import store from "./app/store";

import Root from "./Root";
import { name as appName } from "./app.json";

// import applyDecoratedDescriptor from "@babel/runtime/helpers/es6/applyDecoratedDescriptor";
// import initializerDefineProperty from "@babel/runtime/helpers/es6/initializerDefineProperty";

// let babelHelpers = {};
// Object.assign(babelHelpers, {
//   applyDecoratedDescriptor,
//   initializerDefineProperty
// });

export default class App extends Component {
  render() {
    return (
      <Provider {...store}>
        <Root />
      </Provider>
    );
  }
}

AppRegistry.registerComponent(appName, () => App);
