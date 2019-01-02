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
          url="myImage.jpg"
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
        // :data-sizes can be ['auto']
```

### Filter

`<img :src="'myImage.jpg' | transformUrl({blur: 50})">`