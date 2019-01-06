# vue-imgix-transformer

## Prerequisite

Please install `lazysizes` in your application

## Installation

```js
import Vue from 'vue'
import imgixTransformer from '@sparwelt/vue-imgix-transformer'

Vue.use(imgixTransformer, {
  domains: example.imgix.net,
  organizationUrlReg: /example.com/
})
```

In the options: 

**domains**: your Imgix domain(s).

**organizationUrlReg**: the regex to check whether the url is your organization's complete url in raw html. If a complete image url including the company's original domain is used as the original image url, the image url's domain will be replaced by your Imgix domain. **E.g.** `https://example.com/my-image.jpg` will be converted to `https://example.imgix.net/my-image.jpg`.

## Usage

### Vue components

* Html transformer

`<ImageHtmlTransformer html="<img src='my-image.jpg'>" />`

* Responsive lazyload component

```vue
<ImageResponsiveLazyloader
          url="my-image.jpg"
          :src="{options: {h: 150, w: 300}}"
          :data-src="{options: {h: 400, w: 600}}"
          :data-srcset="[
            {
              options: {h: 200, w: 300},
              width: '480w'
            },
            {
              options: {h: 300, w: 600},
              width: '640w'
            }
          ]"
          :data-sizes="['(min-width: 640px) 50vw', '100vw']" 
          class="image-big right"
          alt="Test image"
          title="Title of the image"
        />
        <!-- :data-sizes can be ['auto'] -->
        
 <!-- It will render:
 <img src="https://example.imgix.net/dir/my-image.jpg?h=400&amp;w=600&amp;ixlib=js-1.2.0" 
 srcset="https://example.imgix.net/dir/my-image.jpg?h=200&amp;w=300&amp;ixlib=js-1.2.0 480w,
 https://example.imgix.net/dir/my-image.jpg?h=300&amp;w=600&amp;ixlib=js-1.2.0 640w" 
 data-src="https://example.imgix.net/dir/my-image.jpg?h=400&amp;w=600&amp;ixlib=js-1.2.0" 
 data-srcset="https://example.imgix.net/dir/my-image.jpg?h=200&amp;w=300&amp;ixlib=js-1.2.0 480w,
 https://example.imgix.net/dir/my-image.jpg?h=300&amp;w=600&amp;ixlib=js-1.2.0 640w" 
 data-sizes="(min-width: 640px) 50vw, 100vw" 
 alt="Test image" data-v-57509004=""
 title="Title of the image"
 class="image-big right lazyload" 
 sizes="(min-width: 640px) 50vw, 100vw">
 -->
 
```

### Filter
`<img :src="'my-image.jpg' | transformUrl({blur: 50})">` (Before Vue 2.0)

### Methods
`<img :src="transformImgixUrl('my-image.jpg', {blur: 20})">`

`<div v-html="transformImgixUrlsInHtml(html)"></div>`