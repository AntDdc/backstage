<template>
    <div class="rights_wrapper">
        <bread :breadValue1="breadValue1" :breadValue2="breadValue2" class="bread"></bread>
        <div class="table_box">
            <el-table
                    :data="tableData"
                    border
                    height="500"
                    style="width: 100%">
                <el-table-column
                        type="index"
                        label="#"
                        width="50">
                </el-table-column>
                <el-table-column
                        prop="authName"
                        label="权限名称"
                        >
                </el-table-column>
                <el-table-column
                        prop="path"
                        label="路径"
                        >
                </el-table-column>
                <el-table-column
                        prop="level"
                        label="权限等级">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import bread from '@/components/bread'
    import {getPowerList} from '@/api'
    export default {
        data () {
            return{
                breadValue1:'权限管理',
                breadValue2:'权限列表',
                tableData: []
            }
        },
        beforeMount () {
            this.powerList()
        },
        methods:{

            async powerList() {
                let  res = await getPowerList('list')
                if(res.data.meta.status !==200) return this.$message.warn('获取列表失败')
                this.tableData = res.data.data
            }
        },
        components:{
            bread
        }

    }
</script>

<style lang="less" type="text/less" scoped>
    .rights_wrapper{
        .bread{
            margin-bottom: 20px;
        }
        .table_box{
            padding: 15px;
            box-sizing: border-box;
            background-color: #fff;
            border-radius: 5px;
        }
    }
</style>