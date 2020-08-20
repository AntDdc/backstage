<template>
    <div class="wrapper">
        <div class="header">
            <img src="@/assets/logo.png" alt="">
            <div>电商管理系统</div>
            <div @click="back">退出</div>
        </div>
        <div class="container">
            <div class="aside">
                <el-menu
                default-active="2"
                :router="true"
                class="el-menu-vertical-demo"
                :unique-opened=true
                background-color="#333744"
                text-color="#ffffff"
                @open="handleOpen"
                @close="handleClose">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>用户管理</span>
                        </template>
                            <el-menu-item index="/users">
                                <i class="el-icon-location"></i>
                                <span>用户列表</span>
                            </el-menu-item>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>权限管理</span>
                        </template>
                            <el-menu-item index="roles">角色列表</el-menu-item>
                            <el-menu-item index="rights">权限列表</el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>商品管理</span>
                        </template>
                            <el-menu-item index="3-1">商品列表</el-menu-item>
                            <el-menu-item index="3-2">分类参数</el-menu-item>
                            <el-menu-item index="3-3">商品分类</el-menu-item>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>订单管理</span>
                        </template>
                        <el-menu-item index="4-1">订单列表</el-menu-item>
                    </el-submenu>
                    <el-submenu index="5">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>数据统计</span>
                        </template>
                        <el-menu-item index="5-1">数据报表</el-menu-item>
                    </el-submenu>
                </el-menu>
            </div>
            <div class="main">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return{
                isOpen:true
            }
        },
        methods:{
            back () {
                sessionStorage.removeItem('token')
                this.$router.push({
                    name:'login'
                })
                this.$message('退出成功')
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style lang="less" scoped type="text/less">
    .wrapper{
        height: 100%;
        position: relative;
        .header{
            height: 60px;
            position: absolute;
            width: 100%;
            top: 0;
            left: 0;
            background-color: #434343;
            color: white;
           display: flex;
            justify-content: space-between;
            align-items: center;
            img{
                height: 40px;
                width: 40px;
                margin-left: 20px;
            }
            div:nth-child(2){
                font-weight: 600;
                font-size: 20px;
            }
            div:nth-child(3){
                margin-right: 20px;
                cursor: pointer;
                width: 60px;
                height: 40px;
                line-height: 40px;
                color: white;
                text-align: center;
                background-color: gray;
                border-radius: 5px;
            }
            div:nth-child(3):hover{
                background-color: pink;
            }
        }
        .container{
            display: flex;
            justify-content: space-between;
            height: 100%;
            padding-top: 60px;
            box-sizing: border-box;
            .aside{
                width: 300px;
                background-color: #333744;
            }
            .main{
                width: 100%;
                height: 100%;
                /*background-color: #afff5a;*/
                padding: 20px;
                background-color: #eaedf1;
                box-sizing: border-box;
            }
        }
    }


</style>