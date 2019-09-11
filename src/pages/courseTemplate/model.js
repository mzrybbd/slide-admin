import { queryList, querySubjectProducts, queryGrade, queryTempalte,deleteTemplate, putTemplate, copyTemplate, putStatus,createTemplate, putAnyTemplate } from './service';
import responsiveObserve from 'antd/lib/_util/responsiveObserve';

const Model = {
  namespace: 'listSearchProjects',
  state: {
    list: [],
    staticData: {},
    grade: [],
    edit: {},
    createRes: {},
    copyRes: {},
    deleteRes: {},
    putRes: {},
    putDetailRes: {},
    putAnyRes: {}
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryList, payload);
      if(response.status === 1){
        yield put({
          type: 'queryList',
          payload: response.body
        });
      }
    },
    *fetch2({ payload }, { call, put }) {
      const response = yield call(querySubjectProducts, payload);
      if(response.status === 1){
        yield put({
          type: 'queryStatic',
          payload: response.body
        });
      }
    },
    *fetch3({ payload }, { call, put }) {
      const response = yield call(queryGrade, payload);
      if(response.status === 1){
        yield put({
          type: 'queryGrade',
          payload: Array.isArray(response.body) ? response.body : [],
        });
      }
    },
    *fetch4({ payload }, { call, put }) {
      const response = yield call(queryTempalte, payload);
      if(response.status === 1){
        yield put({
          type: 'queryTempalte',
          payload: response.body
        });
      }
    },
    *createT({ payload }, { call, put }) {
      const response = yield call(createTemplate, payload);
      if(response.status === 1 && response.errorCode === 0){
        yield put({
          type: 'createTemplate',
          payload: response.body
        });
      }
    },
    *deleteT({ payload }, { call, put }) {
      const response = yield call(deleteTemplate, payload);
      if(response.status === 1 && response.errorCode === 0){
        yield put({
          type: 'deleteTemplate',
          payload: response.body
        });
      }
    },
    *putT({ payload }, { call, put }) {
      const response = yield call(putTemplate, payload);
      if(response.status === 1 && response.errorCode === 0){
        yield put({
          type: 'putTemplate',
          payload: response.body
        });
      }
    },
    *copyT({ payload }, { call, put }) {
      const response = yield call(copyTemplate, payload);
      if(response.code === 200){
        yield put({
          type: 'copyTemplate',
          payload: response.body
        });
      }
    },
    *putS({ payload }, { call, put }) {
      const response = yield call(putStatus, payload);
      if(response.status === 1 && response.errorCode === 0){
        yield put({
          type: 'putStatus',
          payload: response.body
        });
      }
    },
    *putAnyS({ payload }, { call, put }) {
      const response = yield call(putAnyTemplate, payload);
      if(response.code === 200){
        yield put({
          type: 'putAnyStatus',
          payload: response.body
        });
      }
    },
  },
  reducers: {
    queryList(state, action) {
      return { ...state, list: action.payload };
    },
    queryStatic(state, action) {
      return { ...state, staticData: action.payload };
    },
    queryGrade(state, action) {
      return { ...state, grade: action.payload };
    },
    queryTempalte(state, action) {
      return { ...state, edit: action.payload };
    },
    putTemplate(state, action) {
      return { ...state, putDetailRes: action.payload };
    },
    createTemplate(state, action) {
      return { ...state, createRes: action.payload };
    },
    deleteTemplate(state, action) {
      return { ...state, deleteRes: action.payload };
    },
    putStatus(state, action) {
      return { ...state, putRes: action.payload };
    },
    copyTemplate(state, action) {
      return { ...state, copyRes: action.payload };
    },
    putAnyStatus(state, action) {
      return { ...state, putAnyRes: action.payload };
    },
    
  },
};
export default Model;
