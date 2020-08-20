import axios from 'axios'
import { Loading } from 'element-ui';
var loading
var request = axios.create({
    baseURL:'http://127.0.0.1:8888/api/private/v1',
    headers:{
        'Content-Type': 'application/json;chartset=uft-8' // json
        // 'Content-Type': 'application/x-www-form-urlencoded', // form
    }
})

request.interceptors.request.use((config) => {
    loading = Loading.service({text:'正在加载',background: 'rgba(0, 0, 0, 0.3)'});
    sessionStorage.getItem('token') && (config.headers['Authorization'] = sessionStorage.getItem('token'))
    return config
},(err) => {
    loading && loading.close()
    return Promise.reject(err)
})

request.interceptors.response.use(res => {
    loading && loading.close()
    // let {data} = res
    return res
},err => {
    Loading && loading.close()
    return Promise.reject(err)
})

export default request