'use strict'

const Koa = require('koa')
const app = new Koa()
const router = require('koa-router')()
const path = require('path')
// const session = require('koa-session')
const { requireFiles } = require('./utils')

// app.keys = ['easy-task']

// 中间件
require('koa-onerror')(app)
app.use(require('koa-body')({
  multipart: true,
  formidable: {
    maxFileSize: 1000 * 1024 * 1024 // 设置上传文件大小最大限制，最大1G
  }
}))
app.use(require('koa-json')())
app.use(require('koa-logger')())
app.use(require('koa-static')(path.join(__dirname, '../dist')))
// app.use(session({
//   maxAge: 86400000
// }, app))

// 日志打印
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(router.routes()).use(router.allowedMethods())

// 加载 routers 文件夹下的所有路由
requireFiles(path.join(__dirname, '/routers'), '', file => {
  app.use(file.routes(), file.allowedMethods())
})

// 错误处理
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
