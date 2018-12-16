import ImageHtmlTransformer from './components/ImageHtmlTransformer.vue'
import ImgixTransformer from './imgixTransformer.js'

const plugin = {
  install(Vue, options = {}) {
    const imgTransformer = new ImgixTransformer(options.domain)

    Vue.prototype.$imgTransformer = imgTransformer
    Vue.component(ImageHtmlTransformer.name, ImageHtmlTransformer)
    Vue.filter('transformUrl', (url, opts) => {
      return imgTransformer.getTransformedUrl(url, opts)
    })
  }
}

export default plugin