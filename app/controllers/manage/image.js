'use strict'

const ImageModel = require('../../models/image')
const { fetch, upload, remove, reupload } = require('../../utils/manage')

module.exports = {
  fetchImage: async (ctx, next) => {
    try {
      ctx.body = {
        code: '0',
        data: await fetch(ctx, ImageModel)
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

  uploadImage: async (ctx, next) => {
    try {
      ctx.body = {
        code: '0',
        data: await new ImageModel(await upload(ctx, 'works-image')).save()
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

  reuploadImage: async (ctx, next) => {
    try {
      const { id } = ctx.request.body
      const file = await ImageModel.findById(id)
      ctx.body = {
        code: '0',
        data: await ImageModel.findByIdAndUpdate(id, await reupload(ctx, file.fileName, 'works-image'))
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

  updateImageInfo: async (ctx, next) => {
    try {
      const { id, title } = ctx.request.body

      ctx.body = {
        code: '0',
        data: await ImageModel.findByIdAndUpdate(id, { title })
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

  removeImage: async (ctx, next) => {
    try {
      const { id } = ctx.request.body
      const file = await ImageModel.findById(id)
      // 移除目标文件
      await remove(file.fileName, 'works-image')
      await ImageModel.remove(file)

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
