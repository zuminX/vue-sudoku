/**
 * API信息类
 */
class APIInfo {
  _url;
  _type

  constructor(url, type) {
    this._url = url
    this._type = type;
  }

  get url() {
    return this._url;
  }

  get type() {
    return this._type;
  }
}

module.exports = {
  APIInfo
}
