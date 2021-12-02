import axios from 'axios'

// 登录用户
export const login = function (user, password) {
  return axios.post('/api/login', {
    user,
    password
  }).then(res => {
    return res.data
  }).catch(err => {
    console.log("api登录错误", err)
  })
};
// 注册用户
export const register = function (user, password) {
  return axios.post('/api/register', {
    user,
    password
  }).then(res => {
    return res.data
  }).catch(err => {
    console.log("api登录错误", err)
  })
};


//例子POST
export const get_diary_async = (data) => {
  return axios.request({
    url: '/api/getList',
    // data: data,
    method: 'GET'
  })
}
// 获取详细信息
export const get_details = function (id) {
  return axios.post('/api/get/details', {
    id
  }).then(res => {
    return res.data
  }).catch(err => {
    console.log("api登录错误", err)
  })
};
// 搜索
export const goods_search = function (search) {
  return axios.post('/api/goods/search', {
    ...search
  }).then(res => {
    return res
  }).catch(err => {
    console.log("api登录错误", err)
  })
};



/**
 * get方法，对应get请求
 */
export const get = function get (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res.data)
      // console.log(res)
    }).catch(err => {
      reject(err.data)
      // console.log(err)
    })
  })
}
/**
 * post方法，对应post请求
 */
export const post = function post (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}