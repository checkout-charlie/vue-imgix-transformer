<template>
  <img src srcset data-srcset data-sizes class="lazyload">
</template>
<script>
  export default {
    name: 'ImageLazyloader',
    props: ['src', 'srcset', 'dataSrcset', 'dataSizes', 'cssClasses'],
    data() {
      return {
      }
    },
    methods: {
    }
  }
</script>
