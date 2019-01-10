import ImgixClient from 'imgix-core-js'

export default class ImgixTransformer {
  constructor(imgixCdnConfigs) {
    this.imgixCdnConfigs = imgixCdnConfigs
  }

  getConfigName(completeUrl) {
    const cdnConfigs = this.imgixCdnConfigs

    return Object.keys(cdnConfigs).filter(key => {
      return completeUrl.indexOf(cdnConfigs[key].sourceDomain) > -1
    })[0]
  }

  getClient(originalUrl) {
    const absolutePathReg = /http/
    const cdnConfigs = this.imgixCdnConfigs
    let cdnConfig = cdnConfigs[Object.keys(cdnConfigs)[0]].cdnOptions

    if (absolutePathReg.test(originalUrl)) {
      const configName = this.getConfigName(originalUrl)

      if ("undefined" !== typeof configName) {
        cdnConfig = cdnConfigs[configName].cdnOptions
      }
    }

    return new ImgixClient(cdnConfig)
  }

  transformUrl(originalUrl, options) {
    const absolutePathReg = /http/
    let imagePath = originalUrl

    if (absolutePathReg.test(originalUrl)) {
      const configName = this.getConfigName(originalUrl)

      if ("undefined" === typeof configName) {
        return originalUrl
      }

      const sourceDomain = this.imgixCdnConfigs[configName].sourceDomain
      imagePath = originalUrl.split(sourceDomain).pop()
    }

    return decodeURIComponent(this.getClient(originalUrl).buildURL(imagePath, options))
  }

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
