<template>
    <div class="goodsWrapper">
        <bread :breadValue1="breadValue1" :breadValue2="breadValue2"></bread>
        <div class="tabbox">
            <div style="margin-top: 10px;">
                <el-input placeholder="请输入内容" v-model="input2"  class="search">
                    <template slot="append">
                        <i class="el-icon-search"></i>
                    </template>
                </el-input>
                <el-button type="primary" style="margin-left: 20px;" @click="toAddPage">添加商品</el-button>
            </div>
            <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                <el-table-column
                        type="index"
                        label="#"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="goods_name"
                        label="商品名称"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="goods_price"
                        label="商品价格"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="goods_weight"
                        label="商品重量">
                </el-table-column>
                <el-table-column
                        prop="goods_number"
                        label="商品数量">
                </el-table-column>
                <el-table-column
                        label="创建时间">
                    <template slot-scope="scope">
                        {{scope.upd_time | formdate}}
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary">添加</el-button>
                        <el-button type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageobj.pagenum"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="pageobj.pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {_getGoodsList} from '@/api'
    import bread from '@/components/bread.vue'
    export default {
        data() {
            return {
                currentPage:1,
                breadValue1:'商品管理',
                breadValue2:'商品列表',
                input2:'',
                tableData: [],
                total:-1,
                pageobj:{
                    pagenum:1,
                    pagesize:10
                }

            }
        },
        beforeMount (){
            this.getGoodsList()
        },
        methods:{
            handleSizeChange(val) {
                this.pageobj.pagesize = val
                this.pageobj.pagenum = 1
                this.getGoodsList()
            },
            handleCurrentChange(val) {
                this.pageobj.pagenum = val
                this.getGoodsList()
            },
            async getGoodsList (){
                let res = await _getGoodsList(this.pageobj)
                this.tableData = res.data.data.goods
                this.total = res.data.data.total
            },
            toAddPage() {
                this.$router.push({
                    name:'addGoods'
                })
            }
        },
        components:{
            bread
        }
    }
</script>

<style lang="less" type="text/less" scoped>
    .goodsWrapper{
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: #fff;
        box-sizing: border-box;padding-bottom: 15px;
        position: relative;
        .el-breadcrumb{
            background-color: #eaedf1;
            padding-bottom: 10px;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;

        }
        .tabbox{
            border-radius: 5px;
            height: 100%;
            padding:30px 20px ;
            box-sizing: border-box;
        }
        .search{
            width: 350px;
            margin-bottom: 15px;
        }
    }
</style>