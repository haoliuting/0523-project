<template>
    <div>
        <el-dialog :title="info.title" :visible.sync="info.isShow"
            @closed="close"
        >
            <el-form :model="form">
                <el-form-item label="菜单名称" :label-width="width">
                    <el-input v-model="form.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="上级菜单" :label-width="width">
                    <el-select v-model="form.pid" placeholder="请选择活动区域" @change="changePid">
                        <el-option label="顶级菜单" :value="0"></el-option>
                        <!-- 少一个动态的数据 -->
                        <el-option v-for="item in list" :key="item.id" :label="item.title" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="菜单类型" :label-width="width">
                    <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
                    <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
                </el-form-item>
                <el-form-item label="菜单图标" :label-width="width" v-if="form.type==1">
                    <el-select v-model="form.icon" placeholder="请选择目录图标">
                        <el-option value="el-icon-setting">
                            <i class="el-icon-setting"></i>
                        </el-option>
                        <el-option value="el-icon-goods">
                            <i class="el-icon-goods"></i>
                        </el-option>
                         <el-option value="el-icon-user">
                            <i class="el-icon-user"></i>
                        </el-option>
                         <el-option value="el-icon-camera">
                            <i class="el-icon-camera"></i>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="菜单地址" :label-width="width" v-else>
                    <el-select v-model="form.url" >
                        <el-option value="" label="--请选择--" disabled></el-option>
                        <el-option v-for="item in indexRoutes" :key="item.path" :label="item.name" :value="'/'+item.path"></el-option>
                       
                    </el-select>
                </el-form-item>
                 <el-form-item label="状态" :label-width="width">
                    <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button>
                <el-button type="primary" @click="update" v-else>修 改</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import {indexRoutes} from "../../../router"
import {reqAddMenu,reqMenuDetail,reqMenuUpdate} from "../../../util/request"
import {successAlert,warningAlert} from "../../../util/alert"
import {mapGetters,mapActions} from "vuex"
export default {
    props:["info"],
    computed: {
        ...mapGetters({
            list:"menu/list"
        })
    },
    data() {
        return {
            //label占的宽度
            width:"100px",
            indexRoutes:indexRoutes,
            //表单数据
            form:{
                pid:0,
                title:"",
                icon:"",
                type:1,
                url:"",
                status:1
            }
        }
    },
    methods: {
        ...mapActions({
            reqList:"menu/reqListAction"
        }),
        //弹框关闭完成
        close(){
            // 如果是编辑，取消了，就要清空
            if(!this.info.isAdd){
                this.empty()
            }
        },
        //点击了取消
        cancel(){
            this.$emit("hide")
        },
        //修改了pid
        changePid(){
            this.form.type=this.form.pid==0?1:2;
        },
        //重置form数据
        empty(){
            this.form={
                pid:0,
                title:"",
                icon:"",
                type:1,
                url:"",
                status:1
            }
        },
        //添加
        add(){
            reqAddMenu(this.form).then(res=>{
                if(res.data.code==200){
                    //添加成功
                    successAlert(res.data.msg)
                    //弹框消失
                    this.$emit("hide")
                    //数据重置
                    this.empty()
                    //重新获取list
                    this.reqList()
                }else{
                    warningAlert(res.data.msg)
                }
            })
        },
        //查看一条数据
        look(id){

            reqMenuDetail({id:id}).then(res=>{
                this.form=res.data.list
                this.form.id=id;
            })
        },
        //点击了修改
        update(){
            reqMenuUpdate(this.form).then(res=>{
                if(res.data.code==200){
                    successAlert("更新成功")
                    this.$emit("hide")
                    this.empty()
                    this.reqList()
                }else{
                    warningAlert(res.data.msg)
                }
            })
        }
    },
    mounted() {}
}
</script>
<style scoped>

</style>