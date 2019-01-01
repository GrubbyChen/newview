'use strict'

const VideoModel = require('../../models/video')
const { fetch } = require('../../utils/manage')

module.exports = {
  fetchVideo: async (ctx, next) => {
    try {
      ctx.body = {
        code: '0',
        data: await fetch(ctx, VideoModel)
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

  createVideo: async (ctx, next) => {
    try {
      const { src, title } = ctx.request.body
      ctx.body = {
        code: '0',
        data: await new VideoModel({ src, title }).save()
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

  updateVideoInfo: async (ctx, next) => {
    try {
      const { id, src, title } = ctx.request.body

      const params = {}
      if (src) params.src = src
      if (title) params.title = title

      ctx.body = {
        code: '0',
        data: await VideoModel.findByIdAndUpdate(id, params)
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

  removeVideo: async (ctx, next) => {
    try {
      const { id } = ctx.request.body
      const file = await VideoModel.findById(id)
      await VideoModel.remove(file)

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
