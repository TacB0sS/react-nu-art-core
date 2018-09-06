/**
 * Created by tacb0ss on 27/07/2018.
 */
import Module from '../core/Module';

class HttpModule
  extends Module {

  constructor() {
    super();
    this.baseUrl = "http://localhost:3000";
    this.headers = {"content-type": "application/json"};
  }

  execute(method, url, headers, data, onCompleted) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4)
        return;

      onCompleted(xhr);
    };

    xhr.open(method, url.startsWith("http") ? url : this.baseUrl + url);
    if (this.headers)
      Object.keys(this.headers).forEach((key) => {
        xhr.setRequestHeader(key, this.headers[key]);
      });

    if (headers)
      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

    xhr.send(JSON.stringify(data));

  }
}

export default new HttpModule();
