/**
 * Created by zhangxin on 2018/11/9.
 */
const config = require('../templates/templates')
const chalk = require('chalk')

module.exports = () => {
  if(Array.isArray(config.tpl)){
    console.log("可用模版，如下：")
    console.log()
    config.tpl.forEach(template => {
      console.log(
        ' ' + chalk.yellow("*") +
        ' ' + chalk.blue(template.name) +
        ' - ' + template.description
      )
    })
  } else {
    console.error('config.tpl is not Array, is a' + typeof config.tpl)
  }
  process.exit()
}
