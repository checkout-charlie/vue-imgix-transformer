import ImgixClient from 'imgix-core-js'

export default class ImgixTransformer {
  constructor(imgixCdnConfigs) {
    this.imgixCdnConfigs = imgixCdnConfigs
    this.clients = this.getClients(imgixCdnConfigs)
  }

  getClients(configs) {
    const clients = {}

    for (let configName in configs) {
      let { cdnOptions } = configs[configName]
      clients[configName] = new ImgixClient(cdnOptions)
    }

    return clients
  }

  getClient(configName) {
    if ('undefined' !== typeof configName) {
      return this.clients[configName]
    }

    for (let name in this.imgixCdnConfigs) {
      return this.clients[name]
    }
  }

  getConfigName(url) {
    const cdnConfigs = this.imgixCdnConfigs

    return Object.keys(cdnConfigs).filter(key => {
      return url.indexOf(cdnConfigs[key].sourceDomain) > -1
    })[0]
  }

  transformUrl(originalUrl, options) {
    const configName = this.getConfigName(originalUrl)
    const absolutePathReg = /^http/
    let imagePath = originalUrl

    if (absolutePathReg.test(originalUrl)) {
      if ('undefined' === typeof configName) {
        return originalUrl
      }

      const { sourceDomain } = this.imgixCdnConfigs[configName]
      imagePath = originalUrl.split(sourceDomain).pop()
    }

    return decodeURIComponent(this.getClient(configName).buildURL(imagePath, options))
  }

  /* deprecated */
  generateImageElement(originalUrl, options) {
    const imgElement = document.createElement('img')
    const url = this.transformUrl(originalUrl, options)
    imgElement.setAttribute('src', url)

    return imgElement
  }

  transformHtml(originalHtml, options) {
    const search = /(<img[^>]+>)/gi

    if ('undefined' === typeof document) {
      return
    }

    const replacer = match => {
      const wrapperEl = document.createElement('div')
      wrapperEl.innerHTML = match
      const imagePath = wrapperEl.firstChild.getAttribute('src')
      wrapperEl.firstChild.src = this.transformUrl(imagePath, options)

      return wrapperEl.innerHTML
    }

    return originalHtml.replace(search, replacer)
  }
}
