import request from '@/utils/request';
import qs from 'qs';

/**
 *  获取主题列表
 */
export async function getThemeList() {
  return request(`/api/v2/theme/list`);
}

/**
 *  获取主题详情
 */
export async function getThemeDetail(params) {
  return request(`/api/v2/theme/simplify/${params.themeId}`);
}
/**
 *  获取主题下模板类型
 */
export async function getThemeTypes(params) {
  return request(`/api/v2/theme/${params.themeId}/templateTypes`);
}
/**
 *  新建主题课件页
 */
export async function createThemeRecord(params) {
  return request(`/api/v2/theme/${params.themeId}/themeSlides`, {
    method: 'POST',
    data: params,
  });
}
/**
 *  课件页类型编辑
 */
export async function updateThemeRecord(params) {
  return request(`/api/v2/themeSlide/${params.themeId}/info`, {
    method: 'PUT',
    data: params,
  });
}
/**
 *  启用禁用主题记录
 */
export async function toggleThemeRecordStatus(params) {
  return request(`/api/v2/themeSlide/${params.id}/active/${params.active}`, {
    method: 'PUT',
  });
}
/**
 *  删除主题记录
 */
export async function delThemeRecord(params) {
  return request(`/api/v2/themeSlide/${params.id}`, {
    method: 'DELETE',
  });
}
