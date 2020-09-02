import axios from "axios"
import qs from "qs"

let baseUrl = "/api";

//响应拦截
axios.interceptors.response.use(res => {
  console.group("====本次请求的地址是：" + res.config.url + "======");
  console.log(res);
  console.groupEnd()
  return res;
})

//菜单添加
export const reqAddMenu = (form) => {
  return axios({
    url: baseUrl + "/api/menuadd",
    method: "post",
    data: qs.stringify(form)
  })
}

//菜单列表
export const reqMenuList = (params) => {
  return axios({
    url: baseUrl + "/api/menulist",
    method: "get",
    params: params
  })
}

//菜单详情
export const reqMenuDetail = (params) => {
  return axios({
    url: baseUrl + "/api/menuinfo",
    method: "get",
    params: params
  })
}

//菜单修改
export const reqMenuUpdate = (form) => {
  return axios({
    url: baseUrl + "/api/menuedit",
    method: "post",
    data: qs.stringify(form)
  })
}

//菜单删除 params={id:1}
export const reqMenuDel = (params) => {
  return axios({
    url: baseUrl + "/api/menudelete",
    method: "post",
    data:qs.stringify(params)
  })
}