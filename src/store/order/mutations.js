import * as types from './mutation-types.js';

export default {
    [types.ADDCARTGOODS](state,res){//添加购物车产品
        state.goods.push(res);
    },
    [types.DELETEGOOD](state,index){//删除购物车产品
        state.goods.splice(index, 1);
    },
    [types.UPDATEGOODDATA](state,res){//更新购物车产品相关数据，数量，价格，产品名称，空间，定制需求，配送方式等
        state.goods[res.index] = res.goodData;
    },
    [types.UPDATEORDERMONEY](state,res){//更新购物车应付金额，实付金额，运费
        const tempMoney = res.totalMoney;
        state.freight = tempMoney > 200 ? 0 : 12;
        state.totalMoney = Number(tempMoney) + Number(state.freight);
        state.payMoney = Number(state.totalMoney)-Number(state.discount);
    },
    [types.UPDATEDISCOUNT](state,val){//更新门店优惠金额，实付金额
        state.discount = val;
        state.payMoney = Number(state.totalMoney)-Number(val);
    },
    [types.SETORDERMETHOD](state,method){//添加购物车产品设置配送方式
        state.method = method;
    },
    [types.RESETGOODMETHOD](state){//重置产品的配送方式
        const method = state.method;
        state.goods.forEach(item => {
             if(method === 'wuliu' && item.canal === 'kuaidi'){
                 item.canal = 'wuliu';
             }
             if(method === 'kuaidi' && item.canal === 'wuliu'){
                item.canal = 'kuaidi';
             }
        });
    },
    [types.UPDATECUSTOMINFO](state,data){//更新crm客户信息 姓名，电话，地址，地区，用户可用余额，用户可抵扣金额，用户欠款金额，用户id
        state.cumtomFormData.addr = data.addr;
        if(!data.area){
            state.cumtomFormData.area = [];
        }else{
            state.cumtomFormData.area = data.area.split(" ");
        }
        state.cumtomFormData.information_id = data.id;
        state.cumtomFormData.acceptOrdPhone = data.mobile;
        state.cumtomFormData.acceptOrdMan = data.name;
        state.cumtomFormData.sum_money = data.sum_money;
        state.cumtomFormData.last_discount = data.last_discount;
        state.cumtomFormData.uFinPay = data.uFinPay;
        // state.status = data.status;
        // state.status_name = data.status_name;
        // state.tel = data.tel;
    },
    [types.UPDATECHECKOUTDETAILINFO](state,data){//更新结算页第二页数据
        state.checkoutSwitch = 1;
        state.UPDATECHECKOUTDETAILINFO = data;
    },
    [types.RESETCHECKOUTDATA](state){//重置结算页数据
        state.goods = [];//结算页商品清单
        state.method = '';//配送方式
        state.totalMoney = 0;//合计金额
        state.discount = 0;//门店优惠金额
        state.payMoney = 0;//实付金额
        state.freight = 0;//运费
        state.orderid = '';//订单号
        state.cumtomFormData ={
            acceptOrdMan:'',//收货人
            acceptOrdPhone:'',//收货人手机号
            area:[],//收货地区
            addr:'',//收货地址
            sendProDate:'',//仓库完成时间
            contractCode:'',//合同编码
            custReRemark:'',//客户特殊要求
            orderRemarks:'',//订单备注
            liftSel:false,//是否有电梯
            fileUrls:false,//表头附件
            information_id:'',//crm客户id
            sum_money:0,//用户可用余额
            last_discount:0,//用户可用折扣
            uFinPay:0,//用户欠款金额
        };
        state.checkoutSwitch = 0;//结算页开关 0为显示第一页 1位显示第二页
        state.checkoutDetailInfo = null;//结算页第二页明细
    },
}