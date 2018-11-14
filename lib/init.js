/**
 * Created by zhangxin on 2018/11/9.
 */
const fs = require('fs')
const ora = require('ora')
const inquirer = require('inquirer')
const chalk = require('chalk')
const getRepos = require('./getRepos')
const gitUser = require('./gitUser')
const download = require('download-git-repo')

module.exports = () => {
  let author =gitUser();
  getRepos().then((res)=>{
    let tplNames = [],requestBody = res;
    requestBody.forEach(repo => {
      tplNames.push(repo.name);
    });
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
        name: 'projectName',
        validate (val) {
          if (val !== '') {
            return true
          }
          return '项目名称不能为空'
        }
      },
      {
        type: 'input',
        message: '请输入项目介绍',
        name: 'description',
        default: '这是一个新项目'
      },
      {
        type: 'input',
        message: '请输入作者信息',
        name: 'author',
        default: author
      }
    ]
    inquirer.prompt(promptList).then(answers => {
      let ind = requestBody.find(function (ele) {
        return answers.tplName == ele.name;
      });
      let gitUrl = `${ind.full_name}#${ind.default_branch}`,
        defaultUrl = './',
        projectUrl = `${defaultUrl}/${answers.projectName}`,
        spinner = ora('\n 开始生成项目，请等待...');
      spinner.start();
      download(gitUrl, projectUrl, (error)=>{
        spinner.stop();
        if (error) {
          console.log('模版下载失败……')
          console.log(error)
          process.exit()
        }
        let src = `${process.cwd()}/${answers.projectName}/package.json`
        fs.readFile(src,(err, data)=>{
          if(err) throw err
          let obj = JSON.parse(data)
          obj.name = answers.projectName
          obj.description = answers.description
          obj.author = answers.author
          obj.version = '1.0.0'
          let str = JSON.stringify(obj, null, 4)
          fs.writeFile(src, str, function (err) {
            if(err) throw err
          })
        })
        console.log(chalk.green(`\n √ ${answers.projectName} 项目生成完毕!`))
        console.log(`\n cd ${answers.projectName} && npm install \n`)
      })
    })
  },(err)=>{
    console.log(chalk.red('查询模版列表失败'))
    console.log(chalk.red(err))
    process.exit();
  })
}
