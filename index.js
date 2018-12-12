import ImageHtmlTransformer from './src/ImageHtmlTransformer'
import ImgixTransformer from './src/imgixTransformer'

export default {
  install(Vue, options = {}) {
    const imgTransformer = new ImgixTransformer(options.domain)

    Vue.prototype.$imgTransformer = imgTransformer
    Vue.component(ImageHtmlTransformer.name, ImageHtmlTransformer)
    Vue.filter('transformUrl', (url, opts) => {
      return imgTransformer.getTransformedUrl(url, opts)
    })
  }
}
