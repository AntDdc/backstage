<template>
    <div class="role_wrapper">
        <bread :breadValue1="breadValue1" :breadValue2="breadValue2" style="margin-bottom: 20px"></bread>
        <div class="table_box">
            <el-button type="primary">添加角色</el-button>
            <el-table
                    :data="tableData"
                    border
                    height="500"
                    style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <el-row v-for="(item,i) in scope.row.children" :key="i">
                            <el-col :span="4">
                                <el-tag closable @close="delPower(scope.row.id,item.id)">{{item.authName}}</el-tag>
                                 <i class="el-icon-arrow-right"></i>
                            </el-col>
                            <el-col :span="20">
                                <el-row v-for="(item1,i) in item.children" :key="i">
                                    <el-col :span="4">
                                        <el-tag closable type="success" @close="delPower(scope.row.id,item1.id)">{{item1.authName}}</el-tag>
                                         <i class="el-icon-arrow-right"></i>
                                    </el-col>
                                    <el-col :span="20">
                                        <el-tag type="warning" @close="delPower(scope.row.id,item2.id)" closable v-for="(item2,i) in item1.children" :key="i">
                                            {{item2.authName}}
                                        </el-tag>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                        <span v-if="scope.row.children.length ===0">该角色没有任何权限</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="角色名称"
                        prop="roleName">
                </el-table-column>
                <el-table-column
                        label="角色描述"
                        prop="roleDesc">
                </el-table-column>
                <el-table-column
                        label="操作"
                        >
                    <template slot-scope="scope">
                        <el-button type="primary" >编辑</el-button>
                        <el-button type="danger">删除</el-button>
                        <el-button type="warning" @click="distributepower(scope.row)">分配权限</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
            <el-tree
                    :data="data"
                    show-checkbox
                    node-key="id"
                    default-expand-all
                    :default-checked-keys='checkedArr'
                    ref="treeDom"
                    :props="defaultProps">
            </el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="authorize">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import bread from "@/components/bread.vue"
    import {revisePower,deletePower,getPowerList,getAuthorize} from '@/api'
    export default {
        data () {
            return{
                breadValue1: '权限管理',
                breadValue2: '角色列表',
                tableData: [],
                dialogFormVisible: false,
                formLabelWidth: '120px',
                data:[],
                defaultProps: {
                    children: 'children',
                        label: 'authName'
                },
                checkedArr:[],
                expandedArr:[],
                currentRoleId:-1
            }
        },
        methods:{
            async authorize(){
                let res1 = this.$refs.treeDom.getCheckedKeys()
                let res2 = this.$refs.treeDom.getHalfCheckedKeys()
                let ridArr = [...res1,...res2]
                let res = await getAuthorize(this.currentRoleId,{rids:ridArr.join(',')})
                if(res.data.meta.status ===200) {this.$message.success(res.data.meta.msg)}
                this.dialogFormVisible = false
                this.powerList()
            },
            async distributepower(list) {
                let res = await getPowerList('tree')
                this.data = res.data.data
                this.currentRoleId = list.id
                this.checkedArr = []
                list.children.forEach(item => {
                    // this.checkedArr.push(item.id)
                    item.children.forEach(item1 => {
                        // this.checkedArr.push(item1.id)
                        item1.children.forEach(item2 => {
                            this.checkedArr.push(item2.id)
                        })
                    })
                })
                // console.log(this.checkedArr,3333);
                this.dialogFormVisible = true
            },
            async delPower(par1,par2) {
                let res =await  deletePower(par1,par2)
                if(res.data.meta.status !==200) return this.$message.warn(res.data.meta.msg)
                this.$message.success('权限取消成功')
                this.powerList()
            },
            async powerList () {
                let res = await revisePower()
                if (res.data.meta.status !==200) return this.$message.warn('获取列表失败')
                this.tableData = res.data.data
            }
        },
        beforeMount() {
            this.powerList()
        },
        components:{
            bread
        }
    }
</script>

<style lang="less" scoped type="text/less">

    .role_wrapper{
        .table_box{
            background-color: #fff;
            padding: 15px;
            box-sizing: border-box;
            border-radius: 5px;
        }
    }
</style>