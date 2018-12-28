'use strict'

const Router = require('koa-router')
const GatewayController = require('../controllers/gateway')

// 设置Node环境变量
require('dotenv').config()

// 路由 uri 前缀
const prefix = '/gateway'

var router = new Router({
  prefix: process.env.VUE_APP_PROXY_PREFIX + prefix
})

router.get('/fetchCarousel', GatewayController.fetchCarousel)
router.get('/fetchWorkImage', GatewayController.fetchWorkImage)
router.get('/fetchWorkVideo', GatewayController.fetchWorkVideo)
router.post('/sendEmail', GatewayController.sendEmail)

module.exports = router
