function fakeList() {
  const list = [];

  for (let i = 0; i < 12; i += 1) {
    list.push(
        {
            "id": i+1,
            "title": "测试测试0测试6测试2测试7测试-43",
            "enabled": true,
            "referenced": true,
            "subjectProductId": 1,
            "deckUuid": "",
            "previewImg": "http://storage.aixuexi.com/u/80etDFEzFb54"
        }
    );
  }
  let res =  {
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

export default {
  'GET  /list/subjectProduct/1': getFakeList,
  'GET /api': getSubjectProducts,
  'GET /api/104': getGrade,
  'GET /list/54323': getTemplate,
  'POST /api/': (req, res) => {
    res.send({
        "status": 1,
        "errorCode": 0,
        "errorMessage": "",
        "body": 54327
    });
  },
  'DELETE /api/': (req, res) => {
    res.send({
        "status": 1,
        "errorCode": 0,
        "errorMessage": "",
        "body": {}
    });
  },  
  'PUT /api/': (req, res) => {
    res.send({
        "status": 1,
        "errorCode": 0,
        "errorMessage": "",
        "body": {}
    });
  },
  'PUT /api/59/status/1': (req, res) => {
    res.send({
        "status": 1,
        "errorCode": 0,
        "errorMessage": "",
        "body": {}
    });
  },
  'PUT /api/59/tempType/1/status/1': (req, res) => {
    res.send({
        "status": 1,
        "errorCode": 0,
        "errorMessage": "",
        "body": {}
    });
  },
  'POST /api/59/copy': (req, res) => {
    res.send({
        "status": 1,
        "errorCode": 0,
        "errorMessage": "",
        "body": {}
    });
  },
};

const staticVal = {
  "status": 1,
  "errorCode": 0,
  "errorMessage": "",
  "body": {
      "subjectProductList": [
          {
              "id": 104,
              "name": "测试高中化学"
          },
          {
              "id": 22,
              "name": "小学数学"
          },
          {
              "id": 7,
              "name": "初中数学"
          },
          {
              "id": 98,
              "name": "测试专用数据零"
          },
          {
              "id": 30,
              "name": "高中数学"
          },
          {
              "id": 23,
              "name": "小学语文"
          },
          {
              "id": 6,
              "name": "初中语文"
          },
          {
              "id": 46,
              "name": "高中语文"
          },
          {
              "id": 21,
              "name": "小学英语"
          },
          {
              "id": 34,
              "name": "初中英语"
          },
          {
              "id": 35,
              "name": "高中英语"
          },
          {
              "id": 45,
              "name": "剑桥国际少儿英语"
          },
          {
              "id": 43,
              "name": "新概念英语青少版"
          },
          {
              "id": 44,
              "name": "新概念英语"
          },
          {
              "id": 11,
              "name": "初中物理"
          },
          {
              "id": 32,
              "name": "高中物理"
          },
          {
              "id": 13,
              "name": "初中化学"
          },
          {
              "id": 31,
              "name": "高中化学"
          },
          {
              "id": 33,
              "name": "高中生物"
          },
          {
              "id": 29,
              "name": "幼儿数学"
          },
          {
              "id": 28,
              "name": "幼儿机器人"
          },
          {
              "id": 26,
              "name": "小学机器人"
          },
          {
              "id": 41,
              "name": "幼儿部口才"
          },
          {
              "id": 42,
              "name": "小学口才"
          },
          {
              "id": 39,
              "name": "幼儿部书法"
          },
          {
              "id": 40,
              "name": "小学书法"
          },
          {
              "id": 37,
              "name": "幼儿部美术"
          },
          {
              "id": 38,
              "name": "小学美术"
          },
          {
              "id": 25,
              "name": "爱思创"
          },
          {
              "id": 97,
              "name": "培训·师训"
          },
          {
              "id": 100,
              "name": "初中科学"
          },
          {
              "id": 101,
              "name": "小学素质科学"
          },
          {
              "id": 99,
              "name": "测试专用数据小学"
          }
      ],
      "yearList": [
          2020,
          2019,
          2018,
          2017
      ],
      "termMap": {
          "1": "暑假",
          "2": "秋季",
          "3": "寒假",
          "4": "春季"
      }
  }
}
const gradeList = {
  "status": 1,
  "errorCode": 0,
  "errorMessage": "",
  "body": [
      {
          "id": 68,
          "name": "高一"
      },
      {
          "id": 70,
          "name": "高二"
      },
      {
          "id": 71,
          "name": "高三"
      },
      {
          "id": 76,
          "name": "新概念英语"
      }
  ]
}
const editTemplate = {
    "status": 1,
    "errorCode": 0,
    "errorMessage": "",
    "body": {
        "id": 54323,
        "title": "测试0627-43",
        "enabled": false,
        "inverted": false,
        "subjectProductId": 1,
        "deckUuid": "eqweqw",
        "previewImg": "http://storage.aixuexi.com/u/80etDFEzFb54",
        "referenced": true,
        "themeGradeBoList": [
            3,
            4
        ],
        "themeYearBoList": [
            2019
        ],
        "themeTermBoList": [
            3,
            4
        ],
        "templateVoList": [
            {
                "type": 0,
                "name": "首页",
                "status": true
            },
            {
                "type": 1,
                "name": "讲次标题页",
                "status": false
            },
            {
                "type": 2,
                "name": "目录页",
                "status": false
            },
            {
                "type": 3,
                "name": "模块页",
                "status": false
            },
            {
                "type": 4,
                "name": "视频引导页",
                "status": false
            },
            {
                "type": 5,
                "name": "例题页",
                "status": false
            },
            {
                "type": 6,
                "name": "练习题页",
                "status": false
            },
            {
                "type": 7,
                "name": "附加题引导页",
                "status": false
            },
            {
                "type": 8,
                "name": "附加题页",
                "status": false
            },
            {
                "type": 9,
                "name": "结尾页",
                "status": false
            }
        ]
    }
}

function getSubjectProducts(req, res) {
  const result = staticVal;
  return res.json(result);
}
function getGrade(req, res) {
  const result = gradeList
  return res.json(result)
}
function getTemplate(req, res) {
  const result = editTemplate
  return res.json(result)
}

