import ImageHtmlTransformer from './components/ImageHtmlTransformer.vue'
import ImageResponsiveLazyloader from './components/ImageResponsiveLazyloader.vue'
import ImgixTransformer from './imgixTransformer.js'

const plugin = {
  install(Vue, options = {}) {
    const imgTransformer = new ImgixTransformer(options.domain)

    Vue.prototype.$imgTransformer = imgTransformer

    Vue.component(ImageHtmlTransformer.name, ImageHtmlTransformer)
    Vue.component(ImageResponsiveLazyloader.name, ImageResponsiveLazyloader)

    Vue.filter('transformUrl', (url, opts) => {
      return imgTransformer.transformUrl(url, opts)
    })

    Vue.mixin({
      methods: {
        transformImgixUrl(url, options) {
          return imgTransformer.transformUrl(url, options)
        },
        transformImgixUrlsInHtml(html, options) {
          return imgTransformer.transformHtml(html, options)
        }
      }
    })
  }
}

export default plugin