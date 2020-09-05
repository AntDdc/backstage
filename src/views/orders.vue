<template>
    <div class="orders_wrapper">
        <bread :breadValue1="breadValue1" :breadValue2="breadValue2" class="bread"></bread>
        <div class="table_box">
            <el-input placeholder="请输入内容" v-model="input2">
                <template slot="append">.com</template>
            </el-input>
            <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                <el-table-column
                        type="index"
                        width="50">
                </el-table-column>
                <el-table-column
                        prop="order_number"
                        label="订单编号"
                        width="220">
                </el-table-column>
                <el-table-column
                        prop="order_price"
                        label="订单价格">
                </el-table-column>
                <el-table-column
                        label="是否付款">
                    <template slot-scope="scope">
                        <el-tag type="success" v-if="scope.order_pay">是</el-tag>
                        <el-tag type="danger" v-else>否</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="is_send"
                        label="是否发货">
                </el-table-column>
                <el-table-column
                        label="下单时间">
                    <template slot-scope = 'scope'>
                        {{scope.row.create_time | formdate}}
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="edit">编辑</el-button>
                        <el-button type="success" @click="lookprogress(scope)">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog title="查看物流进度" :visible.sync="dialogFormVisible">
            <el-form >
                <el-form-item label="活动名称" label-width="100px">
                    <el-cascader
                            v-model="value"
                            :options="citydata"
                            :props="prop"
                            @change="handleChange">
                    </el-cascader>
                </el-form-item>
                <el-form-item label="活动区域" label-width="100px">
                    <el-input v-model="addressstring" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="收货地址" :visible.sync="ismodalshow">
            <el-timeline :reverse="reverse">
                <el-timeline-item
                        v-for="(activity, index) in address"
                        :key="index"
                        :timestamp="activity.time">
                    {{activity.context}}
                </el-timeline-item>
            </el-timeline>
        </el-dialog>
    </div>
</template>

<script>
    import {_getOrderList,_lookprogress} from '@/api'
    import citydata from '@/assets/citydata'
    import bread from '@/components/bread'
    export default {
        data() {
            return{
                addressstring:'',
                reverse:true,
                ismodalshow:false,
                address:[],
                citydata,
                prop:{
                    expandTrigger: 'hover' ,
                    label:'label',
                    value:'value',
                    children:'children'
                },
                value:'',
                option:[],
                dialogFormVisible:false,
                tableData: [],
                input2:'',
                obj:{
                    pagenum:1,
                    pagesize:10
                },
                breadValue1:'订单管理',
                breadValue2:'订单列表'
            }
        },
        beforeMount () {
            this.getOrderList()
        },
        methods:{
            async lookprogress(scope){
                let res = await _lookprogress(1106975712662)
                console.log(res,3333);
                this.ismodalshow = true
                this.address = res.data.data
            },
            handleChange(value) {
                console.log(value);
            },
            edit (){
                this.dialogFormVisible = true
           },
            async getOrderList () {
                let res = await _getOrderList(this.obj)
                if(res.data.meta.status !== 200) return this.$message.error('获取数据失败')
                console.log(res,111);
                this.tableData = res.data.data.goods
                console.log(citydata,2222);
            }
        },
        components:{
            bread
        }

    }
</script>

<style lang="less" type="text/less" scoped>
    .orders_wrapper{
        width: 100%;
        height: 100%;
        position: relative;
        box-sizing: border-box;
        padding-top: 25px;
        .el-breadcrumb{
            position: absolute;
            top: 0;
            left: 0;
        }
        .el-input-group{
            width: 600px;
        }
        .table_box{
            width: 100%;
            height: 100%;
            background-color: #fff;
            overflow: auto;
            padding: 15px;
            border-radius: 5px;
            box-sizing: border-box;
            .el-input{
                margin-bottom: 15px;
            }
        }
    }
</style>