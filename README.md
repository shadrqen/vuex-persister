# vuex-persister

Smallest and fastest [Vuex4](https://vuex.vuejs.org), [Vue3](https://vuejs.org) and [Nuxt](https://nuxtjs.org/) - ready plugin that saves and rehydrates the state of your application between page reloads
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
const vuexPersister = new VuexPersister({
    // ...your options
})

// Typescript
const vuexPersister = new VuexPersister<State>({
    // ...your options
})
```

### Initialize the store
```js
// JavaScript
const store = createStore({
  state: {/* ... */},
  // ...
  plugins: [vuexPersister.persist] // integrate the plugin
})

// TypeScript
const store = createStore<State>({
    state: {/* ... */},
    // ...
  plugins: [vuexPersister.persist] // integrate the plugin
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
- `statesToPersist <String[]>`: The specific states that needs to be persisted. Use dot notation for moduled states e.g. `user.name`.
Defaults to an empty array and saves all objects in the state instance.
- `overwrite <Boolean>`: Whether to overwrite the state with the saved state instead of merging the two objects with `deepmerge`. Defaults to `false`.
- `storage <Object>`: The storage to use. Should be either `localStorage` or `sessionStorage`. Defaults to `localStorage`. Can also define own functions
such as with the SecureLocalStorage Obfuscation below
- `getState <Function>`: A function that is called to retrieve a previously persisted state. Defaults to using `storage`'s `getItem` function.
- `saveState <Function>`: A function that is called to persist the given state. Defaults to using `storage`'s `setItem` function.
- `reducer <Function>`: A function that is called to specify the states to persist. Defaults to include the whole state.


### Example usage
```js
// JavaScript
new VuexPersister({
  key: 'my_key',
  overwrite: true,
  storage: sessionStorage // localStorage is the default here
})
```

## Cookies
You can also use cookies if localStorage/sessionStorage is not ideal.

```js
// install js-cookie and then import
import Cookies from 'js-cookie'

const vuexPersister = new VuexPersister({ // new VuexPersister<State>({ (for TypeScript)
    storage: {
        getItem: (key) => Cookies.get(key),
        setItem: (key, value) => Cookies.set(key, value, { secure: true }),
        removeItem: (key) => Cookies.remove(key),
        length: Object.keys(Cookies.get()).length,
        clear: () => Cookies.remove(),
        key: (key: number) => null
    }
})
```

## Obfuscating Local Storage
You may want to obfuscate your stored `localStorage` keys to prevent a person from easily retrieving the state. The `secure-ls` package secures the 
state with a high-level of encryption and data compression.  
**NOTE:** Encrypting and compressing your state alone does not offer enough security to store sensitive data like passwords and other personal information.
You can use it in conjunction with other security measures.

```js
// first install the secure-ls package
import SecureLS from 'secure-ls'
import VuexPersister from 'vuex-persister'
const SecureLocalStorage = new SecureLS({ encodingType: 'aes' }) // AES encryption and data compression
/* Can also accept other options as below:
* new SecureLS({encodingType: '', isCompression: false})
* new SecureLS({isCompression: false})
* SecureLS({encodingType: 'rc4', isCompression: false})
* new SecureLS({encodingType: 'rc4', isCompression: false, encryptionSecret: 's3cr3tPa$$w0rd@123'})
* More details are found here (https://www.npmjs.com/package/secure-ls) */

// JavaScript
const vuexPersister = new VuexPersister({ // new VuexPersister<State> with TypeScript
  storage: {
    getItem: (key) => SecureLocalStorage.get(key),
    setItem: (key, value) => SecureLocalStorage.set(key, value),
    removeItem: (key) => SecureLocalStorage.remove(key),
    length: SecureLocalStorage.getAllKeys().length,
    clear: () => SecureLocalStorage.clear(),
    key: (key: number) => null
  }
})

```


## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.
