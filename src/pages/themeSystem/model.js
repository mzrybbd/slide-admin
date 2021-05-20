import { 
  getThemeList,
  getThemeDetail,
  getThemeTypes,
  createTheme,
  updateTheme,
  createThemeRecord,
  updateThemeRecord,
  toggleThemeRecordStatus,
  delThemeRecord,
  querySubjectProducts,
  getThemeSlides,
  setThemeDefaultFormat,
  updateThemeSlideIndex,
} from './service';
import router from 'umi/router';
import { message } from 'antd';

const Model = {
  namespace: 'theme',
  state: {
    list: [],
    themeDetail: {},
    themeTypes: [],
    createRes: {},
    updateRes: {},
    toggleRes: {},
    delRes: {},
    staticData: {},
  },
  effects: {
    *getList({ payload }, { call, put }) {
      const response = yield call(getThemeList, payload);
      yield put({
        type: 'getThemeList',
        payload: response.data
      });
      if (response.status !== 0) {
        message.error(response.errorMessage || '接口调用失败')
      }
    },
    /**
     * @deprecated
     */
    *getDetail({ payload }, { call, put }) {
      const response = yield call(getThemeSlides, payload);
      yield put({
        type: 'getThemeDetail',
        payload: response.data
      });
      if (response.status !== 0) {
        message.error(response.errorMessage || '接口调用失败')
      }
    },
    *getThemeRecordTypes({ payload }, { call, put }) {
      const response = yield call(getThemeTypes, payload);
      yield put({
        type: 'getThemeTypes',
        payload: response.data
      });
      if (response.status !== 0) {
        message.error(response.errorMessage || '接口调用失败')
      }
    },
    *postTheme({ payload }, { call }) {
      const response = yield call(createTheme, payload);
      if (response.status === 0) {
        return true
      } else {
        message.error(response.errorMessage || '创建失败')
        return false
      }
    },
    *putTheme({ payload }, { call }) {
      const response = yield call(updateTheme, payload);
      if (response.status === 0) {
        return true
      } else {
        message.error(response.errorMessage || '修改失败')
        return false
      }
    },
    *postThemeRecord({ payload }, { call, put }) {
      const response = yield call(createThemeRecord, payload);
      yield put({
        type: 'createThemeRecord',
        payload: response
      });
      if(response.status !== 0){
        message.error(response.errorMessage || '接口调用失败')
      }
    },
    *putThemeRecord({ payload }, { call, put }) {
      const response = yield call(updateThemeRecord, payload);
      yield put({
        type: 'updateThemeRecord',
        payload: response.body,
      });
      if(response.status !== 0){
        message.error(response.errorMessage || '接口调用失败')
      }
    },
    *toggleRecordStatus({ payload }, { call, put }) {
      const response = yield call(toggleThemeRecordStatus, payload);
      yield put({
        type: 'toggleThemeRecordStatus',
        payload: response
      });
      if(response.status !== 0){
        message.error(response.errorMessage || '接口调用失败')
      }
    },
    *deleteRecord({ payload }, { call, put }) {
      const response = yield call(delThemeRecord, payload);
      yield put({
        type: 'delThemeRecord',
        payload: response
      });
      if(response.status !== 0){
        message.error(response.errorMessage || '接口调用失败')
      }
    },
    *querySubjectStatic({ payload }, { call, put }) {
      const response = yield call(querySubjectProducts, payload);
      if (response.status === 1 && response.errorCode === 0) {
        yield put({
          type: 'queryStaticData',
          payload: response.body
        });
      } else {
        message.error('调用学科失败')
      }
    },
    *setThemeDefaultFormat({ payload }, { call }) {
      const response = yield call(setThemeDefaultFormat, payload);
      if (response.status === 0) {
        return true
      } else {
        message.error(response.errorMessage)
        return false
      }
    },
    *sortThemeRecord({ payload }, { call }) {
      const response = yield call(updateThemeSlideIndex, payload);
      if (response.status === 0) {
        return true
      } else {
        message.error(response.errorMessage)
        return false
        // return Promise.reject('排序失败')
      }
    },

  },
  reducers: {
    getThemeList(state, action) {
      return { ...state, list: action.payload || []};
    },
    getThemeDetail(state, action) {
      return { ...state, themeDetail: action.payload || {}};
    },
    getThemeTypes(state, action) {
      return { ...state, themeTypes: action.payload || []};
    },
    createThemeRecord(state, action) {
      return { ...state, createRes: action.payload || {} };
    },
    updateThemeRecord(state, action) {
      return { ...state, updateRes: action.payload || {}};
    },
    toggleThemeRecordStatus(state, action) {
      return { ...state, toggleRes: action.payload || {}};
    },
    delThemeRecord(state, action) {
      return { ...state, delRes: action.payload || {} };
    },
    queryStaticData(state, action) {
      return { ...state, staticData: action.payload };
    },
  },
};

export default Model;
