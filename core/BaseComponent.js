/**
 * Created by tacb0ss on 28/07/2018.
 */
import React from 'react';
import LocalizationModule from '../modules/LocalizationModule';
import ResourcesModule from '../modules/ResourcesModule';
import HistoryModule from '../modules/BrowserHistoryModule';
import EventDispatcher from './EventDispatcher';

class BaseComponent
  extends React.Component {

  constructor(props) {
    super(props);
    this.tag = this.constructor.name;
    this.state = {};
  }

  setInterfaces(...interfaces) {
    this.interfaces = interfaces;
    interfaces.forEach((_interface) => {
      _interface.validate(this);
    });

    EventDispatcher.register(this);
  }

  _implements(_interface) {
    return this.interfaces.indexOf(_interface) !== -1;
  }

  componentWillUnmount() {
    EventDispatcher.unregister(this);
  }

  getImageUrl(relativePath) {
    if (relativePath.indexOf(".") === -1)
      relativePath += ".png";

    return ResourcesModule.getImageUrl(relativePath);
  }

  getQueryParameter(name) {
    return HistoryModule.getQueryParams()[name];
  }

  getString(key, ...params) {
    return LocalizationModule.getString(key, params);
  }

  logVerbose(message) {
    console.log(`${this.tag}: ${message}`);
  }

  logDebug(message) {
    console.log(`${this.tag}: ${message}`);
  }

  logInfo(message) {
    console.log(`${this.tag}: ${message}`);
  }

  logWarning(message) {
    console.log(`${this.tag}: ${message}`);
  }

  logError(message) {
    console.log(`${this.tag}: ${message}`);
  }

  toString() {
    return this.constructor.name;
  }
}

export default BaseComponent;
