'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { options } = require('./_')

const schema = new Schema(
  {
    fileName: { type: String, required: true }, // 文件名称
    filePath: { type: String, required: true }, // 文件路径
    title: { type: String, default: '' } // 文件标题
  },
  options
)

module.exports = mongoose.models.Video || mongoose.model('Video', schema, 'video')
