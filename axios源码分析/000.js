// 根据需求，axios 拥有一个 interceptors 对象属性，
// 该属性又有 request 和 response 2 个属性，
// 它们对外提供一个 use 方法来添加拦截器，
// 我们可以把这俩属性看做是一个拦截器管理对象。
// use 方法支持 2 个参数，第一个是 resolve 函数，第二个是 reject 函数，对于 resolve 函数的参数，
// 请求拦截器是 AxiosRequestConfig 类型的，而响应拦截器是 AxiosResponse 类型的；而对于 reject 函数的参数类型则是 any 类型的
axios = {
    interceptors:{
        request:'',
        response:''
    }
}