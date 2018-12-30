'use strict'

const fs = require('fs')
const path = require('path')
const CarouselModel = require('../models/carousel')
const ImageModel = require('../models/image')
const VideoModel = require('../models/video')

module.exports = {
  fetchCarousel: async (ctx, next) => {
    try {
      ctx.body = {
        code: '0',
        data: await CarouselModel.find()
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
      const { id, title } = ctx.request.body

      ctx.body = {
        code: '0',
        data: await VideoModel.findByIdAndUpdate(id, { title })
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
    const filePath = `${ctx.protocol}://${ctx.hostname}:2080/upload/${type}/${fileName}` // 文件路径
    const distPath = `${ctx.protocol}://${ctx.hostname}/upload/${type}/${fileName}` // 文件路径

    return { fileName, filePath, distPath }
  } catch (err) {
    throw (err)
  }
}

const _reupload = async (ctx, type) => {
  try {
    const { id } = ctx.request.body
    const _file = await CarouselModel.findById(id)
    fs.unlinkSync(path.join(__dirname, `../../public/upload/${type}/`) + _file.fileName)
    fs.unlinkSync(path.join(__dirname, `../../dist/upload/${type}/`) + _file.fileName)

    let {
      files: { file },
      files: { file: { name: fileName } }
    } = ctx.request

    fileName = `${Math.ceil(Math.random() * 100000)}_${fileName}`
    await _saveFile2Local(file, fileName, type) // 保存文件到本地项目
    const filePath = `${ctx.protocol}://${ctx.hostname}:2080/upload/${type}/${fileName}` // 文件路径
    const distPath = `${ctx.protocol}://${ctx.hostname}/upload/${type}/${fileName}` // 文件路径

    return { fileName, filePath, distPath }
  } catch (err) {
    throw (err)
  }
}

const _remove = async (fileName, type) => {
  try {
    // 移除目标文件
    fs.unlinkSync(path.join(__dirname, `../../public/upload/${type}/`) + fileName)
    fs.unlinkSync(path.join(__dirname, `../../dist/upload/${type}/`) + fileName)
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
    const filePath1 = `${folderPath1}/${fileName}`
    const filePath2 = `${folderPath2}/${fileName}`
    if (!fs.existsSync(folderPath1)) fs.mkdirSync(folderPath1)
    if (!fs.existsSync(folderPath2)) fs.mkdirSync(folderPath2)

    // 写入文件
    const reader = fs.createReadStream(upPath) // 创建可读流
    const fileStream1 = fs.createWriteStream(filePath1) // 创建可写流
    const fileStream2 = fs.createWriteStream(filePath2) // 创建可写流
    reader.pipe(fileStream1) // 可读流通过管道写入可写流
    reader.pipe(fileStream2) // 可读流通过管道写入可写流
  } catch (err) {
    throw (err)
  }
}
