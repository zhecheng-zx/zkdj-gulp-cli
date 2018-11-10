/**
 * Created by zhangxin on 2018/11/9.
 */
// const co = require('co')
// const inquirer = require('inquirer')
// const config = require('../templates/templates')
const chalk = require('chalk')
// const fs = require('fs')

module.exports = () => {
  console.log(chalk.red('该功能，暂不可用！'))
  process.exit()
  // return false;
  // co(function *() {
  //   var promptList = [
  //     {
  //       type: 'input',
  //       name: 'name',
  //       message: '输入一个模版名称：',
  //       default: 'XXX_template',
  //       validate: val => {
  //         if(val.trim() == '' || val.trim() == null || val.trim() == undefined){
  //           return '必须设置模版的名称'
  //         }
  //         if(config.tpl.some(ele => {return ele.name == val})){
  //           console.log(chalk.red('模版已存在'))
  //           process.exit()
  //         }
  //         return true
  //       }
  //     },
  //     {
  //       type: 'input',
  //       name: 'description',
  //       message: '给模版写个简介：',
  //       default: '这是一个XXX的模版',
  //       validate: val =>{
  //         if(val.trim() == '' || val.trim() == null || val.trim() == undefined) {
  //           return '必须设置模版简介,让别人知道你的模版是干啥的'
  //         }
  //         return true
  //       }
  //     },
  //     {
  //       type: 'input',
  //       name: 'url',
  //       message: '输入模版git的https链接：',
  //       validate: val => {
  //         if(val.trim() == '' || val.trim() == null || val.trim() == undefined){
  //           return '必须输入模版git的https链接'
  //         }
  //         return true
  //       }
  //     },
  //     {
  //       type: 'input',
  //       name: 'branch',
  //       message: '输入模版git的分支',
  //       default: 'master',
  //       validate: val =>{
  //         if(val.trim() == '' || val.trim() == null || val.trim() == undefined) {
  //           return '必须输入模版git的分支'
  //         }
  //         return true
  //       }
  //     }
  //   ]
  //   inquirer.prompt(promptList).then(answers => {
  //     /**
  //      * 判断模版是否存在
  //      */
  //     if(config.tpl.some(ele => {return ele.url == answers.url && ele.branch == answers.branch})){
  //       console.log()
  //       console.log('\n'+ chalk.red('模版已存在'))
  //       process.exit()
  //     }
  //     config.tpl.push(answers)
  //   }).then(answers => {
  //     console.log(chalk.red('该功能，暂不可用！'))
  //     fs.writeFile('./templates/templates.json', JSON.stringify(config), 'utf-8', (err) => {
  //       if (err) {
  //         console.log(err);
  //         process.exit()
  //       }
  //       console.log()
  //       console.log(chalk.green('新模版添加成功\n'))
  //       require('./list')()
  //       console.log('\n')
  //       process.exit()
  //     })
  //   })
  })
}
