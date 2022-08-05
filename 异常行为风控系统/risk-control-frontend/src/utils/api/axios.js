import axios from 'axios'

const requests = axios.create({
  timeout: 10000, // 请求 30s 超时
  headers: {
    get: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      // 在开发中，一般还需要单点登录或者其他功能的通用请求头，可以一并配置进来
    },
    post: {
      'Content-Type': 'application/json;charset=utf-8'
      // 在开发中，一般还需要单点登录或者其他功能的通用请求头，可以一并配置进来
    }
  }
})

//请求拦截器----在项目中发请求（请求没有发出去）可以做一些事情
requests.interceptors.request.use((config) => {
  //现在的问题是config是什么?配置对象
 
  return config;
});
 
//响应拦截器----当服务器手动请求之后，做出响应（相应成功）会执行的
requests.interceptors.response.use(
  (res) => {
 
    //相应成功做的事情
    return res.data;
  },
  (err) => {
    // alert("服务器响应数据失败");
    console.log(err);
  }
);

// get请求
export const httpGet = (url, params = {}) => {
  return new Promise ((resolve, reject) => {
    requests({
      url,
      method:'get',
      params
    }).then (res => {
      resolve(res.data)
    }).catch (err => {
      reject(err)
    })
  })
}

// post请求
export const httpPost = (url, data = {}, params = {}) => {
  return new Promise ((resolve, reject) => {
    requests({
      url,
      method: 'post',
      //对数据进行转换 --> xxx=xxx&hhh=hhh的形式
      // transformRequest: [function (data) {
      //   let res = ''
      //   for (let it in data) {
      //     res += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      //   }
      //   return res
      // }],
      // 发送的数据
      data,
      // url参数
      params
    }).then (res => {
      resolve(res.data)
    }).catch (err => {
      reject(err)
    })
  })
}
