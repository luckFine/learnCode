// method 只能传入合法字符串 字面量类型定义字符串
export type Method = 'get' | 'GET' | 
    'delete' | "Delete" |
     'head' | 'Head' |
     'post' | 'POST' |
     'put' | 'PUT' |
     'patch' | "PATCH"


export interface AxiosRequestConfig {
    url:string
    method?:Method
    data?:any
    params?:any
}