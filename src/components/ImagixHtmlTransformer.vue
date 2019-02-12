<template>
  <div>
    <!-- eslint-disable-next-line -->
    <div v-if="html" v-html="transformedHtml"></div>
  </div>
</template>
<script>

  export default {
    name: 'ImagixHtmlTransformer',
    props: {
      html: {
        default: null,
        type: String
      },
      options: {
        type: Object
      }
    },
    computed: {
      transformedHtml: function() {
        return this.transformImgixUrlsInHtml(
          this.html,
          this.options
        )
      }
    }
  }
</script>
