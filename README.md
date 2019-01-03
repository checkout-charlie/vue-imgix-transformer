# vue-imgix-transformer

## Prerequisite

Please install `lazysizes` in your application

## Usage

### Vue components

* Html transformer

`<image-html-transformer html="<img src="myImage.jpg>" />`

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
          classes="image-big right"
          alt="Test image"
          title="Title of the image"
        />
        <!-- :data-sizes can be ['auto'] -->
        
 <!-- It will render:
 <img src="https://test.imgix.net/dir/my-image.jpg?h=400&amp;w=600&amp;ixlib=js-1.2.0" 
 srcset="https://test.imgix.net/dir/my-image.jpg?h=200&amp;w=300&amp;ixlib=js-1.2.0 480w,
 https://test.imgix.net/dir/my-image.jpg?h=300&amp;w=600&amp;ixlib=js-1.2.0 640w" 
 data-src="https://test.imgix.net/dir/my-image.jpg?h=400&amp;w=600&amp;ixlib=js-1.2.0" 
 data-srcset="https://test.imgix.net/dir/my-image.jpg?h=200&amp;w=300&amp;ixlib=js-1.2.0 480w,
 https://test.imgix.net/dir/my-image.jpg?h=300&amp;w=600&amp;ixlib=js-1.2.0 640w" 
 data-sizes="(min-width: 640px) 50vw, 100vw" 
 alt="Test image" data-v-57509004=""
 title="Title of the image"
 class="image-big right lazyload" 
 sizes="(min-width: 640px) 50vw, 100vw">
 -->
 
```

### Filter

`<img :src="'my-image.jpg' | transformUrl({blur: 50})">`