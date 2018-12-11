import ImgixClient from 'imgix-core-js'

export default class ImgixTransformer {
  constructor(imgixDomain) {
    this.client = new ImgixClient({
      domains: imgixDomain
    })
  }

  getTransformedUrl(originalUrl, options) {
    const completeUrl = /http/
    const sparweltUrl = /sparwelt.de/
    let imagePath = originalUrl

    if (completeUrl.test(originalUrl)) {
      if (!sparweltUrl.test(originalUrl)) {
        return originalUrl
      }

      originalUrl.split(sparweltUrl).shift()
      imagePath = originalUrl[0]
    }

    return decodeURIComponent(this.client.buildURL(imagePath, options))
  }

  getImageElement(originalUrl, options) {
    const imgElement = document.createElement('img')
    const url = this.getTransformedUrl(originalUrl, options)
    imgElement.setAttribute('src', url)

    return imgElement
  }

  getTransformedHtml(originalHtml, options) {
    const search = /(<img[^>]+>)/gi

    const replacer = match => {
      const wrapperEl = document.createElement('div')
      wrapperEl.innerHTML = match
      const imagePath = wrapperEl.firstChild.getAttribute('src')
      wrapperEl.firstChild.src = this.getTransformedUrl(imagePath, options)

      return wrapperEl.innerHTML
    }

    return originalHtml.replace(search, replacer)
  }
}
