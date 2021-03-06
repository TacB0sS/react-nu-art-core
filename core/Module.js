/**
 * Created by tacb0ss on 27/07/2018.
 */
//TODO extend Logger and print config per module

import LocalizationModule from '../modules/LocalizationModule';
import EventDispatcher from '../core/EventDispatcher';

class Module {
	constructor(...interfaces) {
		this.interfaces = interfaces;
		interfaces.forEach((_interface) => {
			_interface.validate(this);
		});
	}

	static loadObject(key) {
		const itemFromStorage = localStorage.getItem(key);
		if (!itemFromStorage)
			return undefined;

		return JSON.parse(itemFromStorage);
	}

	static loadString(key) {
		const itemFromStorage = localStorage.getItem(key);
		if (!itemFromStorage)
			return undefined;

		return itemFromStorage;
	}

	static storeObject(key, obj) {
		localStorage.setItem(key, JSON.stringify(obj));
	}

	static storeString(key, string) {
		localStorage.setItem(key, JSON.stringify(string));
	}

	_implements(_interface) {
		return this.interfaces.indexOf(_interface) !== -1;
	}

	defineInterface(interfaceName, ...methods) {

		// this.onSparkListUpdate = "onSparkListUpdate";
		// this.OnSparkListUpdateListener = DefineInterface("OnSparkListUpdateListener").addMethod(this.onSparkListUpdate);

	}

	dispatchEvent(_interface, method, ...args) {
		EventDispatcher.dispatchEvent(_interface, method, ...args);
	}

	setup(config) {
		this.config = config;
		// console.log("this.config: "+JSON.stringify(this.config));
		this.init();
	}

	init() {
		throw new Error("MUST override and implement");
	}

	getString(key, ...params) {
		return LocalizationModule.getString(key, ...params);
	}

	logVerbose(message) {
		console.log(message);
	}

	logDebug(message) {
		console.log(message);
	}

	logInfo(message) {
		console.log(message);
	}

	logWarning(message) {
		console.log(message);
	}

	logError(message) {
		console.error(message);
	}
}

export default Module;
