'use strict'

const Router = require('koa-router')
const CarouselController = require('../controllers/manage/carousel')
const ImageController = require('../controllers/manage/image')
const AlbumController = require('../controllers/manage/album')
const VideoController = require('../controllers/manage/video')

// 设置Node环境变量
require('dotenv').config()

// 路由 uri 前缀
const prefix = '/manage'

var router = new Router({
  prefix: process.env.VUE_APP_PROXY_PREFIX + prefix
})

router.get('/fetchCarousel', CarouselController.fetchCarousel)
router.post('/uploadCarousel', CarouselController.uploadCarousel)
router.post('/reuploadCarousel', CarouselController.reuploadCarousel)
router.post('/removeCarousel', CarouselController.removeCarousel)

router.get('/fetchImage', ImageController.fetchImage)
router.post('/uploadImage', ImageController.uploadImage)
router.post('/reuploadImage', ImageController.reuploadImage)
router.post('/updateImageInfo', ImageController.updateImageInfo)
router.post('/removeImage', ImageController.removeImage)

router.get('/fetchAlbum', AlbumController.fetchAlbum)
router.post('/uploadAlbum', AlbumController.uploadAlbum)
router.post('/reuploadAlbum', AlbumController.reuploadAlbum)
router.post('/updateAlbumInfo', AlbumController.updateAlbumInfo)
router.post('/removeAlbum', AlbumController.removeAlbum)
router.post('/uploadAlbumItem', AlbumController.uploadAlbumItem)
router.post('/reuploadAlbumItem', AlbumController.reuploadAlbumItem)
router.post('/removeAlbumItem', AlbumController.removeAlbumItem)

router.get('/fetchVideo', VideoController.fetchVideo)
router.post('/createVideo', VideoController.createVideo)
router.post('/updateVideoInfo', VideoController.updateVideoInfo)
router.post('/removeVideo', VideoController.removeVideo)

module.exports = router
