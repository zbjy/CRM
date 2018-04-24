import axios from '../axios/index';

//登录
export const ajax_login = (login_account,login_password) => axios.post('/crm-ajax_login.html',{
    login_account,
    login_password
});

// 获取客户列表
export const getCustomLists = (key,page,formData) => axios.post('/crm-customer_index-'+key+'-'+page+'.html',formData);

// 获取客户基本信息
export const customer_detail = (information_id) => axios.post('/crm-customer_detail.html',{
    information_id
});

//获取客户的沟通记录
export const communicate = (information_id) => axios.post('/crm-communicate.html',{
    information_id
});

//获取客户的测量记录
export const measures = (information_id) => axios.post('/crm-measure.html',{
    information_id
});

//获取客户的收款记录
export const receivableItems = (information_id) => axios.post('/crm-receivables.html',{
    information_id
});

//获取客户的方案记录
export const programmes = (information_id) => axios.post('/crm-programme.html',{
    information_id
});

//获取客户的具体方案明细
export const programme_detail = (id) => axios.post('/crm-programme_detail.html',{
    id
});

//获取客户的交易记录
export const transactions = (information_id) => axios.post('/crm-transaction.html',{
    information_id
});

//获取客户的投诉记录
export const complaints = (information_id) => axios.post('/crm-complaint.html',{
    information_id
});

//保存客户基本信息
export const customer_save = (formData) => axios.post('/crm-customer_save.html',formData);

//保存沟通记录
export const communicate_save = (formData) => axios.post('/crm-communicate_save.html',formData);

//保存测量记录
export const measure_save = (formData) => axios.post('/crm-measure_save.html',formData);

//保存收款记录
export const receivables_save = (formData) => axios.post('/crm-receivables_save.html',formData);

//保存方案明细
export const programme_save = (formData) => axios.post('/crm-programme_save.html',formData);

//保存交易记录
export const transaction_save = (formData) => axios.post('/crm-transaction_save.html',formData);

//保存投诉记录
export const complaint_save = (formData) => axios.post('/crm-complaint_save.html',formData);

//获取渠道来源记录
export const source_index = () => axios.post('/crm-source_index.html');

//保存渠道来源记录
export const source_save = (formData) => axios.post('/crm-source_save.html',formData);

//获取角色记录
export const member_role = () => axios.post('/crm-member_role.html');

//保存角色记录
export const add_role = (formData) => axios.post('/crm-add_role.html',formData);

//获取用户记录
export const member = () => axios.post('/crm-member.html');

//保存用户记录
export const member_save = (formData) => axios.post('/crm-member_save.html',formData);
