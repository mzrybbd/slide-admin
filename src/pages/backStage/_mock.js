function fakeList() {
	const list = [];

	for (let i = 0; i < 12; i += 1) {
		list.push(
			{
				"id": i + 1,
				"gameName": "测试测试0测试6测试2测试7测试-43",
				"enabled": true,
				"source": 1,
				"type": 1,
				"gameDescription": "测试测试0测试6测试2测试7测试测试测试0测试6测试2测试7测试",
				"thumbnail": "http://storage.aixuexi.com/u/80etDFEzFb54"
			}
		);
	}
	let res = {
		"status": 1,
		"errorCode": 0,
		"errorMessage": "",
		"body": {
			"pageNum": 1,
			"pageSize": 12,
			"startNum": 0,
			"pageTotal": 13,
			"itemTotal": 1,
			"list": list
		}
	}
	return res;
}

function getFakeList(req, res) {
	const params = req.query;
	const count = params.count * 1 || 20;
	const result = fakeList(count);

	return res.json(result);
}

// export default {
// 	'GET  /game/list?page=1&size=20': getFakeList,
// 	'POST /game/upload': (req, res) => {
// 		res.send({
// 			"status": 1,
// 			"errorCode": 0,
// 			"errorMessage": "",
// 			"body": 54327
// 		});
// 	},
// 	'PUT /game/1/status/1': (req, res) => {
// 		res.send({
// 			"status": 1,
// 			"errorCode": 0,
// 			"errorMessage": "",
// 			"body": {}
// 		});
// 	},
// };



