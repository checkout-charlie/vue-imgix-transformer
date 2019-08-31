<template>
  <img :src="transformedSrc"
       :srcset="`data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==`"
       :data-src="transformedDataSrc"
       :data-srcset="transformedDataSrcset"
       :data-sizes="transformedDataSizes"
       :alt="alt"
       :title="title"
       :id="id"
  />
</template>
<script>
  export default {
    name: 'ImgixImage',
    props: {
      src: {
        default: '',
        type: String
      },
      srcOptions: {
        default() {
          return {}
        },
        type: Object
      },
      dataSrcOptions: {
        default() {
          return {}
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
      alt: {
        default: '',
        type: String
      },
      title: {
        default: '',
        type: String
      },
      id: {
        default: null,
        type: String
      },
      config: {
        default: null,
        type: Object
      }
    },
    data() {
      return {
        transformedSrc: '',
        transformedDataSrc: {},
        transformedDataSrcset: [],
        transformedDataSizes: []
      }
    },
    created() {
      this.transformData()
    },
    methods: {
      transformData() {
        const srcOptions = this.config ? this.config.srcOptions : this.srcOptions
        const dataSrcOptions = this.config ? this.config.dataSrcOptions : this.dataSrcOptions
        const dataSrcset =  this.config ? this.config.dataSrcset : this.dataSrcset
        const dataSizes =  this.config ? this.config.dataSizes : this.dataSizes

        this.transformedSrc = this.transformImgixUrl(
          this.src, srcOptions
        )
        this.transformedDataSrc = this.transformImgixUrl(
          this.src, dataSrcOptions
        )
        this.transformedDataSrcset = dataSrcset.map(item => {
          const {options, width} = item
          const transformedUrl = this.transformImgixUrl(this.src, options)

          return `${transformedUrl} ${width}`
        }).join(', ')
        this.transformedDataSizes = dataSizes.join(', ')
      }
    }
  }
</script>
