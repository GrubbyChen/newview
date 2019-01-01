'use strict'

const CarouselModel = require('../../models/carousel')
const { fetch, upload, remove, reupload } = require('../../utils/manage')

module.exports = {
  fetchCarousel: async (ctx, next) => {
    try {
      ctx.body = {
        code: '0',
        data: await fetch(ctx, CarouselModel)
      }
      next()
    } catch (err) {
      console.error(err)
      ctx.body = {
        code: '1',
        msg: '系统错误'
      }
    }
  },

  uploadCarousel: async (ctx, next) => {
    try {
      ctx.body = {
        code: '0',
        data: await new CarouselModel(await upload(ctx, 'carousel')).save()
      }
      next()
    } catch (err) {
      console.error(err)
      ctx.body = {
        code: '1',
        msg: '系统错误'
      }
    }
  },

  reuploadCarousel: async (ctx, next) => {
    try {
      const { id } = ctx.request.body
      const file = await CarouselModel.findById(id)

      ctx.body = {
        code: '0',
        data: await CarouselModel.findByIdAndUpdate(id, await reupload(ctx, file.fileName, 'carousel'))
      }
      next()
    } catch (err) {
      console.error(err)
      ctx.body = {
        code: '1',
        msg: '系统错误'
      }
    }
  },

  removeCarousel: async (ctx, next) => {
    try {
      const { id } = ctx.request.body
      const file = await CarouselModel.findById(id)
      // 移除目标文件
      remove(file.fileName, 'carousel')
      await CarouselModel.remove(file)

      ctx.body = {
        code: '0'
      }
      next()
    } catch (err) {
      console.error(err)
      ctx.body = {
        code: '1',
        msg: '系统错误'
      }
    }
  }
}
