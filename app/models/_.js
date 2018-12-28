module.exports = {
  options: {
    // 不生成版本号字段 __v
    versionKey: false,
    // 自动生成创建时间和更新时间
    timestamps: {
      createdAt: 'created',
      updatedAt: 'updated'
    }
  }
}
