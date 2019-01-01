'use strict'

const Router = require('koa-router')
const CarouselController = require('../controllers/manage/carousel')
const ImageController = require('../controllers/manage/image')
const AlbumController = require('../controllers/manage/album')
const VideoController = require('../controllers/manage/video')
const GatewayController = require('../controllers/gateway')

// 设置Node环境变量
require('dotenv').config()

// 路由 uri 前缀
const prefix = '/gateway'

var router = new Router({
  prefix: process.env.VUE_APP_PROXY_PREFIX + prefix
})

router.get('/fetchCarousel', CarouselController.fetchCarousel)
router.get('/fetchWorkImage', ImageController.fetchImage)
router.get('/fetchWorkAlbum', AlbumController.fetchAlbum)
router.get('/fetchWorkVideo', VideoController.fetchVideo)
router.post('/sendEmail', GatewayController.sendEmail)

module.exports = router
