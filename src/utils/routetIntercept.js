import router from '@/router'
import {Message} from 'element-ui'

router.beforeEach((to,from,next) => {
    if(!sessionStorage.getItem('token') ){
        if(to.path !== '/login'){
            Message({message:'请先登录',type:'warning'})
            next({path:'/login'})
        }else{
            next()
        }
    }else {
        next()
    }
})