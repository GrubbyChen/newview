'use strict'

const fs = require('fs')
const path = require('path')
const nodemailer = require('nodemailer')

// 设置Node环境变量
require('dotenv').config()

module.exports = {
  /**
   * @desc 以递归的形式，读取文件夹下的 js 文件，并 require
   * @author chenguanbin
   * @Date: 2018-11-14 13:48:33
   * @param {String} folderPath 文件夹路径
   * @param {String} igonreFiles 忽略的文件，里面的文件不会被 require
   */
  requireFiles: (folderPath, igonreFiles, cb) => {
    for (let fileName of fs.readdirSync(folderPath)) {
      // 被忽略的文件直接跳过
      if (igonreFiles && igonreFiles.includes(fileName)) continue

      var filePath = path.join(folderPath, `/${fileName}`)
      var stat = fs.statSync(filePath)
      // 判断目标是文件还是文件夹，文件直接require，文件夹递归读取
      if (stat.isFile()) {
        if (/(.*)\.(js)/.test(fileName)) {
          const file = require(filePath)
          cb && cb(file)
        }
      } else if (stat.isDirectory()) {
        this.requireFiles(filePath)
      }
    }
  },

  sendEmail: async (emailBody) => {
    try {
      let transporter = nodemailer.createTransport({
        // host: 'smtp.ethereal.email',
        service: 'qq', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
        port: 465, // SMTP 端口
        secureConnection: true, // 使用了 SSL
        auth: {
          user: '390539201@qq.com',
          // 这里密码不是qq密码，是你设置的smtp授权码
          pass: 'vqdzyrgyjtzxbibg'
        }
      })
      let mailOptions = {
        from: '"newview" <390539201@qq.com>', // sender address
        to: 'ko@newview.co.jp', // list of receivers
        subject: 'Hello', // Subject line
        // 发送text或者html格式
        // text: 'Hello world?', // plain text body
        html: emailBody // html body
      }
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error)
        }
        console.log('Message sent: %s', info.messageId)
        // Message sent: <04ec7731-cc68-1ef6-303c-61b0f796b78f@qq.com>
      })
    } catch (err) {
      console.error(err)
      throw err
    }
  }
}
