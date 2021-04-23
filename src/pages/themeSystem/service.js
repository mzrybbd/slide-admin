import request from '@/utils/request';
import qs from 'qs';

/**
 *  获取主题列表
 */
export async function getThemeList() {
  return request(`/api/v3/theme/list`);
}

/**
 *  获取主题详情
 * @deprecated
 */
export async function getThemeDetail(params) {
  return request(`/api/v2/theme/simplify/${params.themeId}`);
}
/**
 *  获取主题下模板类型
 */
export async function getThemeTypes(params) {
  return request(`/api/v3/theme/${params.themeId}/templateStructure`);
}
/**
 *  新建主题模板
 */
 export async function createTheme(params) {
  return request(`/api/v2/theme/department/3/themes`,{
    method: 'POST',
    data: params,
  });
}
/**
 *  修改主题模板
 */
 export async function updateTheme(params) {
  const { id, ...rest } = params
  return request(`/api/v2/theme/department/3/themes/${id}`, {
    method: 'PUT',
    data: rest,
  });
}
/**
 *  新建主题课件页
 */
export async function createThemeRecord(params) {
  return request(`/api/v3/theme/${params.themeId}/themeSlides`, {
    method: 'POST',
    data: params,
  });
}
/**
 *  课件页类型编辑
 */
export async function updateThemeRecord(params) {
  return request(`/api/v3/themeSlide/${params.slideId}/info`, {
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
/**
 *  获取学科列表（Copy过来），后续可移到公共model中
 */
export async function querySubjectProducts() {
  return request('/structureTempApi/toolbarInfo/subjectProducts/');
}

/**
 *  根据主题id查询各模板类型列表
 */
 export async function getThemeSlides(params) {
  return request(`/api/v3/theme/${params.themeId}/themeSlides`);
}

/**
 *  设置默认页接口
 */
export async function setThemeDefaultFormat(params) {
  return request(`/api/v3/themeSlide/${params.themeSlideId}/defaultFormat`, {
    method: 'POST',
  });
}
/**
 *  主题模板排序
 */
export async function updateThemeSlideIndex(params) {
  return request(`/api/v3/themeSlide/${params.themeSlideId}/formatIndex/${params.index}`, {
    method: 'POST',
  });
}