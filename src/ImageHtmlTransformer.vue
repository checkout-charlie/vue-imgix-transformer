<template>
  <div>
    <img
      v-if="imgUrl"
      :src="transformedUrl"
      :alt="alt"
    >
    <!-- eslint-disable-next-line -->
    <div v-if="html" v-html="transformedHtml"></div>
  </div>
</template>
<script>

export default {
  name: 'ImageHtmlTransformer',
  props: {
    imgUrl: {
      default: null,
      type: String
    },
    html: {
      default: null,
      type: String
    },
    options: {
      default: null,
      type: Object
    },
    alt: {
      default: '',
      type: String
    }
  },
  data() {
    return {
      transformedHtml: '',
      transformedUrl: ''
    }
  },
  mounted() {
    if (this.html) {
      this.transformHtml()
    }
    if (this.imgUrl) {
      this.transformUrl()
    }
  },
  methods: {
    transformHtml() {
      this.transformedHtml = this.$imgTransformer.getTransformedHtml(
        this.html,
        this.options
      )
    },
    transformUrl() {
      this.transformedUrl = this.$imgTransformer.getTransformedUrl(
        this.imgUrl,
        this.options
      )
    }
  }
}
</script>
