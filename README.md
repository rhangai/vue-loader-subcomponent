vue-loader-subcomponent
===============================

Basic Usage
--------------------------------

A subcomponent loader for vue-loader that allows the following extension:

```html
<!-- 
  <list-title> subcomponent 
-->
<subcomponent name="list-title">
  <template>
      <h1>List Title</h1>
  </template>
</subcomponent>

<!-- 
  <list-item> subcomponent 
-->
<subcomponent name="list-item">
  <template>
      <li><a :href="item.href">{{item.text}}</a></li>
  </template>
  <script>
    export default {
      props: ['item']
    };
  </script>
</subcomponent>


<!-- 
   Main component as usual 
-->
<template>
  <div>
    <list-title />
    My fancy list:
    <ul>
      <list-item v-for="item in items" :item="item" />
    </ul>
  </div>
</template>
<script>
  export default {
    data() {
      return { items: [
          { href: "#", text: "index" },
      ]};
    }
  };
</script>
```

Configuration
--------------------------

You have to edit your `webpack.config.js` to:
```js
// ...
module: {
  rules: [
    // ...,
    {
      test: /\.vue$/,
      use: ['vue-loader-subcomponent', {
        loader: 'vue-loader',
        options: {
          loaders: {
            subcomponent: 'vue-loader-subcomponent/subcomponent'
          }
        }
      }]
    }
  ]
}

```

So the vue-loader can recognize the subcomponent extension
