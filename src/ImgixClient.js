const DEFAULTS = {
  domains: []
}

class ImgixClient {
  constructor(options) {
    let key, val

    this.settings = {}

    for (key in DEFAULTS) {
      val = DEFAULTS[key]
      this.settings[key] = val
    }

    for (key in options) {
      val = options[key]
      this.settings[key] = val
    }

    if (!Array.isArray(this.settings.domains)) {
      this.settings.domains = [this.settings.domains]
    }

    if (!this.settings.host && this.settings.domains.length === 0) {
      throw new Error('ImgixClient must be passed valid domain(s)')
    }
  }

  buildURL(path, params) {
    path = this._sanitizePath(path)

    if (params == null) {
      params = {}
    }

    let queryParams = this._buildParams(params)

    return `https://${this._getDomain()}${path}${queryParams}`
  }

  _getDomain() {
    return this.settings.domains[0]
  }

  _sanitizePath(path) {
    path = path.replace(/^\//, '')

    if (/^https?:\/\//.test(path)) {
      path = encodeURIComponent(path)
    } else {
      path = encodeURI(path)
    }

    return '/' + path
  }

  _buildParams(params) {
    let queryParams = []
    let key, val, encodedKey, encodedVal

    for (key in params) {
      val = params[key]
      encodedKey = encodeURIComponent(key)
      encodedVal = encodeURIComponent(val)

      queryParams.push(encodedKey + "=" + encodedVal)
    }

    if (queryParams[0]) {
      queryParams[0] = "?" + queryParams[0]
    }

    return queryParams.join('&')
  }
}

export default ImgixClient