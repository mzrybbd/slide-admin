import request from '@/utils/request';

export async function queryComment() {
  return request('/api/comment-list');
}