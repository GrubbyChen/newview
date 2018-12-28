'use strict'

const mongoose = require('mongoose')
const path = require('path')
const { requireFiles } = require('./utils')

// 读取 models 文件夹下所有文件，并 require，除了 '_.js'
requireFiles(path.join(__dirname, '/models'), '_.js')

module.exports = {
  /**
   * @desc mongoose 连接数据库
   * @author chenguanbin
   * @Date: 2018-11-14 13:48:33
   */
  startDB: _ => {
    const db = process.env.MONGODB_URI
    mongoose.connect(
      db,
      { useNewUrlParser: true },
      () => {
        console.log(`🚀 🚀 🚀  Mongoose is running on ${db}`)
      }
    )
  }
}
