'use strict'

// const CarouselModel = require('../models/carousel')
// const ImageModel = require('../models/image')
// const AlbumModel = require('../models/album')
// const AlbumItemModel = require('../models/albumitem')
// const VideoModel = require('../models/video')

const { sendEmail } = require('../utils')

module.exports = {
  // fetchCarousel: async (ctx, next) => {
  //   try {
  //     ctx.body = {
  //       code: '0',
  //       data: await CarouselModel.find().sort({ created: -1 })
  //     }
  //     next()
  //   } catch (err) {
  //     console.error(err)
  //     ctx.body = {
  //       code: '1',
  //       msg: '系统错误'
  //     }
  //   }
  // },

  // fetchWorkImage: async (ctx, next) => {
  //   try {
  //     ctx.body = {
  //       code: '0',
  //       data: await ImageModel.find().sort({ created: -1 })
  //     }
  //     next()
  //   } catch (err) {
  //     console.error(err)
  //     ctx.body = {
  //       code: '1',
  //       msg: '系统错误'
  //     }
  //   }
  // },

  // fetchWorkAlbum: async (ctx, next) => {
  //   try {
  //     let albums = await AlbumModel.find().sort({ created: -1 })
  //     for (let item of albums) {
  //       const albumItem = await AlbumItemModel.find({ parentId: item._id })
  //       if (albumItem && albumItem.length) item.children = albumItem
  //     }
  //     ctx.body = {
  //       code: '0',
  //       data: albums
  //     }
  //     next()
  //   } catch (err) {
  //     console.error(err)
  //     ctx.body = {
  //       code: '1',
  //       msg: '系统错误'
  //     }
  //   }
  // },

  // fetchWorkVideo: async (ctx, next) => {
  //   try {
  //     ctx.body = {
  //       code: '0',
  //       data: await VideoModel.find().sort({ created: -1 })
  //     }
  //     next()
  //   } catch (err) {
  //     console.error(err)
  //     ctx.body = {
  //       code: '1',
  //       msg: '系统错误'
  //     }
  //   }
  // },

  sendEmail: async (ctx, next) => {
    try {
      let { name, phone, email, company, message } = ctx.request.body
      const emailBody = `
        <p>Name: ${name}</p>
        <p>Phone: ${phone}</p>
        <p>Email: ${email}</p>
        <p>Company: ${company}</p>
        <p>Message: ${message}</p>
      `
      await sendEmail(emailBody)
      ctx.body = {
        code: '0',
        msg: '发送成功'
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
