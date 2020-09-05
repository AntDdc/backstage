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
                :router="true"
                class="el-menu-vertical-demo"
                :unique-opened=true
                background-color="#333744"
                text-color="#ffffff"
                @open="handleOpen"
                @close="handleClose">
                    <el-submenu :index="item.order+''" v-for="(item,i) in menuList" :key="item.key">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>{{item.authName}}</span>
                        </template>
                            <el-menu-item :index='"/"+item1.path' v-for="(item1,i) in item.children" :key="item1.id">
                                <i class="el-icon-location"></i>
                                <span>{{item1.authName}}</span>
                            </el-menu-item>
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
    import {getMenu} from  '@/api'
    export default {
        data () {
            return{
                isOpen:true,
                menuList:[]
            }
        },
        created () {
            this._getMenu()

        },
        methods:{
            async _getMenu() {
              let res = await getMenu()
              this.menuList = res.data.data
            },
            back () {
                sessionStorage.removeItem('token')
                this.$router.push({
                    name:'login'
                })
                this.$message('退出成功')
            },
            handleOpen(key, keyPath) {
            },
            handleClose(key, keyPath) {
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