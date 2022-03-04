# vuex-persistor

A [Vuex4](https://vuex.vuejs.org), [Vue3](https://vuejs.org) and [Nuxt](https://nuxtjs.org/) - ready plugin that saves and rehydrates the state of your application between page reloads
<br /> <br />

[![GitHub stars](https://img.shields.io/github/stars/shadrqen/vuex-persistor.svg?style=social&label=%20vuex-persistor)](http://github.com/shadrqen/vuex-persistor)
[![npm](https://img.shields.io/npm/v/vuex-persistor.svg?colorB=dd1100)](http://npmjs.com/vuex-persistor)
[![npm](https://img.shields.io/npm/dw/vuex-persistor.svg?colorB=fc4f4f)](http://npmjs.com/vuex-persistor)
[![license](https://img.shields.io/github/license/shadrqen/vuex-persistor.svg)]()
![Build Status](https://github.com/shadrqen/vuex-persistor/actions/workflows/ci.yml/badge.svg?branch=main)
[![umd:min:gzip](https://img.badgesize.io/https://unpkg.com/vuex-persistor?compression=gzip&label=umd:min:gzip)](https://unpkg.com/vuex-persistor)
[![umd:min:brotli](https://img.badgesize.io/https://cdn.jsdelivr.net/npm/vuex-persistor?compression=brotli&label=umd:min:brotli)](https://cdn.jsdelivr.net/npm/vuex-persistor)


## Installation

```bash
npm install --save vuex-persistor
```

or

```bash
yarn add vuex-persistor
```


## Usage

### Import the package
```js
import VuexPersistor from 'vuex-persistor'
```

### Instantiate the VuexPersistor instance
```js
// JavaScript
const vuexPersistor = new VuexPersistor({
    // ...your options
})

// Typescript
const vuexPersistor = new VuexPersistor<State>({
    // ...your options
})
```

### Initialize the store
```js
// JavaScript
const store = createStore({
  state: {/* ...*/},
  getters: {/* ...*/},
  mutations: {/* ...*/},
  actions: {/* ...*/},
  plugins: [vuexPersistor.persist] // integrate the plugin
})

// TypeScript
const store = createStore<State>({
  state: {/* ...*/},
  getters: {/* ...*/},
  mutations: {/* ...*/},
  actions: {/* ...*/},
  plugins: [vuexPersistor.persist] // integrate the plugin
})
```

## Nuxt.js

### Define plugin
```js
// ~/plugins/vuex-persistor.js
import VuexPersistor from 'vuex-persistor'

export default ({ store }) => {
  new VuexPersistor({
    // ...your options
  }).persist(store)
}
```

### Register plugin
```js
// ~nuxt.config.js
export default {
  /* ... other options here */
   plugins: [{ src: '~/plugins/vuex-persistor.js', ssr: false }],
}
```


## API

### ``` new VuexPersistor({ /* your options */ })```

Creates an instance of the plugin while accepting specific options as below:
- `key <String>`: The key with which to store the state in the specified storage. Defaults to `vuex`.
- `overwrite <Boolean>`: Whether to overwrite the state with the saved state instead of merging the two objects with `deepmerge`. Defaults to `false`.
- `storage <Object>`: The storage to use. Should be either `localStorage` or `sessionStorage`. Defaults to `localStorage`.

### Example usage
```js
// JavaScript
new VuexPersistor({
  key: 'random',
  overwrite: true,
  storage: sessionStorage
})
```


## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.
