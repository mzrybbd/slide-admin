// let home = {
//   status: 0,
//   data: {
//     id: 1,
//     name: '爱提分在线课件模板_语文(旧)',
//     themeSlideList: [
//       {
//         id: 1,
//         name: '封面页',
//         active: false,
//         themeType: 1,
//         slideName: '首页1',
//         templateTypeName: '普通模板页',
//         templateType: 1
//       },
//       {
//         id: 2,
//         name: '讲次标题页',
//         active: true,
//         themeType: 2,
//         slideName: '讲次标题页1',
//         templateTypeName: '普通模板页',
//         templateType: 1
//       },
//       {
//         id: 3,
//         name: '目录',
//         active: true,
//         themeType: 3,
//         slideName: '目录1',
//         templateTypeName: '目录',
//         templateType: 4
//       },
//       {
//         id: 4,
//         name: '模块页',
//         active: true,
//         themeType: 4,
//         slideName: '模块页1',
//         templateTypeName: '普通模板页',
//         templateType: 1
//       },
//       {
//         id: 5,
//         name: '正文',
//         active: true,
//         themeType: 5,
//         slideName: '正文1',
//         templateTypeName: 'Word碎片页',
//         templateType: 2
//       },
//       {
//         id: 6,
//         name: '题目',
//         active: true,
//         themeType: 6,
//         slideName: '附加题',
//         templateTypeName: '通用题目页',
//         templateType: 3
//       },
//       {
//         id: 15,
//         name: '结束页',
//         active: true,
//         themeType: 7,
//         slideName: '结束页1',
//         templateTypeName: '普通模板页',
//         templateType: 1
//       },
//     ],
//   },
// };
// let temp2 = {
//   status: 0,
//   data: [
//     {
//       name: '普通模板页',
//       templateType: 1,
//       themeList: [
//         {
//           name: '封面页',
//           id: 1,
//         },
//         {
//           name: '讲次标题页',
//           id: 2,
//         },
//         {
//           name: '模板页',
//           id: 4,
//         },
//         {
//           name: '结尾页',
//           id: 7,
//         },
//       ],
//     },
//     {
//       name: 'Word碎片页',
//       templateType: 2,
//       themeList: [
//         {
//           name: '正文',
//           id: 5,
//         },
//       ],
//     },
//     {
//       name: '通用题目页',
//       templateType: 3,
//       themeList: [
//         {
//           name: '题目',
//           id: 6,
//         },

//       ],
//     },
//   ],
// };

// let temp3 = {
//   status: 0,
//   data: {
//     id: 1387,
//     templateType: 1,
//     templateTypeName: '普通模板页',
//     name: 'slide',
//     themeType: 10,
//     active: false,
//   },
// };
// let del = {
//   status: 0,
//   data: true,
// };
// export default {
//   'GET  /api/v3/theme/list': (req, res) => {
//     res.send({
//       status: 0,
//       data: [{ id: 1, name: '初中数学第一讲主题模板' }],
//       itemTotal: 1,
//       pageNum: 1,
//     });
//   },
//   'GET  /api/v3/theme/simplify/1': (req, res) => {
//     res.send(home);
//   },
//   'POST /api/v3/theme/simplify/1/templateTypes': (req, res) => {
//     res.send({
//       status: 1,
//       errorCode: 0,
//       errorMessage: '',
//       body: 54327,
//     });
//   },
//   'PUT /api/v3/themeSlide/1/active/true': (req, res) => {
//     res.send({
//       status: 0,
//       data: true,
//     });
//   },
//   'PUT /api/v3/themeSlide/1/active/false': (req, res) => {
//     res.send({
//       status: 0,
//       data: false,
//     });
//   },
//   'PUT /api/v3/themeSlide/1/info': (req, res) => {
//     res.send({
//       status: 0,
//       data: false,
//     });
//   },
//   'GET /api/v3/theme/1/templateStructure': (req, res) => {
//     res.send(temp2);
//   },
//   'POST /api/v3/theme/1/themeSlides': (req, res) => {
//     res.send(temp3);
//   },
//   'DELETE /api/v3/themeSlide/1': (req, res) => {
//     res.send({
//       status: 0,
//       data: false,
//     });
//   },
// };

// // export default {
// //   'GET /api/v3/theme/list': (req, res) => {
// //     res.send({
// //       status: 0,
// //       data: [{ id: 1, name: '初中数学第一讲主题模板' }],
// //       itemTotal: 1,
// //       pageNum: 1
// //     });
// //   },
// //   'GET /api/v3/theme/simplify/1': (req, res) => res.send(home),
// //   'GET /api/v3/theme/simplify/1/templateTypes': (req, res) => res.send(temp2),
// //   'POST /api/v3/theme/1/themeSlide': (req, res) => res.send(temp3),
// //   'PUT /api': res.send(del),
// // };
const x = 
{
  "status": 0,
  "errorCode": 0,
  "data": {
    id: 123,
    name: "ss",
    "themeTypeList": [
        {
            "themeType": 1,
            "themeTypeName": "封面页",
            "themeSlideList": [
                {
                    "id": 2071,
                    "name": "封面页",
                    "active": true,
                    "themeType": 1,
                    "templateTypeName": "普通模板页",
                    "templateType": 1,
                    "themeTypeName": "封面页",
                    "defaultFormat": true,
                    "formatIndex": 1
                },
                {
                  "id": 207222,
                  "name": "封面页2",
                  "active": true,
                  "themeType": 1,
                  "templateTypeName": "普通模板页",
                  "templateType": 1,
                  "themeTypeName": "封面页",
                  "defaultFormat": false,
                  "formatIndex": 2
              }
            ]
        },
        {
            "themeType": 2,
            "themeTypeName": "讲次标题页",
            "themeSlideList": [
                {
                    "id": 2072,
                    "name": "讲次标题页",
                    "active": true,
                    "themeType": 2,
                    "templateTypeName": "普通模板页",
                    "templateType": 1,
                    "themeTypeName": "讲次标题页",
                    "defaultFormat": true,
                    "formatIndex": 1
                }
            ]
        },
        {
            "themeType": 4,
            "themeTypeName": "模块页",
            "themeSlideList": [
                {
                    "id": 2073,
                    "name": "模块页",
                    "active": true,
                    "themeType": 4,
                    "templateTypeName": "普通模板页",
                    "templateType": 1,
                    "themeTypeName": "模块页",
                    "defaultFormat": true,
                    "formatIndex": 1
                }
            ]
        },
        {
            "themeType": 5,
            "themeTypeName": "正文页",
            "themeSlideList": [
                {
                    "id": 2077,
                    "name": "正文页",
                    "active": true,
                    "themeType": 5,
                    "templateTypeName": "Word碎片页",
                    "templateType": 2,
                    "themeTypeName": "正文页",
                    "defaultFormat": true,
                    "formatIndex": 1
                }
            ]
        },
        {
            "themeType": 6,
            "themeTypeName": "题目页",
            "themeSlideList": [
                {
                    "id": 2074,
                    "name": "题目页",
                    "active": true,
                    "themeType": 6,
                    "templateTypeName": "普通模板页",
                    "templateType": 1,
                    "themeTypeName": "题目页",
                    "defaultFormat": true,
                    "formatIndex": 1
                }
            ]
        },
        {
            "themeType": 7,
            "themeTypeName": "尾页",
            "themeSlideList": [
                {
                    "id": 2076,
                    "name": "尾页",
                    "active": true,
                    "themeType": 7,
                    "templateTypeName": "普通模板页",
                    "templateType": 1,
                    "themeTypeName": "尾页",
                    "defaultFormat": true,
                    "formatIndex": 1
                }
            ]
        },
        {
            "themeType": 8,
            "themeTypeName": "2013视频",
            "themeSlideList": [
                {
                    "id": 2075,
                    "name": "2013视频",
                    "active": true,
                    "themeType": 8,
                    "templateTypeName": "普通模板页",
                    "templateType": 1,
                    "themeTypeName": "2013视频",
                    "defaultFormat": true,
                    "formatIndex": 1
                }
            ]
        }
    ]
  }
}
// export default {
//   'GET /api/v2/themeSlide/sort': (req, res) => setTimeout(()=>res.send({status: 1,errorCode:0}),200),
//   'GET /api/v3/theme/175/themeSlides': (req, res) => setTimeout(()=>res.send(x),200)
// }