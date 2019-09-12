import request from '@/utils/request';
//获取列表
export async function queryList(params) {
  let realParams = Object.assign({},params)
  delete realParams.id
  return request('/list/subjectProduct/'+params.id, {
    params: realParams,
  });
}
//获取学科
export async function querySubjectProducts() {
  return request('/api/');
}
//获取年级
export async function queryGrade(params) {
  return request('/api/'+params.id)
}
//删除模版
export async function deleteTemplate(params) {
  return request('/list/'+params.id, {
    method: 'DELETE'
  });
}
//更新模版
export async function putTemplate(params) {
  return request('/list/'+ params.get('id'),{
    method: 'PUT',
    data: params
  });
}
//获取某一模版
export async function queryTempalte(params) {
  return request('/list/'+ params.id)
}
//复制模版
export async function copyTemplate(params) {
  return request('/copy/'+ params.id + '/copy',{
    method: 'POST'
  });
}
//更新具体的状态
export async function putStatus(params) {
  return request('/list/'+ params.id + '/status/' + params.status,{
    method: 'PUT'
  });
}
//创建表单
export async function createTemplate(params) {
  return request('/list/',{
    data: params,
    method: 'POST'
  });
}
//更新某一模版的首页状态
export async function putAnyTemplate(params) {
  return request('/put/'+ params.id + '/tempType/' + params.type+'/status/'+ params.status,{
    method: 'PUT',
  });
}


