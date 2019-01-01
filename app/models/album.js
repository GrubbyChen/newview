'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { options } = require('./_')

const schema = new Schema(
  {
    title: { type: String, default: '' }, // 文件标题
    fileName: { type: String, required: true }, // 文件名称
    filePath: { type: String, required: true }, // 文件路径
    distPath: { type: String, required: true }, // 静态文件路径
    smFilePath: { type: String, required: true },
    smDistPath: { type: String, required: true },
    children: { type: Array, default: [] }
  },
  options
)

module.exports = mongoose.models.Album || mongoose.model('Album', schema, 'album')
