'use strict'

const AlbumModel = require('../../models/album')
const AlbumItemModel = require('../../models/albumitem')
const { upload, remove, reupload } = require('../../utils/manage')

module.exports = {
  fetchAlbum: async (ctx, next) => {
    try {
      let { page, pageSize } = ctx.request.query
      if (!page) page = 1
      if (!pageSize) pageSize = 1
      page = parseInt(page, 10)
      pageSize = parseInt(pageSize, 10)
      const total = (await AlbumModel.find()).length

      let albums = await AlbumModel.find().sort({ created: -1 }).limit(pageSize).skip((page - 1) * pageSize)
      for (let item of albums) {
        const albumItem = await AlbumItemModel.find({ parentId: item._id })
        if (albumItem && albumItem.length) item.children = albumItem
      }

      ctx.body = {
        code: '0',
        data: {
          total: total,
          totalPage: Math.ceil(total / pageSize),
          data: albums
        }
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

  uploadAlbum: async (ctx, next) => {
    try {
      ctx.body = {
        code: '0',
        data: await new AlbumModel(await upload(ctx, 'works-album')).save()
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

  reuploadAlbum: async (ctx, next) => {
    try {
      const { id } = ctx.request.body
      const file = await AlbumModel.findById(id)
      ctx.body = {
        code: '0',
        data: await AlbumModel.findByIdAndUpdate(id, await reupload(ctx, file.fileName, 'works-album'))
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

  updateAlbumInfo: async (ctx, next) => {
    try {
      const { id, title } = ctx.request.body

      ctx.body = {
        code: '0',
        data: await AlbumModel.findByIdAndUpdate(id, { title })
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

  removeAlbum: async (ctx, next) => {
    try {
      const { id } = ctx.request.body
      const file = await AlbumModel.findById(id)
      const fileItems = await AlbumItemModel.find({ parentId: file._id })
      for (let item of fileItems) {
        await remove(item.fileName, 'works-album')
        await AlbumItemModel.remove(item)
      }
      // 移除目标文件
      await remove(file.fileName, 'works-album')
      await AlbumModel.remove(file)

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
  },

  uploadAlbumItem: async (ctx, next) => {
    try {
      const { parentId } = ctx.request.body
      const params = await upload(ctx, 'works-album')
      params.parentId = parentId
      ctx.body = {
        code: '0',
        data: await new AlbumItemModel(params).save()
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

  reuploadAlbumItem: async (ctx, next) => {
    try {
      const { id } = ctx.request.body
      const file = await AlbumItemModel.findById(id)
      ctx.body = {
        code: '0',
        data: await AlbumItemModel.findByIdAndUpdate(id, await reupload(ctx, file.fileName, 'works-album'))
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

  removeAlbumItem: async (ctx, next) => {
    try {
      const { id } = ctx.request.body
      const file = await AlbumItemModel.findById(id)
      // 移除目标文件
      remove(file.fileName, 'works-album')
      await AlbumItemModel.remove(file)

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
