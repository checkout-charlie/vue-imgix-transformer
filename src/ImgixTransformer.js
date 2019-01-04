import ImgixClient from 'imgix-core-js'

export default class ImgixTransformer {
  constructor(domains, organizationUrlReg = /\b\B/) {
    this.client = new ImgixClient({domains})

    this.organizationUrlReg = organizationUrlReg
  }

  transformUrl(originalUrl, options) {
    const completeUrlReg = /http/
    const orgUrlReg = this.organizationUrlReg
    let imagePath = originalUrl

    if (completeUrlReg.test(originalUrl)) {
      if (!orgUrlReg.test(originalUrl)) {
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
