'use strict'

const fs = require('fs')
const path = require('path')
// const gm = require('gm')
// const imageMagick = gm.subClass({ imageMagick: true })
const sharp = require('sharp')
const CarouselModel = require('../models/carousel')
const ImageModel = require('../models/image')
const VideoModel = require('../models/video')

module.exports = {
  fetchCarousel: async (ctx, next) => {
    try {
      ctx.body = {
        code: '0',
        data: await CarouselModel.find().sort({ created: -1 })
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
        data: await new CarouselModel(await _upload(ctx, 'carousel')).save()
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

      ctx.body = {
        code: '0',
        data: await CarouselModel.findByIdAndUpdate(id, await _reupload(ctx, 'carousel'))
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
      _remove(file.fileName, 'carousel')
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
  },

  fetchImage: async (ctx, next) => {
    try {
      ctx.body = {
        code: '0',
        data: await ImageModel.find().sort({ created: -1 })
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
        data: await new ImageModel(await _upload(ctx, 'works-image')).save()
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
      ctx.body = {
        code: '0',
        data: await ImageModel.findByIdAndUpdate(id, await _reupload(ctx, 'works-image'))
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
      _remove(file.fileName, 'works-image')
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
  },

  fetchVideo: async (ctx, next) => {
    try {
      ctx.body = {
        code: '0',
        data: await VideoModel.find().sort({ created: -1 })
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

  uploadVideo: async (ctx, next) => {
    try {
      ctx.body = {
        code: '0',
        data: await new VideoModel(await _upload(ctx, 'works-video')).save()
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
      // 移除目标文件
      _remove(file.fileName, 'works-video')
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

const _upload = async (ctx, type) => {
  try {
    let {
      files: { file },
      files: { file: { name: fileName } }
    } = ctx.request

    fileName = `${Math.ceil(Math.random() * 100000)}_${fileName}`

    await _saveFile2Local(file, fileName, type) // 保存文件到本地项目
    const fileFolder = `${ctx.protocol}://${ctx.hostname}:2080/upload/${type}`
    const distFolder = `${ctx.protocol}://${ctx.hostname}/upload/${type}`
    const filePath = `${fileFolder}/${fileName}` // 文件路径
    const distPath = `${distFolder}/${fileName}` // 文件路径
    const smFilePath = `${fileFolder}/sm_${fileName}` // 文件路径
    const smDistPath = `${distFolder}/sm_${fileName}` // 文件路径

    return { fileName, filePath, distPath, smFilePath, smDistPath }
  } catch (err) {
    throw (err)
  }
}

const _remove = async (fileName, type) => {
  try {
    const folderPath1 = path.join(__dirname, `../../public/upload/${type}`)
    const folderPath2 = path.join(__dirname, `../../dist/upload/${type}`)
    const filePath1 = `${folderPath1}/${fileName}`
    const filePath2 = `${folderPath2}/${fileName}`
    const smPath1 = `${folderPath1}/sm_${fileName}`
    const smPath2 = `${folderPath2}/sm_${fileName}`
    // 移除目标文件
    if (fs.existsSync(filePath1)) fs.unlinkSync(filePath1)
    if (fs.existsSync(filePath2)) fs.unlinkSync(filePath2)
    if (fs.existsSync(smPath1)) fs.unlinkSync(smPath1)
    if (fs.existsSync(smPath2)) fs.unlinkSync(smPath2)
  } catch (err) {
    throw (err)
  }
}

const _reupload = async (ctx, type) => {
  try {
    // TODO: 重新上传不删除之前的照片，BUG
    const { id } = ctx.request.body
    const _file = await CarouselModel.findById(id)
    _remove(_file.fileName, type)

    return await _upload(ctx, type)
  } catch (err) {
    throw (err)
  }
}

/**
 * @desc 保存文件到指定目录
 * @author chenguanbin
 * @param {Object} file 上传的文件对象
 * @param {String} type 类型
 * @return {Object} 返回文件名称和文件路径
 */
const _saveFile2Local = async (file, fileName, type) => {
  try {
    const { path: upPath } = file

    const uploadPath1 = path.join(__dirname, '../../public/upload')
    const uploadPath2 = path.join(__dirname, '../../dist/upload')
    if (!fs.existsSync(uploadPath1)) fs.mkdirSync(uploadPath1)
    if (!fs.existsSync(uploadPath2)) fs.mkdirSync(uploadPath2)

    const folderPath1 = `${uploadPath1}/${type}`
    const folderPath2 = `${uploadPath2}/${type}`
    if (!fs.existsSync(folderPath1)) fs.mkdirSync(folderPath1)
    if (!fs.existsSync(folderPath2)) fs.mkdirSync(folderPath2)

    // 生成正常图片，轮播图大小缩放到 1920 * 720
    if (type === 'carousel') {
      sharp(upPath).resize(1920, 720).toFile(`${folderPath1}/${fileName}`)
      sharp(upPath).resize(1920, 720).toFile(`${folderPath2}/${fileName}`)
    } else {
      sharp(upPath).toFile(`${folderPath1}/${fileName}`)
      sharp(upPath).toFile(`${folderPath2}/${fileName}`)
    }
    // sharp(upPath).resize(1920, 1080).toFile(`${folderPath1}/${fileName}`)
    // sharp(upPath).resize(1920, 1080).toFile(`${folderPath2}/${fileName}`)

    // 生成缩略图
    sharp(upPath).resize(192, 108).toFile(`${folderPath1}/sm_${fileName}`)
    sharp(upPath).resize(192, 108).toFile(`${folderPath2}/sm_${fileName}`)
  } catch (err) {
    throw (err)
  }
}
