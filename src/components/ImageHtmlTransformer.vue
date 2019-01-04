<template>
  <div>
    <!-- eslint-disable-next-line -->
    <div v-if="html" v-html="transformedHtml"></div>
  </div>
</template>
<script>

export default {
  name: 'ImageHtmlTransformer',
  props: {
    html: {
      default: null,
      type: String
    },
    options: {
      type: Object
    }
  },
  data() {
    return {
      transformedHtml: ''
    }
  },
  created() {
    if (this.html) {
      this.transformHtml()
    }
  },
  methods: {
    transformHtml() {
      this.transformedHtml = this.transformImgixUrlsInHtml(
        this.html,
        this.options
      )
    }
  }
}
</script>
