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
    }
  },
  data() {
    return {
      transformedHtml: ''
    }
  },
  mounted() {
    if (this.html) {
      this.transformHtml()
    }
  },
  methods: {
    transformHtml() {
      this.transformedHtml = this.$imgTransformer.getTransformedHtml(
        this.html,
        this.options
      )
    }
  }
}
</script>
