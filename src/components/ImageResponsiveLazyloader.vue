<template>
  <img :src="transformedSrc"
       :srcset="`data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==`"
       :data-src="transformedDataSrc"
       :data-srcset="transformedDataSrcset"
       :data-sizes="transformedDataSizes"
       :class="cssClasses"
       :alt="alt"
       :title="title"
  />
</template>
<script>
  export default {
    name: 'ImageResponsiveLazyloader',
    props: {
      url: {
        default: '',
        type: String
      },
      src: {
        default() {
          return {
            options: {}
          }
        },
        type: Object
      },
      dataSrc: {
        default() {
          return {
            options: {}
          }
        },
        type: Object
      },
      dataSrcset: {
        default() {
          return [
            {
              options: {},
              width: ''
            }
          ]
        },
        type: Array
      },
      dataSizes: {
        default() {
          return ['auto']
        },
        type: Array
      },
      classes: {
        default: '',
        type: String
      },
      alt: {
        default: '',
        type: String
      },
      title: {
        default: '',
        type: String
      }
    },
    data() {
      return {
        transformedSrc: '',
        transformedDataSrc: {},
        transformedDataSrcset: [],
        transformedDataSizes: [],
        cssClasses: ''
      }
    },
    created() {
      this.transformData()
    },
    methods: {
      transformData() {
        this.transformedSrc = this.transformImgixUrl(
          this.url, this.src.options
        )
        this.cssClasses = `lazyload ${this.classes}`
        this.transformedDataSrc = this.transformImgixUrl(
          this.url, this.dataSrc.options
        )
        this.transformedDataSrcset = this.dataSrcset.map(item => {
          const {options, width} = item
          const transformedUrl = this.transformImgixUrl(this.url, options)

          return `${transformedUrl} ${width}`
        }).join(', ')
        this.transformedDataSizes = this.dataSizes.join(', ')
      }
    }
  }
</script>
