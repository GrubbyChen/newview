'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { options } = require('./_')

const schema = new Schema(
  {
    src: { type: String, required: true }, // 视频路径
    title: { type: String, default: '' } // 视频标题
  },
  options
)

module.exports = mongoose.models.Video || mongoose.model('Video', schema, 'video')
