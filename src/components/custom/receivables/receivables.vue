<template>
    <div class="receivables_container">
        <el-table
            :data="receivablesRecords"
            stripe
            highlight-current-row
            header-row-class-name='header_row_style'
            @current-change="handleCurrentChange"
            @cell-click='cellClickHandle'>
            <el-table-column
                type="index"
                :index="1"
                label='序号'
                width='100px'
                >
            </el-table-column>
            <el-table-column
                prop="receivables_id"
                label="编号"
                v-if='false'
                >
            </el-table-column>
            <el-table-column
                prop="name"
                label="收款人"
                min-width='120px'
                >
            </el-table-column>
            <el-table-column
                prop="times"
                label="收款时间"
                min-width='160'>
            </el-table-column>
            <el-table-column
                prop="voucher"
                label="收款凭证号"
                min-width='160'>
            </el-table-column>
            <el-table-column
                prop="money"
                label="收款金额"
                min-width='140px'>
            </el-table-column>
            <el-table-column
                prop="discount"
                label="抵扣金额"
                min-width='120px'
                >
            </el-table-column>
            <el-table-column
                prop="remarks"
                label="收款备注"
                min-width='200px'
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                label="发票图片"
                min-width='118px'>
                <template slot-scope="scope" v-if='scope.row.image_id && scope.row.image_id.length>0'>
                    <img :src="getImageUrl(scope.row.image_id[0])" width="100%" height="87" />
                    <i class="el-icon-zoom-in image_item_icon"></i>
                </template>
            </el-table-column>
            <el-table-column
                prop="is_retainage_name"
                label="是否尾款"
                min-width='100px'>
            </el-table-column>
        </el-table>
        <div class="btns">
            <el-button type="primary" icon='el-icon-plus' @click='addreceivablesRecord'>新建收款记录</el-button>
            <el-button type="primary"  class='add_custom' @click='editreceivablesRecord'>编辑</el-button>
        </div>
        <el-dialog title="收款记录" :visible.sync="receivablesDialogVisible" class='customRelationInfoDialog' @close='resetreceivablesEdit' :close-on-click-modal='false'>
            <receivablesEdit :informationItem='infomation' :editInfos='editActiveRow' ref='receivablesEdit'  v-on:closeCustomReceivablesInfoDialog='updatereceivablesRecord'></receivablesEdit>
        </el-dialog>
        <el-dialog title="发票图片" :visible.sync="receivablesImageDialogVisible">
            <el-carousel height="400px" :autoplay='false' ref="carouselItems">
                <el-carousel-item v-for="(item,index) in images" :key="index">
                    <img :src="item.url" class="image_carousel_item" @click="lookFileChangeHandle(item)">
                </el-carousel-item>
            </el-carousel>
        </el-dialog>
    </div>
</template>
<script>
    import receivablesEdit from '@/components/custom/receivables/receivablesEdit';
    import {getUploadIcon} from '@/utils/index';

    export default{
        name:'receivables',
        props:['receivablesRecords','infomation'],
        data(){
            return{
                receivablesDialogVisible:false,
                receivablesImageDialogVisible:false,
                images:[],
                editActiveRow:{},//当前需要编辑的行
                currentrow:null
            }
        },
        methods:{
            getImageUrl(image_id){
                if(getUploadIcon(image_id)){
                    return getUploadIcon(image_id);
                }else{
                    return image_id;
                }
            },
            handleCurrentChange(currentrow){//当表格的当前行发生变化的时候会触发该事件
                this.currentrow = currentrow;
            },
            addreceivablesRecord(){//新增收款记录
                try {
                    this.editActiveRow = {};
                    if(this.receivablesRecords && this.receivablesRecords.length>0){
                        this.editActiveRow.sum_price = this.receivablesRecords[0].sum_price;
                    }else{
                        this.editActiveRow.sum_price = 0;
                    }
                    this.receivablesDialogVisible = true;
                } catch(e) {
                    this.$message({
                        showClose:true,
                        message: e.message,
                        type: 'error'
                    });
                }
            },
            editreceivablesRecord(){//编辑收款记录
                if(!this.currentrow){
                    this.$message({
                        showClose:true,
                        message:'请先选中需要编辑的收款记录！',
                        type:'error'
                    });
                    return false;
                }
                this.editActiveRow = Object.assign({},this.currentrow);
                if(this.editActiveRow.image_id && this.editActiveRow.image_id.length>0){
                    this.editActiveRow.image_id = this.currentrow.image_id.slice();
                    let imageLists = [];
                    this.editActiveRow.image_id.forEach( function(item, index) {
                        let retUrl = getUploadIcon(item);
                        if(retUrl){
                            imageLists.push({url:retUrl,image_id:item});
                        }else{
                            imageLists.push({url:item,image_id:item});
                        }
                    });
                    this.editActiveRow.imageLists = imageLists.slice();
                }else{
                    this.editActiveRow.image_id = [];
                }
                this.receivablesDialogVisible = true;
            },
            updatereceivablesRecord(callbackData){
                this.receivablesDialogVisible = false;
                if(callbackData.data){//信息保存后回调
                    this.$emit('updateCustomRelationRecords',{data:callbackData.data,type:callbackData.type,num:3});
                }
            },
            resetreceivablesEdit(){//重置表单数据
                this.editActiveRow = {};
                // this.images =[];
                this.$refs['receivablesEdit'].$refs['receivablesForm'].resetFields();
            },
            cellClickHandle(row, column, cell, event){
                try{
                    if(column.label === '发票图片'){
                        if(row.image_id){
                            this.receivablesImageDialogVisible = true;
                            let imageLists = [];
                            row.image_id.forEach( function(item, index) {
                                let retUrl = getUploadIcon(item);
                                if(retUrl){
                                    imageLists.push({url:retUrl,image_id:item});
                                }else{
                                    imageLists.push({url:item,image_id:item});
                                }
                            });
                            this.images = imageLists.slice();
                            this.$nextTick(()=>{
                                this.$refs['carouselItems'].setActiveItem(0);
                            });
                        }
                    }
                }catch (e) {
                    this.$message({
                        showClose:true,
                        message: e.message,
                        type: 'error'
                    });
                }
            },
            lookFileChangeHandle(item){//查看文件
                try{
                    window.open(item.image_id);
                }catch (e) {
                    this.$message({
                        showClose:true,
                        message: e.message,
                        type: 'error'
                    });
                }
            }
        },
        components:{
            receivablesEdit
        }
    }
</script>
<style scoped>
    .receivables_container{
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    .btns{
        text-align: right;
        padding: 16px 40px 16px 0;
    }
    .image_item_icon{
        position: absolute;
        right: 15px;
        bottom: 24px;
        color: #fff;
    }
    .image_carousel_item{
        width: 100%;
    }
</style>