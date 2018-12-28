'use strict'

const http = require('http')
const mongo = require('./mongo')
const app = require('./app')

// 设置Node环境变量
require('dotenv').config()

// 启动 mongo 服务
mongo.startDB()

// 启动 HTTP 服务
const port = process.env.SERVER_PORT
const server = http.createServer(app.callback())
server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

/**
 * 监听 HTTP 服务的 'error' 事件
 */
function onError (error) {
  if (error.syscall !== 'listen') {
    throw error
  }
  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`)
      process.exit(1)
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`)
      process.exit(1)
    default:
      throw error
  }
}

/**
 * 监听 HTTP 服务的 'listening' 事件
 */
function onListening () {
  const addr = server.address()
  const bind = typeof addr === 'string' ? `Pipe ${addr}` : `Port ${addr.port}`
  console.log(`🚀 🚀 🚀  HTTP Server Listening on ${bind}`)
}
