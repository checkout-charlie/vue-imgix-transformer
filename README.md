# vue-imgix-transformer

## Before installation

**Before 4.0.0**

`lazyload` CSS class is included for the `lazysizes` plugin to use for lazyloading

**From 4.0.0**

`lazyload` CSS class is removed in order to streamline the library

## Installation

```js
import Vue from 'vue'
import imgixTransformer from '@sparwelt/vue-imgix-transformer'

Vue.use(imgixTransformer, {
  imgixCdnConfigs: myImgixCdnConfigs,
  imgixImageConfigs: myImageConfigs
  imgixModule: imgixCoreJs // Optionally you can pass the imgix-core-js module instead of our minimal functionalities
})
```


In the options:

**imgixCdnConfigs**: required. It contains your CDN related configurations.
The format is:

````javascript
const myImgixCdnConfigs = {
  myConfig1: {
    cdnOptions: {
      domains: example.imgix.net
    },
    sourceDomain: 'www.example.come'
  },
  myConfig2: {
    cdnOptions: {
      domains: 'example2.imgix.net'
    },
    sourceDomain: 'www.example2.com'
  }
}
````
If a given image URL is an absolute path, **sourceDomain** will be used for checking whether the URL contains the domain. If it does, the domain will be replaced with your Imgix domain in **cdnOptions**. The first configuration set will be used as a default configuration if given image URL is a relative path or no matching domain is found. **cdnOptions** is the options for your Imgix CDN passed to `imgix-core-js` instance. Please see  [imgix-core-js](https://github.com/imgix/imgix-core-js)

**imgixImageConfigs**: this is optional. You can define the image element configurations `srcOptions`, `dataSrcOptions`, `dataSrcset`, `dataSizes` such as:

````javascript
const myImageConfigs = {
  pageA: {
    srcOptions: {h: 150, w: 300},
    dataSrcOptions: {h: 400, w: 800},
    dataSrcset: [
      {
        options: {h: 200, w: 300},
        width: '480w'
      },
      {
        options: {h: 300, w: 600},
        width: '640w'
      }
    ],
    dataSizes: ['(min-width: 640px) 50vw', '100vw']
  },
  pageB: {
    srcOptions: {h: 250, w: 480},
    dataSrcOptions: {h: 400, w: 800},
    dataSrcset: [
      {
        options: {h: 150, w: 200},
        width: '640w'
      },
      {
        options: {h: 200, w: 680},
        width: '800w'
      }
    ],
    dataSizes: ['(min-width: 760px) 50vw', '100vw']
  }
}
````

## Usage

### Vue components

* Html transformer

`<ImagixHtmlTransformer html="<img src='my-image.jpg'>" />`

* Image component

```vue
<ImgixImage
  src="my-image.jpg"
  :src-options="{h: 150, w: 300}"
  :data-src-options="{h: 400, w: 600}"
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
  id="image-test"
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
 class="image-big right" 
 sizes="(min-width: 640px) 50vw, 100vw">
 -->
 
```
- Alternatively adding a pre-defined config

````javascript
<ImgixImage
  src="/images/my-test-image.jpg"
  :config="imgixImageConfigs.pageA"
  class="image-big right xxx"
  alt="Test image"
  title="This is image title"
/>
````


### Filter
`<img :src="'my-image.jpg' | imgixTransformUrl({blur: 50})">` (Before Vue 2.0)

### Methods
`<img :src="transformImgixUrl('my-image.jpg', {blur: 20})">`

`<div v-html="transformImgixUrlsInHtml(html)"></div>`