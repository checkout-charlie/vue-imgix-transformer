<template>
  <img :src="src"
       srcset="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
       :data-src="transformedSrc" :data-srcset="transformedSrcset"
       :data-sizes="transformedSizes" :class="cssClasses"
       :alt="alt"
  />
</template>
<script>
  export default {
    name: 'ImageResponsiveLazyloader',
    props: {
      src: {
        default: '',
        type: String
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
              options: {blur: 20},
              width: '600w'
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
      }
    },
    data() {
      return {
        cssClasses: '',
        transformedSrc: {},
        transformedSrcset: [],
        transformedSizes: []
      }
    },
    mounted() {
      this.transformData()
    },
    methods: {
      transformData() {
        const { options } = this.dataSrc
        this.cssClasses = `lazyload ${this.classes}`
        this.transformedSrc = this.$imgTransformer.getTransformedUrl(this.src, options)
        this.transformedSrcset = this.dataSrcset.map(item => {
          const {options, width} = item
          const transformedUrl = this.$imgTransformer.getTransformedUrl(this.src, options)

          return `${transformedUrl} ${width}`
        }).join(', ')
        this.transformedSizes = this.dataSizes.join(', ')
      }
    }
  }
</script>
