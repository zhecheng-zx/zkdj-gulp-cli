/**
 * Created by zhangxin on 2018/11/9.
 */
// const exec = require('child_process').exec
const ora = require('ora')
const co = require('co')
const inquirer = require('inquirer')
const chalk = require('chalk')
const request = require('request')
const download = require('download-git-repo')

module.exports = () => {

  co(function *() {
    request({
      url: 'https://api.github.com/users/zkdj-template/repos',
      headers: {
        'User-Agent': 'zkdj-gulp-cli'
      }
    }, (err, res, body) =>{
      if (err) {
        console.log(chalk.red('查询模版列表失败'))
        console.log(chalk.red(err))
        process.exit();
      }

      const requestBody = JSON.parse(body)
      if (Array.isArray(requestBody)) {
        let tplNames = [];
        requestBody.forEach(repo => {
          tplNames.push(repo.name);
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
            name: 'projectName',
            validate (val) {
              if (val !== '') {
                return true
              }
              return '项目名称不能为空'
            }
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
            console.log(chalk.green(`\n √ ${answers.projectName} 项目生成完毕!`))
            console.log(`\n cd ${answers.projectName} && npm install \n`)
          });
          // /**
          //  * 拼接git命令,有问题，会带这git仓库信息。
          //  */
          // let cmdStr = `git clone -b ${ind.default_branch} ${ind.clone_url} ${answers.projectName}`;
          //
          // let spinner = ora('\n 开始生成项目，请等待...');
          // spinner.start()
          // exec(cmdStr, (error, stdout, stderr) => {
          //   spinner.stop()
          //   if (error) {
          //     console.log('模版下载失败……')
          //     console.log(error)
          //     process.exit()
          //   }
          //   console.log(chalk.green(`\n √ ${answers.projectName} 项目生成完毕!`))
          //   console.log(`\n cd ${answers.projectName} && npm install \n`)
          //   process.exit()
          // })
        })
      } else {
        console.error(requestBody.message)
      }
    })
  })
}
