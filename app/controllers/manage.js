'use strict'

const fs = require('fs')
const path = require('path')
const CarouselModel = require('../models/carousel')
const ImageModel = require('../models/image')
const VideoModel = require('../models/video')

/**
 * @desc 保存文件到指定目录
 * @author chenguanbin
 * @param {Object} file 上传的文件对象
 * @param {String} type 类型
 * @return {Object} 返回文件名称和文件路径
 */
const _saveFile = async (file, fileName, type) => {
  try {
    const { path: upPath } = file
    const reader = fs.createReadStream(upPath) // 创建可读流
    const folderPath = `${path.join(__dirname, '../../public/')}/${type}` // 文件夹路径

    // 若文件夹不存在，就创建一个
    if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath)
    const filePath = `${folderPath}/${fileName}` // 文件路径

    const fileStream = fs.createWriteStream(filePath) // 创建可写流
    reader.pipe(fileStream) // 可读流通过管道写入可写流
  } catch (err) {
    throw (err)
  }
}

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
      let {
        files: { file },
        files: { file: { name: fileName } }
      } = ctx.request

      fileName = `${Math.ceil(Math.random() * 100000)}_${fileName}`

      await _saveFile(file, fileName, 'carousel') // 保存文件到本地项目
      const filePath = `${ctx.protocol}://${ctx.hostname}:2080/carousel/${fileName}` // 文件路径
      const fileData = await new CarouselModel({ fileName, filePath }).save() // 保存文件到数据库

      ctx.body = {
        code: '0',
        data: fileData
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
      const publicPath = path.join(__dirname, '../../public')
      const _file = await CarouselModel.findById(id)
      fs.unlinkSync(`${publicPath}/carousel/${_file.fileName}`)

      let {
        files: { file },
        files: { file: { name: fileName } }
      } = ctx.request

      fileName = `${Math.ceil(Math.random() * 100000)}_${fileName}`
      await _saveFile(file, fileName, 'carousel') // 保存文件到本地项目
      const filePath = `${ctx.protocol}://${ctx.host}/carousel/${fileName}` // 文件路径

      ctx.body = {
        code: '0',
        data: await CarouselModel.findByIdAndUpdate(id, { fileName, filePath })
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
      const publicPath = path.join(__dirname, '../../public')
      const file = await CarouselModel.findById(id)
      // 移除目标文件
      fs.unlinkSync(`${publicPath}/carousel/${file.fileName}`)
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
      let {
        files: { file },
        files: { file: { name: fileName } }
      } = ctx.request

      fileName = `${Math.ceil(Math.random() * 100000)}_${fileName}`

      await _saveFile(file, fileName, 'works-image') // 保存文件到本地项目
      const filePath = `${ctx.protocol}://${ctx.host}/works-image/${fileName}` // 文件路径
      const fileData = await new ImageModel({ fileName, filePath }).save() // 保存文件到数据库

      ctx.body = {
        code: '0',
        data: fileData
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
      const publicPath = path.join(__dirname, '../../public')
      const _file = await ImageModel.findById(id)
      fs.unlinkSync(`${publicPath}/works-image/${_file.fileName}`)

      let {
        files: { file },
        files: { file: { name: fileName } }
      } = ctx.request

      fileName = `${Math.ceil(Math.random() * 100000)}_${fileName}`
      await _saveFile(file, fileName, '/works-image') // 保存文件到本地项目
      const filePath = `${ctx.protocol}://${ctx.host}/works-image/${fileName}` // 文件路径

      ctx.body = {
        code: '0',
        data: await ImageModel.findByIdAndUpdate(id, { fileName, filePath })
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
      const publicPath = path.join(__dirname, '../../public')
      const file = await ImageModel.findById(id)
      // 移除目标文件
      fs.unlinkSync(`${publicPath}/works-image/${file.fileName}`)
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
      let {
        files: { file },
        files: { file: { name: fileName } }
      } = ctx.request

      fileName = `${Math.ceil(Math.random() * 100000)}_${fileName}`

      await _saveFile(file, fileName, 'works-video') // 保存文件到本地项目
      const filePath = `${ctx.protocol}://${ctx.host}/works-video/${fileName}` // 文件路径
      const fileData = await new VideoModel({ fileName, filePath }).save() // 保存文件到数据库

      ctx.body = {
        code: '0',
        data: fileData
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
      const publicPath = path.join(__dirname, '../../public')
      const file = await VideoModel.findById(id)
      // 移除目标文件
      fs.unlinkSync(`${publicPath}/works-video/${file.fileName}`)
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
