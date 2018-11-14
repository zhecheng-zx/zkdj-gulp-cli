/**
 * Created by zhangxin on 2018/11/14.
 */
const request = require('request')
/**
 * 获取gitHub的仓库信息
 */
module.exports = function getRepos() {
  return new Promise((resolve, reject) => {
    request({
      url: 'https://api.github.com/users/zkdj-template/repos',
      headers: {
        'User-Agent': 'zkdj-gulp-cli'
      }
    }, (err, res, body) => {
      if(err){
        reject(err)
      }else{
        const requestBody = JSON.parse(body)
        if(Array.isArray(requestBody)){
          resolve(requestBody)
        }else{
          reject(err);
        }
      }
    })
  })
}
