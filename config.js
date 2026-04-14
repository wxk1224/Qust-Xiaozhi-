// 环境变量配置文件

let env = "develop"


// 上传服务器时自动将env改为production
const envVersion = wx.getAccountInfoSync()
.miniProgram.envVersion
if(envVersion === "release" && env !== "production"){
  env = "production"
}


export default{
  env,
  baseUrl: {
    develop:'http://localhost:3000',
    // 开源前请替换为你自己的线上服务地址
    production: 'https://your-api.example.com'
  }
}
