function fakeList() {
	const list = [];

	for (let i = 0; i < 12; i += 1) {
		list.push(
			{
        "id": i+1,
        "gameId": "retech-test",
        "gameName": "睿泰最新修改测试包",
        "gameDescription": "睿泰最新修改测试包",
        "source": 1,
        "type": 1,
        "enabled": true,
        "uploadTime": 1589541588000,
        "isPublic": true,
        "isIframe": false,
        "cdnPath": "https://img-courseware.aixuexi.com/2655a765-166f-4e75-8ad5-ce2760373447/games/retech/rt_course/retech-test",
        "assets": {
          "images/thumb.png": "images/thumb.png"
        },
        "replacement": {},
        "version": 7
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



