<template>
    <div class="goods_wrapper">
        <bread :breadValue1="breadValue1" :breadValue2="breadValue2" class="bread"></bread>
        <div class="goodsInto">
            <el-alert title="添加商品信息" type="info" center show-icon></el-alert>
            <el-steps :active="active" finish-status="success">
                <el-step title="基本信息"></el-step>
                <el-step title="商品参数"></el-step>
                <el-step title="商品熟悉"></el-step>
                <el-step title="商品图片"></el-step>
                <el-step title="商品内容"></el-step>
            </el-steps>
            <el-form :label-position="labelPosition" label-width="80px" :model="form">
                <el-tabs v-model="activeName" @tab-click="handleClick" :before-leave="beforeTabLeave" :tab-position="tabPosition">
                    <el-tab-pane label="基本信息" name="first">
                        <el-form-item label="商品名称">
                            <el-input v-model="form.goods_name"></el-input>
                        </el-form-item>
                        <el-form-item label="商品价格">
                            <el-input v-model="form.goods_price"></el-input>
                        </el-form-item>
                        <el-form-item label="商品重量">
                            <el-input v-model="form.goods_weight"></el-input>
                        </el-form-item>
                        <el-form-item label="商品数量">
                            <el-input v-model="form.goods_number"></el-input>
                        </el-form-item>
                        {{value}}
                        <el-cascader
                                v-model="value"
                                :options="options"
                                :props="defaultProps"
                                clearable
                                @change="handleChange"></el-cascader>
                    </el-tab-pane>
                    <el-tab-pane label="商品参数" name="second">
                        <el-form-item :label="item.attr_name" v-for="(item,i) in goodsParamsList" :key="i">
                            <el-checkbox-group v-model="checkList">
                                <el-checkbox :label="item1" v-for="(item1,i) in item.attr_vals" :key="i"
                                             border></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="商品熟悉" name="third">
                        <el-form-item :label="item.attr_name" v-for="(item,i) in staticGoodsList" :key="i">
                            <el-input v-model="item.attr_vals"></el-input>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="商品图片" name="fourth">
                        <el-form-item>
                            <el-upload
                                    class="upload-demo"
                                    action="http://127.0.0.1:8888/api/private/v1/upload"
                                    :headers="header"
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemove"
                                    :on-success="handleSuccess"
                                    list-type="picture">
                                <el-button size="small" type="primary">点击上传</el-button>
                            </el-upload>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="商品内容" name="five">
                        <el-form-item >
                            <quill-editor ref="myQuillEditor" v-model="content" :options="editorOption"
                                          >
                            </quill-editor>
                            <el-button type="primary" style="width: 120px;height: 50px;margin-top: 15px" @click="addgoods">添加商品</el-button>
                        </el-form-item>

                    </el-tab-pane>
                </el-tabs>
            </el-form>
        </div>

    </div>
</template>
<script>
    import bread from "@/components/bread.vue"
    import {_getCategories, _getParamsList,_addgoods} from '@/api'

    export default {
        data() {
            return {
                content: '',
                editorOption: {
                    // Some Quill options...
                },
                header:{Authorization:sessionStorage.getItem('token')},
                staticGoodsList: [],
                checkList: [],
                goodsParamsList: [],
                defaultProps: {
                    expandTrigger: 'hover',
                    label: 'cat_name',
                    children: 'children',
                    value: 'cat_id'
                },
                value: [1, 3, 6],
                options: [],
                form: {
                    goods_name: '',
                    goods_price: '',
                    goods_weight: '',
                    goods_number: '',
                    goods_cat: '',
                    goods_introduce: '',
                    pics: [],
                    attrs: []
                },
                labelPosition: 'top',
                activeName: 'first',
                tabPosition: 'left',
                breadValue1: '商品管理',
                breadValue2: '添加商品',
                active: 1
            }
        },
        beforeMount() {
            this.getCategories()
        },
        methods: {
            beforeTabLeave (activeName, odlActiveName) {
                // 未选中商品分类阻止Tab标签跳转
                if (this.value.length !== 3) {
                    this.$message.error('请先选择商品分类')
                    return false
                }
            },
            async addgoods() {
                this.form .goods_cat = this.value.join(',')
                this.form.goods_introduce = this.content
                let arr1 = this.goodsParamsList.map(item => {
                    return  {
                        attr_id:item.attr_id,
                        attr_value:item.attr_vals.join('')
                    }
                })
                let arr2 = this.staticGoodsList.map(item => {
                    return  {
                        attr_id:item.attr_id,
                        attr_value:item.attr_vals
                    }
                })
                this.form.attrs = [...arr1,...arr2]
                let res = await _addgoods(this.form)
                if(res.data.meta.status !== 200){
                    this.$message.error('请输入必要选项')
                    return false
                }
                this.$router.push({
                    name:'goods'
                })
            },
            handleSuccess(response, file, fileList) {
                this.form.pics.push({pic:response.data.tmp_path})
            },
            handleRemove(file, fileList) {
                let i = this.form.pics.findIndex(item => {
                    return item.pics = file.response.data.tmp_path
                })
                this.form.pics.splice(i,1)
            },
            handlePreview(file) {
            },
            async getCategories() {
                let res = await _getCategories([1, 2, 3])
                this.options = res.data.data
            },
            async handleClick(tab, event) {
                if (this.value.length !== 3) {
                    this.$message.error('请先选择商品分类')
                    return false
                }
                this.active = Number(tab.index) + 1
                if (tab.name === 'second') {
                    let res = await _getParamsList(this.value[2], {sel: 'many'})
                    this.goodsParamsList = res.data.data
                    this.goodsParamsList.forEach(item => {
                        item.attr_vals === '' ? item.attr_vals = [] : item.attr_vals = item.attr_vals.trim().split(',')
                        this.checkList.push(...item.attr_vals)
                    })
                }else {
                    if (tab.name === 'third') {
                        if (this.value.length < 1) return this.$message.error('请选择商品分类')
                    }
                    let res1 = await _getParamsList(this.value[2], {sel: 'only'})
                    this.staticGoodsList = res1.data.data
                }
            },
            handleChange(value) {
            }
        },
        components: {
            bread
        }
    }
</script>
<style lang="less" scoped type="text/less">
    .goods_wrapper {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        position: relative;
        padding-top: 30px;
    }

    .bread {
        position: absolute;
        top: 0;
        left: 0;
    }

    .goodsInto {
        width: 100%;
        height: 100%;
        background-color: #fff;
        box-sizing: border-box;
        border-radius: 5px;
        padding: 15px;
        overflow: auto;
    }
    .quill-editor{
        /*height: 230px;*/
        .ql-container{
            height: 200px;
        }
    }
</style>