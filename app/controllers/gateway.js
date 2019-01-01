'use strict'

const { sendEmail } = require('../utils')

module.exports = {
  sendEmail: async (ctx, next) => {
    try {
      let { name, phone, email, company, message } = ctx.request.body
      const emailBody = `
        <p>お名前: ${name}</p>
        <p>メールアドレス: ${phone}</p>
        <p>御社名: ${email}</p>
        <p>電話番号: ${company}</p>
        <p>お間い合わせ内容: ${message}</p>
      `
      await sendEmail(emailBody)
      ctx.body = {
        code: '0',
        msg: '发送成功'
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
