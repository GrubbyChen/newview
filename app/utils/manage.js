'use strict'

const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

module.exports = {
  fetch: async (ctx, model) => {
    try {
      let { page, pageSize } = ctx.request.query
      if (!page) page = 1
      if (!pageSize) pageSize = 1
      page = parseInt(page, 10)
      pageSize = parseInt(pageSize, 10)
      const total = (await model.find()).length
      return {
        total,
        totalPage: Math.ceil(total / pageSize),
        data: await model.find().sort({ created: -1 }).limit(pageSize).skip((page - 1) * pageSize)
      }
    } catch (err) {
      throw (err)
    }
  },

  upload: async (ctx, type) => {
    try {
      return await _upload(ctx, type)
    } catch (err) {
      throw (err)
    }
  },

  remove: async (fileName, type) => {
    try {
      await _remove(fileName, type)
    } catch (err) {
      throw (err)
    }
  },

  reupload: async (ctx, fileName, type) => {
    try {
      await _remove(fileName, type)

      return await _upload(ctx, type)
    } catch (err) {
      throw (err)
    }
  },

  saveFile2Local: async (file, fileName, type) => {
    try {
      await _saveFile2Local(file, fileName, type)
    } catch (err) {
      throw (err)
    }
  }
}

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
