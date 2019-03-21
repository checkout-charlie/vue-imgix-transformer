import ImagixHtmlTransformer from './components/ImagixHtmlTransformer.vue'
import ImgixImage from './components/ImgixImage.vue'
import ImgixTransformer from './ImgixTransformer.js'

const plugin = {
  install(Vue, options = {}) {
    const { imgixImageConfigs, imgixCdnConfigs, imgixModule } = options
    const imgixTransformer = new ImgixTransformer(imgixCdnConfigs, imgixModule)

    Vue.prototype.$imgixTransformer = imgixTransformer

    Vue.component(ImagixHtmlTransformer.name, ImagixHtmlTransformer)
    Vue.component(ImgixImage.name, ImgixImage)

    Vue.filter('imgixTransformUrl', (url, opts) => {
      return imgixTransformer.transformUrl(url, opts)
    })

    Vue.mixin({
      data() {
        return {
          imgixImageConfigs
        }
      },
      methods: {
        transformImgixUrl(url, options) {
          return imgixTransformer.transformUrl(url, options)
        },
        transformImgixUrlsInHtml(html, options) {
          return imgixTransformer.transformHtml(html, options)
        }
      }
    })
  }
}

export default plugin
