import request from '@/utils/request';
import qs from 'qs';

// 获取游戏列表
export async function queryGameList(params) {
  return request(`/game/list?${qs.stringify(params)}`);
}
// 上传游戏
export async function uploadGame(params) {
  return request('/game/upload', {
    data: params,
    method: 'POST'
  });
}
// 启用禁用
export async function putGameStatus(params) {
  return request('/game/' + params.id + '/status/' + params.status, {
    method: 'PUT',
  });
}