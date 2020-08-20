<template>
    <div class="user_container">
        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 20px">
            <el-breadcrumb-item >首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="table_box">
            <div style="margin: 15px 0;">
                <el-input placeholder="请输入内容" v-model="obj.query"  >
                    <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
                </el-input>
                <el-button type="primary" style="margin-left: 20px"  @click="dialogFormVisible = true">添加用户</el-button>

            </div>
            <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                <el-table-column
                        type="index"
                        label="#"
                        width="50">
                </el-table-column>
                <el-table-column
                        prop="username"
                        label="姓名"
                        width="140">
                </el-table-column>
                <el-table-column
                        prop="email"
                        label="邮箱"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="mobile"
                        label="电话">
                </el-table-column>
                <el-table-column
                        prop="role_name"
                        label="角色"
                        width="180">
                </el-table-column>
                <el-table-column
                        label="创建时间"
                        width="180">
                <template slot-scope="tableData">
                    {{tableData.row.create_time | formdate}}
                </template>
                </el-table-column>
                <el-table-column
                    label="状态"
                    width="140">
                    <template slot-scope="scope">
                        <el-switch
                            v-model="scope.row.mg_state"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            @change="toggle(scope.row)">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="type"
                        label="操作"
                        >
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" circle   size="mini" @click="editform(scope.row)"></el-button>
                        <el-button type="danger" icon="el-icon-delete" circle  size="mini" @click="deleteuser(scope.row.id)"></el-button>
                        <el-button type="warning" icon="el-icon-setting" circle  size="mini" @click="reviseRole(scope.row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-sizes="[2, 4, 6]"
                        :current-page="obj.pagenum"
                        :page-size="obj.pagesize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </div>
        <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
                <el-form :label-position="labelPosition" :rules="rules" ref="ruleForm"  label-width="80px" :model="formLabelAlign">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="formLabelAlign.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="formLabelAlign.password" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="formLabelAlign.email"></el-input>
                    </el-form-item>
                    <el-form-item label="手机" prop="mobile">
                        <el-input v-model="formLabelAlign.mobile"></el-input>
                    </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addusers('ruleForm')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改用户信息" :visible.sync="dialogModify">
            <el-form :label-position="labelPosition" :rules="rules" ref="ruleModify"  label-width="80px" :model="formLabelAlign">
                <el-form-item label="用户名" >
                    <el-input v-model="formLabelAlign.username" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="formLabelAlign.email"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="mobile">
                    <el-input v-model="formLabelAlign.mobile"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogModify = false">取 消</el-button>
                <el-button type="primary" @click="editData('ruleModify')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="分配角色" :visible.sync="roleModel">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="当前用户">
                    <div>{{roleName}}</div>
                </el-form-item>
                {{rid}}
                <el-form-item label="活动区域">
                    <el-select v-model="rid" placeholder="分配角色">
                        <el-option v-for='(item,i) in powerList' :label="item.roleName" :key=i :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="roleModel = false">取 消</el-button>
                <el-button type="primary" @click="distributepower">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {getUsers,addUsers,deleteUsers,editUserStatus,reviseStatus,revisePower,getRoleId,distributeRole} from '@/api'
    import qs from 'qs'
    export default {
        data() {
            return{
                dialogModify:false,
                roleModel:false,
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                    email: [
                        { required: true, message: '请输入邮箱', trigger: 'blur' },
                    ],
                    mobile: [
                        { required: true, message: '请输入电话', trigger: 'blur' },
                    ],
                },
                formLabelAlign: {
                    username: '',
                    password: '',
                    email : '',
                    mobile  : ''
                },
                labelPosition: 'right',
                dialogFormVisible: false,
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                formLabelWidth: '120px',
                value:true,
                currentPage4:4,
                // searchData:'',
                // pagenum:1,
                // pagesize:2,
                tableData:[],
                total:0,
                roleName:'',
                powerList:'',
                rid:-1,
                currentId:-1,
                obj :{
                    query:'',
                    pagenum:1,
                    pagesize:4
                }
            }
        },
        beforeMount () {
            this.initUsers(this.obj)
        },
        methods:{
            async distributepower () {
                let res = await distributeRole(this.currentId,{rid:this.rid})
                // console.log(res,8888);
                this.roleModel = false
            },
            async reviseRole (v) {
                this.roleName = v.role_name
                this.currentId = v.id
                let res1 = await getRoleId(v.id)
                this.rid = res1.data.data.rid
                console.log(res1.data);
                let res = await revisePower()
                this.powerList = res.data.data
                console.log(this.powerList,1111);
                this.roleModel = true
            },
            async editData (ruleModify) {
                this.$refs[ruleModify].validate(async (valid) => {
                    if (valid) {
                        let  id=this.formLabelAlign.id
                        let obj = {
                            emale:this.formLabelAlign.email,
                            mobile:this.formLabelAlign.mobile
                        }
                        let res = await editUserStatus(id,obj)
                        if(res.data.meta.status === 200){
                            this.$message.success(res.data.meta.msg)
                        }
                    } else {
                        alert('请输入正确的信息')
                        this.formLabelAlign = {}
                        this.dialogModify = false
                        return false;
                    }
                });

                this.formLabelAlign = {}
                this.dialogModify = false
            },
            editform (formdata) {
                this.formLabelAlign = formdata
                this.dialogModify = true
            },
            deleteuser(id) {
                this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    let res = await deleteUsers(id)
                    if(res.data.meta.status === 200){
                        this.$message({
                            type: 'success',
                            message: res.data.meta.msg
                        });
                    }
                    this.initUsers(this.obj)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
             addusers(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        let res = await addUsers(this.formLabelAlign)
                        if (res.data.meta.status === 201) {
                            this.$message({
                                message:'添加成功',
                                type:'success'
                            })
                            this.initUsers(this.obj)
                            this.formLabelAlign= {}
                            this.dialogFormVisible = false
                        }else {
                            this.dialogFormVisible = false
                            this.$message.error('添加用户失败')
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            async searchUser () {
                var res = await this.initUsers(this.obj)
            },
            async toggle (data) {
                let res = await reviseStatus(data.id,data.mg_state)
                if (res.data.meta.status === 200) return this.$message.success(res.data.meta.msg)

            },
            async initUsers (obj) {
                let res = await getUsers(obj)
                if (res.data.meta.status !== 200) return this.$message.error('获取用户列表失败')
                this.tableData = res.data.data.users
                this.total = res.data.data.total
                console.log(res,456798);
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.obj.pagenum=1
                this.obj.pagesize = val
                this.initUsers(this.obj)
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.obj.pagenum = val;
                this.initUsers(this.obj)
            }
        }
    }
</script>

<style  lang="less" scoped type="text/less">
    .user_container{
        width: 100%;
        height: 100%;
        background-color: #eaedf1;
        box-sizing: border-box;
        /*padding: 20px;*/
        .table_box{
            background-color: #fff;
            box-sizing: border-box;
            padding:15px;
            /*height: 60%;*/
            border-radius: 5px;
            .el-input{
                width: 350px;
                margin-top: -7px;
            }
            .el-table{
                margin-bottom: 15px;
            }
        }
    }
</style>