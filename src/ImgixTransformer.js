import ImgixClient from 'imgix-core-js'

export default class ImgixTransformer {
  constructor(imgixOptions, organizationUrlRegs = [/\b\B/]) {
    this.client = new ImgixClient(imgixOptions)

    this.organizationUrlRegs = organizationUrlRegs
  }

  transformUrl(originalUrl, options) {
    const completeUrlReg = /http/
    const orgUrlRegs = this.organizationUrlRegs
    let orgUrlReg = null
    let imagePath = originalUrl

    if (completeUrlReg.test(originalUrl)) {
      const isOrgUrl = orgUrlRegs.some(reg => {
        orgUrlReg = reg
        return reg.test(originalUrl)
      })

      if (!isOrgUrl) {
        return originalUrl
      }

      const urlSplit = originalUrl.split(orgUrlReg)
      urlSplit.shift()
      imagePath = urlSplit[0]
    }

    return decodeURIComponent(this.client.buildURL(imagePath, options))
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
