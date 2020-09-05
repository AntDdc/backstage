<template>
    <div class="params_wrapper">
        <bread :breadValue1="breadValue1" :breadValue2="breadValue2"></bread>
        <div class="table_box">
            <el-alert  type="warning">
                <i class="el-icon-warning"></i>
                <span class="warntext">注意：只允许为第三级分类设置相关参数！</span>
            </el-alert>
            <div class="cascader">
                <span>选择商品分类：</span>
                <el-cascader
                        v-model="value"
                        :options="options"
                        :props="props"
                        @change="handleChange">
                </el-cascader>
            </div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="动态参数" name="first">
                    <el-table
                            :data="goodsParamsList"
                            style="width: 100%"
                            >
                        <el-table-column type="expand">
                            <template slot-scope="scope">
                                <el-form label-position="left" inline class="demo-table-expand">

                                    <el-form-item label="" >
                                        <!--<span>{{ item }}</span>-->
                                        <el-tag
                                                :key="i"
                                                v-for="(item,i) in scope.row.attr_vals"
                                                closable
                                                :disable-transitions="false"
                                                @close="handleClose(scope.row,i)"
                                                >
                                            {{item}}
                                        </el-tag>
                                        <el-input
                                                class="input-new-tag"
                                                v-if="inputVisible"
                                                v-model="inputValue"
                                                ref="saveTagInput"
                                                size="small"
                                                @keyup.enter.native="handleInputConfirm(scope.row)"
                                                @blur="handleInputConfirm(scope.row)"
                                        >
                                        </el-input>
                                        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                                    </el-form-item>
                                </el-form>
                            </template>
                        </el-table-column>
                        <el-table-column type="index">
                        </el-table-column>
                        <el-table-column
                                label="参数名称"
                                prop="attr_name">
                        </el-table-column>
                        <el-table-column
                                >
                            <template slot-scope="scope">
                                <el-button type="primary">编辑</el-button>
                                <el-button type="danger">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="静态属性" name="second">
                    <el-table
                            :data="staticGoodsList"
                            style="width: 100%">
                        <el-table-column
                                type="index"
                               >
                        </el-table-column>
                        <el-table-column
                                label="属性名称"
                                prop="attr_name">
                        </el-table-column>
                        <el-table-column
                                label="属性值"
                                prop="attr_vals">
                        </el-table-column>
                        <el-table-column
                               >
                            <template slot-scope="scope">
                                <el-button type="pramary">编辑</el-button>
                                <el-button type="danger">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
    import {_getCategories,_getParamsList,_editparams} from '@/api'
    import bread from '@/components/bread'
    export default {
        data () {
            return{
                inputValue: '',
                dynamicTags: ['标签一', '标签二', '标签三'],
                inputVisible: false,
                goodsParamsList:[],
                staticGoodsList:[],
                activeName: 'first',
                breadValue1:'商品管理',
                breadValue2:'参数列表',
                value: [],
                options: [],
                staticprops:{
                    expandTrigger:'hover',
                    label:'attr_name',
                    children:'children',
                    value: 'cat_id'
                },
                props:{
                    expandTrigger:'hover',
                    label:'cat_name',
                    children:'children',
                    value: 'cat_id'
                }
            }
        },
        beforeMount () {
            this.getCategories()
        },
        methods:{
            async handleInputConfirm(tag) {
                // let inputValue = this.inputValue;

                tag.attr_vals.push(this.inputValue)
                if (this.inputValue) {
                    let res = await _editparams(tag.cat_id,tag.attr_id,{attr_name:tag.attr_name,attr_sel:'many',attr_vals:tag.attr_vals.join(',')})
                }

                this.inputVisible = false;
                this.inputValue = '';
            },
            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },
            async handleClose(tag,i) {
                tag.attr_vals.splice(i, 1);
                let res = await _editparams(tag.cat_id,tag.attr_id,{attr_name:tag.attr_name,attr_sel:'many',attr_vals:tag.attr_vals.join(',')})
            },
            async handleClick(tab, event) {
                if (this.value.length !== 3) {
                    this.$message.error('请先选择商品分类')
                    return false
                }
                // this.active = Number(tab.index) + 1
                if (tab.name === 'first') {
                    let res = await _getParamsList(this.value[2], {sel: 'many'})
                    this.goodsParamsList = res.data.data
                    this.goodsParamsList.forEach(item => {
                        item.attr_vals === '' ? item.attr_vals = [] : item.attr_vals = item.attr_vals.trim().split(',')
                        // this.checkList.push(...item.attr_vals)
                    })
                }else {
                    if (tab.name === 'second') {
                        if (this.value.length < 1) return this.$message.error('请选择商品分类')
                    }
                    let res1 = await _getParamsList(this.value[2], {sel: 'only'})
                    this.staticGoodsList = res1.data.data

                }
            },
            async getCategories () {
                let res = await _getCategories([1,2,3])
                this.options = res.data.data
            },
            async handleChange(value) {
                if (this.value.length !== 3) {
                    this.$message.error('请先选择商品分类')
                    return false
                }
                let res = await _getParamsList(this.value[2], {sel: 'many'})
                this.goodsParamsList = res.data.data
                this.goodsParamsList.forEach(item => {
                    item.attr_vals === '' ? item.attr_vals = [] : item.attr_vals = item.attr_vals.trim().split(',')
                    // this.checkList.push(...item.attr_vals)
                })
                let res1 = await _getParamsList(this.value[2], {sel: 'only'})
                this.staticGoodsList = res1.data.data
            }
        },
        components:{
            bread
        }
    }
</script>

<style type="text/less" scoped lang="less">
.params_wrapper{
    width: 100%;
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
    .el-breadcrumb{
        margin-bottom: 15px;
    }
    .table_box{
        width: 100%;
        height: 80%;
        background-color: #fff;
        border-radius: 5px;
        padding: 15px;
        overflow: auto;
        box-sizing: border-box;
        .el-icon-warning{
            font-size: 18px;
        }
        .warntext{
            font-size: 16px;
        }
        .cascader{
            margin-top: 15px;
        }
    }
}
.el-tag + .el-tag {
    margin-left: 10px;
}
.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}
.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}
.demo-table-expand {
    font-size: 0;
}
.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}
.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
</style>
