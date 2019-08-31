import ImgixClient from './ImgixClient'

const absolutePathReg = /^https?/
const imgElementReg = /(<img[^>]+>)/gi
const imgSrcReg = /src="([^"]+)"/i
const imgElementSegsReg = /([\s\S]*) (src="[^"]+") ([\s\S]*)/gi
const pixel = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='

export default class ImgixTransformer {
  constructor(imgixCdnConfigs, imgixModule = ImgixClient) {
    this.imgixCdnConfigs = imgixCdnConfigs
    this.imgixModule = imgixModule
    this.clients = this.getClients(imgixCdnConfigs)
  }

  getClients(configs) {
    let clients = {}

    for (let configName in configs) {
      let { cdnOptions } = configs[configName]
      clients[configName] = new this.imgixModule(cdnOptions)
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
    let cdnConfigs = this.imgixCdnConfigs
    return Object.keys(cdnConfigs).filter(key => {
      return url.indexOf(cdnConfigs[key].sourceDomain) > -1
    })[0]
  }

  transformUrl(originalUrl, options) {
    let configName = this.getConfigName(originalUrl)
    let imagePath = originalUrl

    if (absolutePathReg.test(originalUrl)) {
      if ('undefined' === typeof configName) {
        return originalUrl
      }

      let { sourceDomain } = this.imgixCdnConfigs[configName]
      imagePath = originalUrl.split(sourceDomain).pop()
    }

    return decodeURIComponent(this.getClient(configName).buildURL(imagePath, options))
  }

  transformHtml(originalHtml, options) {
    const replacer = match => {
      return match.replace(imgElementSegsReg, (match, p1, p2, p3) => {
        let imagePath = p2.match(imgSrcReg)[1]

        return `${p1} src="${pixel}" data-src="${this.transformUrl(imagePath, options)}" ${p3}`
      })
    }

    return originalHtml.replace(imgElementReg, replacer)
  }
}
