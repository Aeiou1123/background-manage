import axios from "axios";
import config from "../config";
import { ElMessage } from "element-plus";

const NETWORK_ERROR = '网络请求错误，请稍后重试'

// 创建一个axios实例
const service = axios.create({
    baseURL:config.baseApi
})

// 在请求之前做一些事情
service.interceptors.request.use((req) => {
    return req
})

// 在请求之后对返回的数据做一些判断
service.interceptors.response.use((res) => {
    const {code, data,msg} = res.data  //对数据解构
    if(code == 200){
        return data
    }else{
        ElMessage.error(msg || NETWORK_ERROR) //提示错误信息
        return Promise.reject(msg || NETWORK_ERROR)
    }
})

// 封装函数
function request(options){
    // options{
    //     method:'get',
    //     data:{...},
    //     mock:false,
    // },
    options.method = options.method || 'get'
    if(options.method.toLowerCase() == 'get'){ //转化为小写
        options.params = options.data
    }
    // 对mock的处理
    let isMock = config.isMock
    if(typeof options.mock !== 'undefined'){
        isMock = options.mock  //用自己的mock覆盖总的mock，比如mock总开关是true，那么可以设置自己单个的mock为false        
    }
    // 对线上环境做处理
    if(config.env == 'prod'){
        service.defaults.baseURL = config.baseApi
    }else{
        service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
    }
    return service(options)
}

export default request