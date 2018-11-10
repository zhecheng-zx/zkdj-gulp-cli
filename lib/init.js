/**
 * Created by zhangxin on 2018/11/9.
 */
const exec = require('child_process').exec
const ora = require('ora')
const co = require('co')
const inquirer = require('inquirer')
const config = require('../templates/templates')
const chalk = require('chalk')

module.exports = () => {

  co(function *() {
    let tplNames = [];
    config.tpl.forEach(item =>{
      tplNames.push(item.name)
    })
    let promptList = [
      {
        type: 'list',
        message: '请选择模版',
        name: 'tplName',
        choices: tplNames
      },
      {
        type: 'input',
        message: '请输入项目名字',
        name: 'projectName'
      }
    ]
    inquirer.prompt(promptList).then(answers => {

      let ind = config.tpl.find(function (ele) {
          return answers.tplName == ele.name;
      });
      /**
       * 拼接git命令
       */
      let cmdStr = `git clone -b ${ind.branch} ${ind.url} ${answers.projectName}`;

      let spinner = ora('\n 开始生成项目，请等待...');
      spinner.start()
      exec(cmdStr, (error, stdout, stderr) => {
        spinner.stop()
        if (error) {
          console.log('模版下载失败……')
          console.log(error)
          process.exit()
        }
        console.log(chalk.green(`\n √ ${answers.projectName} 项目生成完毕!`))
        console.log(`\n cd ${answers.projectName} && npm install \n`)
        process.exit()
      })
    })
  })
}
