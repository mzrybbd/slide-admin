import request from '@/utils/request';

export function getComment(list) {
	request('/api/comment-list?order=asc',{
			type: 'GET',
			success (data) {
				if (data.code === 200) {
					 list = data.body
				} else {
						message.error(data.msg)
				}
			},
	})
}
