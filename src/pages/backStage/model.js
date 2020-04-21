import { queryGameList, uploadGame, putGameStatus } from './service';
import responsiveObserve from 'antd/lib/_util/responsiveObserve';
import router from 'umi/router';
import { message } from 'antd';

const Model = {
  namespace: 'game',
  state: {
    gameList: [],
    uploadGameRes: {},
    putGameRes: {}
  },
  effects: {
    *fetchList({ payload }, { call, put }) {
      const response = yield call(queryGameList, payload);
      yield put({
        type: 'queryList',
        payload: response.body
      });
      if (response.status !== 1) {
        message.error(response.errorMessage || '接口调用失败')
      }
    },
    *postUploadGame({ payload }, { call, put }) {
      const response = yield call(uploadGame, payload);
      yield put({
        type: 'uploadGame',
        payload: response
      });
      if(response.status === 1){
        message.success(`上传成功`)
      }else{
        message.error(response.errorMessage || '接口调用失败')
      }
    },
    *putStatus({ payload }, { call, put }) {
      const response = yield call(putGameStatus, payload);
      yield put({
        type: 'putGameStatus',
        payload: response.body,
      });
      if(response.status === 1){
        message.success(`${payload.status ? '启用成功' : '禁用成功'}`)
      }else{
        message.error(response.errorMessage || '接口调用失败')
      }
    },
  },
  reducers: {
    putGameStatus(state, action) {
      return { ...state, gameList: action.payload.body || []};
    },
    uploadGame(state, action) {
      return { ...state, uploadGameRes: action.payload || {}};
    },
    putGameStatus(state, action) {
      return { ...state, putGameRes: action.payload || {} };
    },
  },
};

export default Model;
