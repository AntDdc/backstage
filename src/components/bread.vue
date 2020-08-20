<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item >首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{breadValue1}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{breadValue2}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
    export default {
        data () {
            return{

            }
        },
        props:['breadValue1','breadValue2']
    }
</script>