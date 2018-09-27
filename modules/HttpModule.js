/**
 * Created by tacb0ss on 27/07/2018.
 */
import Module from '../core/Module';
class HttpRequest {
  constructor(origin) {
    this.origin = origin;
    this.headers = {};
  }

  setMethod(method) {
    this.method = method;
    return this;
  }

  setUrl(url) {
    this.url = url;
    return this;
  }

  setHeaders(headers) {
    if (!headers)
      return this;

    Object.keys(headers).forEach((key) => this.setHeader(key, headers[key]));
    return this;
  }

  addHeaders(headers) {
    if (!headers)
      return this;

    Object.keys(headers).forEach((key) => this.addHeader(key, headers[key]));
    return this;
  }

  setHeader(key, value) {
    this.headers[key] = undefined;
    return this.addHeader(key, value);
  }

  addHeader(key, value) {
    this._addHeaderImpl(key, value);
  }

  _addHeaderImpl(key, value) {
    if (!value.isString() && !Array.isArray(value))
      throw new Error("header value MUST be a string or an array");

    const headers = this.headers[key];

    if (!headers)
      this.headers[key] = Array.isArray(value) ? value : [value];
    else
      this.headers[key].push(value);

    return this;
  }

  setJsonData(data) {
    this.data = JSON.stringify(data);
    this.setHeaders({"content-type": "application/json"});
    return this;
  }

  setData(data) {
    this.data = data;
    return this;
  }

  execute(onCompleted) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4)
        return;

      onCompleted(xhr);
    };

    xhr.open(this.method, this.url.startsWith("http") ? this.url : this.origin + this.url);
    Object.keys(this.headers).forEach((key) => {
      xhr.setRequestHeader(key, this.headers[key]);
    });

    xhr.send(this.data);
  }

}

class HttpModule
  extends Module {

  constructor() {
    super();
  }

  init() {
    this.origin = this.config.origin || "https://localhost:3000";
  }

  createRequest(method) {
    return new HttpRequest(this.origin).setMethod(method);
  }

  execute(method, url, headers, data, onCompleted) {
    this.createRequest(method).setUrl(url).setHeaders(this.headers).setHeaders(headers).setJsonData(data).execute(onCompleted);
  }
}

export default new HttpModule();
