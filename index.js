// app/middleware/gzip.js
const isJSON = require('koa-is-json')
const accepts = require('accepts')
const zlib = require('zlib')
const brotli = require('iltorb')

module.exports = async function gzip (ctx, next) {
  await next()
  let body = ctx.body
  if (!body) return
  const encodings = new Set(accepts(ctx.req).encodings())

  if (isJSON(body)) {
    body = JSON.stringify(body)
  }
  if (encodings.has('br')) {
    const stream = brotli.compressStream()
    stream.flush = function () {}
    stream.end(body)
    ctx.body = stream
    ctx.set('Content-Encoding', 'br')
  } else {
      // 设置 gzip body，修正响应头
    const stream = zlib.createGzip()
    stream.end(body)
    ctx.body = stream
    ctx.set('Content-Encoding', 'gzip')
  }
}
