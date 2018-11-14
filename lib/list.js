/**
 * Created by zhangxin on 2018/11/9.
 */
const getRepos = require('./getRepos');
const chalk = require('chalk')
const ora = require('ora')
module.exports = () => {
  let spinner = ora('\n ' + chalk.yellow('正在查询模版列表，请等待...'));
  spinner.start();
  getRepos().then((res)=>{
    spinner.stop();
    let requestBody = res
    console.log()
    console.log(chalk.green('可用的模版列表：'))
    console.log()
    requestBody.forEach(repo => {
      console.log(
        '  ' + chalk.yellow('★') +
        '  ' + chalk.blue(repo.name) +
        ' - ' + repo.description)
    })
  }, (err)=>{
    console.log()
    console.log(chalk.red('查询模版列表失败'))
    console.log(chalk.red(err))
    process.exit()
  });
}
