/**
 * Created by zhangxin on 2018/11/9.
 */
const co = require('co')
const inquirer = require('inquirer')
const config = require('../templates/templates')
const chalk = require('chalk')
const fs = require('fs')

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
      }
    ]
    inquirer.prompt(promptList).then(answers => {
      let ind = config.tpl.find(function (ele) {
        return answers.tplName == ele.name;
      });
      console.log(config.tpl.indexOf(ind));
      config.tpl.splice(config.tpl.indexOf(ind),1);
      fs.writeFile('./templates/templates.json', JSON.stringify(config), 'utf-8', (err) => {
        if (err) console.log(err)
        console.log(chalk.green('模版删除成功！'))
        console.log()
        require('./list')();
        console.log('\n')
        process.exit()
      })
    })
  })
}
