'use strict'

const Router = require('koa-router')
const ManageController = require('../controllers/manage')

// 设置Node环境变量
require('dotenv').config()

// 路由 uri 前缀
const prefix = '/manage'

var router = new Router({
  prefix: process.env.VUE_APP_PROXY_PREFIX + prefix
})

router.get('/fetchCarousel', ManageController.fetchCarousel)
router.post('/uploadCarousel', ManageController.uploadCarousel)
router.post('/reuploadCarousel', ManageController.reuploadCarousel)
router.post('/removeCarousel', ManageController.removeCarousel)

router.get('/fetchImage', ManageController.fetchImage)
router.post('/uploadImage', ManageController.uploadImage)
router.post('/reuploadImage', ManageController.reuploadImage)
router.post('/updateImageInfo', ManageController.updateImageInfo)
router.post('/removeImage', ManageController.removeImage)

router.get('/fetchVideo', ManageController.fetchVideo)
// router.post('/uploadVideo', ManageController.uploadVideo)
router.post('/createVideo', ManageController.createVideo)
router.post('/updateVideoInfo', ManageController.updateVideoInfo)
router.post('/removeVideo', ManageController.removeVideo)

module.exports = router
