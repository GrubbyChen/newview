'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { options } = require('./_')

const schema = new Schema(
  {
    fileName: { type: String, required: true }, // 文件名称
    filePath: { type: String, required: true }, // 文件路径
    distPath: { type: String, required: true }, // 静态文件路径
    smFilePath: { type: String, required: true },
    smDistPath: { type: String, required: true }
  },
  options
)

module.exports = mongoose.models.Carousel || mongoose.model('Carousel', schema, 'carousel')
