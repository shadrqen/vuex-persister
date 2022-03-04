# vuex-persister

A [Vuex4](https://vuex.vuejs.org), [Vue3](https://vuejs.org) and [Nuxt](https://nuxtjs.org/) - ready plugin that saves and rehydrates the state of your application between page reloads
<br /> <br />

[![GitHub stars](https://img.shields.io/github/stars/shadrqen/vuex-persister.svg?style=social&label=%20vuex-persister)](http://github.com/shadrqen/vuex-persister)
[![npm](https://img.shields.io/npm/v/vuex-persister.svg?colorB=dd1100)](http://npmjs.com/vuex-persister)
[![npm](https://img.shields.io/npm/dw/vuex-persister.svg?colorB=fc4f4f)](http://npmjs.com/vuex-persister)
[![license](https://img.shields.io/github/license/shadrqen/vuex-persister.svg)]()
![Build Status](https://github.com/shadrqen/vuex-persister/actions/workflows/ci.yml/badge.svg?branch=main)
[![umd:min:gzip](https://img.badgesize.io/https://unpkg.com/vuex-persister?compression=gzip&label=umd:min:gzip)](https://unpkg.com/vuex-persister)
[![umd:min:brotli](https://img.badgesize.io/https://cdn.jsdelivr.net/npm/vuex-persister?compression=brotli&label=umd:min:brotli)](https://cdn.jsdelivr.net/npm/vuex-persister)


## Installation

```bash
npm install --save vuex-persister
```

or

```bash
yarn add vuex-persister
```


## Usage

### Import the package
```js
import VuexPersister from 'vuex-persister'
```

### Instantiate the VuexPersister instance
```js
// JavaScript
const vuexPersistor = new VuexPersister({
    // ...your options
})

// Typescript
const vuexPersistor = new VuexPersister<State>({
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
// ~/plugins/vuex-persister.js
import VuexPersister from 'vuex-persister'

export default ({ store }) => {
  new VuexPersister({
    // ...your options
  }).persist(store)
}
```

### Register plugin
```js
// ~nuxt.config.js
export default {
  /* ... other options here */
   plugins: [{ src: '~/plugins/vuex-persister.js', ssr: false }],
}
```


## API

### ``` new VuexPersister({ /* your options */ })```

Creates an instance of the plugin while accepting specific options as below:
- `key <String>`: The key with which to store the state in the specified storage. Defaults to `vuex`.
- `overwrite <Boolean>`: Whether to overwrite the state with the saved state instead of merging the two objects with `deepmerge`. Defaults to `false`.
- `storage <Object>`: The storage to use. Should be either `localStorage` or `sessionStorage`. Defaults to `localStorage`.

### Example usage
```js
// JavaScript
new VuexPersister({
  key: 'my_key',
  overwrite: true,
  storage: sessionStorage
})
```


## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.
