<template>
  <div class="home">
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <div class="loginBox">
        <el-form :label-position="labelPosition" label-width="180px" :model="formData">
            <div class="login_title">用户登录</div>
            <el-form-item label="账号">
                <el-input v-model="formData.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="formData.password" type="password"></el-input>
            </el-form-item>
            <div  @click="_login">登录</div>
        </el-form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import {login} from '../api'
export default {
  name: 'Home',
    data () {
      return{
          labelPosition:'top',
          formData:{
              username:'',
              password: ''
          }
      }
    },
  methods:{
    async _login () {
        if( this.formData.password.length < 1 || this.formData.username.length < 1 ) return this.$message.error('请输入账号或密码')
        var res = await login(this.formData)
        if(res.data.meta.status !== 200) return this.$message.error('账号或密码不正确')
        sessionStorage.setItem('token',res.data.data.token)
        this.$message({
            message: '登录成功',
            type: 'success'
        });
        this.$router.push({
            name:'home'
        })
    }
  },
  components: {
    // HelloWorld
  }
}
</script>d

<style lang="less" scoped type="text/less">
        .home{
            width: 100%;
            height: 100%;
            background-color: #607aff;
            padding-top: 150px;
            box-sizing: border-box;
        }
        .loginBox{
            width: 500px;
            height: 400px;
            background-color: white;
            margin: 0 auto;
            overflow: hidden;
            /*padding:30px 100px 50px 0;*/
            /*padding-top: 10px;*/
            box-sizing: border-box;
            .login_title{
                font-weight: 600;
                font-size: 20px;
            }
            .el-form{
                margin: 40px;
                div:nth-child(4){
                    width: 100%;
                    height: 38px;
                    background-color: #2f4dff;
                    color: white;
                    line-height: 38px;
                    text-align: center;
                    border-radius: 5px;
                    cursor: pointer;
                }
            }

        }
</style>
