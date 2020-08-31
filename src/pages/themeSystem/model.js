import { getThemeList, getThemeDetail, getThemeTypes, createThemeRecord, updateThemeRecord, toggleThemeRecordStatus, delThemeRecord } from './service';
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
    *getDetail({ payload }, { call, put }) {
      const response = yield call(getThemeDetail, payload);
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
  },
};

export default Model;
