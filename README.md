# egg-compress-middleware

an [eggjs](https://eggjs.org/) middleware to set gzip or brotli encodings.

## How to use

``` bash
$ npm i egg-compress-middleware
```

Then create a file in `middleware` directory to import the module.

``` js
// app/middleware/compress.js
const eggCompress =  require('egg-compress-middleware')

module.exports = (options) => {
  return eggCompress
}
```

Then enable the middleware in yout config files.


