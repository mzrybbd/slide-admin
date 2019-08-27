import request from '@/utils/request';
import Header from 'antd/lib/calendar/Header';

export async function queryComment() {
  return request('/api/comment-list',{
    method: 'GET'
  });
}