var DEFAULTS = {
  domains: []
};

function SwImgixClient(opts) {
  var key, val;

  this.settings = {};
  this._shard_next_index = 0;

  for (key in DEFAULTS) {
    val = DEFAULTS[key];
    this.settings[key] = val;
  }

  for (key in opts) {
    val = opts[key];
    this.settings[key] = val;
  }

  if (!Array.isArray(this.settings.domains)) {
    this.settings.domains = [this.settings.domains];
  }

  if (!this.settings.host && this.settings.domains.length === 0) {
    throw new Error('SwImgixClient must be passed valid domain(s)');
  }
}

SwImgixClient.prototype.buildURL = function(path, params) {
  path = this._sanitizePath(path);

  if (params == null) {
    params = {};
  }

  var queryParams = this._buildParams(params);
  if (!!this.settings.secureURLToken) {
    queryParams = this._signParams(path, queryParams);
  }

  return this.settings.urlPrefix + this._getDomain(path) + path + queryParams;
};

SwImgixClient.prototype._getDomain = function(path) {
  var domain = this.settings.domains[this._shard_next_index];
  this._shard_next_index = (this._shard_next_index + 1) % this.settings.domains.length;
  return domain;

}

SwImgixClient.prototype._sanitizePath = function(path) {
  // Strip leading slash first (we'll re-add after encoding)
  path = path.replace(/^\//, '');

  if (/^https?:\/\//.test(path)) {
    // Use de/encodeURIComponent to ensure *all* characters are handled,
    // since it's being used as a path
    path = encodeURIComponent(path);
  } else {
    // Use de/encodeURI if we think the path is just a path,
    // so it leaves legal characters like '/' and '@' alone
    path = encodeURI(path);
  }

  return '/' + path;
};

SwImgixClient.prototype._buildParams = function(params) {
  var queryParams = [];
  var key, val, encodedKey, encodedVal;
  for (key in params) {
    val = params[key];
    encodedKey = encodeURIComponent(key);
    encodedVal = encodeURIComponent(val);

    queryParams.push(encodedKey + "=" + encodedVal);
  }

  if (queryParams[0]) {
    queryParams[0] = "?" + queryParams[0];
  }
  return queryParams.join('&');
};

export default SwImgixClient;