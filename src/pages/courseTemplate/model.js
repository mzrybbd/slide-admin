import { queryList, querySubjectProducts, queryGrade, queryTempalte,deleteTemplate, putTemplate, copyTemplate, putStatus,createTemplate, putAnyTemplate } from './service';
import responsiveObserve from 'antd/lib/_util/responsiveObserve';
import { message } from 'antd';
import router from 'umi/router';

const Model = {
  namespace: 'listSearchProjects',
  state: {
    list: [],
    staticData: {},
    grade1: [],
    grade2: [],
    grade3: [],
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
      if(response.status === 1 && response.errorCode === 0){
        yield put({
          type: 'queryList',
          payload: response.body
        });
      }else{
        message.error('接口调用失败')
      }
    },
    *fetch2({ payload }, { call, put }) {
      const response = yield call(querySubjectProducts, payload);
      if(response.status === 1 && response.errorCode === 0){
        yield put({
          type: 'queryStatic',
          payload: response.body
        });
      }else{
        message.error('接口调用失败')
      }
    },
    *fetch31({ payload }, { call, put }) {
      const response = yield call(queryGrade, payload);
      if(response.status === 1 && response.errorCode === 0){
        yield put({
          type: 'queryGrade1',
          payload: Array.isArray(response.body) ? response.body : [],
        });
      }else{
        message.error('接口调用失败')
      }
    },
    *fetch32({ payload }, { call, put }) {
      const response = yield call(queryGrade, payload);
      if(response.status === 1 && response.errorCode === 0){
        yield put({
          type: 'queryGrade2',
          payload: Array.isArray(response.body) ? response.body : [],
        });
      }else{
        message.error('接口调用失败')
      }
    },
    *fetch33({ payload }, { call, put }) {
      const response = yield call(queryGrade, payload);
      if(response.status === 1 && response.errorCode === 0){
        yield put({
          type: 'queryGrade3',
          payload: Array.isArray(response.body) ? response.body : [],
        });
      }else{
        message.error('接口调用失败')
      }
    },
    *fetch4({ payload }, { call, put }) {
      const response = yield call(queryTempalte, payload);
      if(response.status === 1 && response.errorCode === 0){
        yield put({
          type: 'queryTempalte',
          payload: response.body
        });
      }else{
        message.error('接口调用失败')
      }
    },
    *createT({ payload }, { call, put }) {
      const response = yield call(createTemplate, payload);
      if(response.status === 1 && response.errorCode === 0){
        yield put({
          type: 'createTemplate',
          payload: response
        });
        message.success('创建成功')
        router.push('/courseTemplate/'+response.body)
      }else if(response.errorCode === 100002) {
        message.warning('课程模板名称已存在')
      }
    },
    *deleteT({ payload }, { call, put }) {
      const response = yield call(deleteTemplate, payload);
      if(response.status === 1 && response.errorCode === 0){
        yield put({
          type: 'deleteTemplate',
          payload: response.body
        });
        message.success('删除成功')
      }else if(response.errorCode === 100001) {
        message.warning('课程模板名称已被引用，无法删除')
      }
    },
    *putT({ payload }, { call, put }) {
      const response = yield call(putTemplate, payload);
      if(response.status === 1 && response.errorCode === 0){
        yield put({
          type: 'putTemplate',
          payload: response.body
        });
        message.success('修改成功')
      }else if(response.errorCode === 100002){
        message.warning('课程模板名称已存在')
      }
      else if(response.errorCode === 100001) {
        message.warning('课程模板名称已被引用，无法禁用')
      }
    },
    *copyT({ payload }, { call, put }) {
      const response = yield call(copyTemplate, payload);
      if(response.code === 200){
        yield put({
          type: 'copyTemplate',
          payload: response.body
        });
        message.success('复制成功')
      }else{
        message.error('复制失败')
      }
    },
    *putS({ payload }, { call, put }) {
      const response = yield call(putStatus, payload);
      if(response.status === 1 && response.errorCode === 0){
        yield put({
          type: 'putStatus',
          payload: response.body
        });
        message.success('操作成功')
      }else if(response.errorCode === 100002){
        message.warning('课程模板名称已存在')
      }
      else if(response.errorCode === 100001) {
        message.warning('课程模板名称已被引用，无法禁用')
      }
    },
    *putAnyS({ payload }, { call, put }) {
      const response = yield call(putAnyTemplate, payload);
      if(response.code === 200){
        yield put({
          type: 'putAnyStatus',
          payload: response.body
        });
        message.success('操作成功')
      }else if(response.code === 512){
        message.error('模版元素为空，操作失败')
      }else {
        message.error('操作失败')
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
    queryGrade1(state, action) {
      return { ...state, grade1: action.payload };
    },
    queryGrade2(state, action) {
      return { ...state, grade2: action.payload };
    },
    queryGrade3(state, action) {
      return { ...state, grade3: action.payload };
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
