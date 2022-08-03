let infoList = {
    code: 200,
    message: 'success',
    data: {
        total: 100,
        'tableInfo|5': [{
            // id: '@guid',
            date: '@date',
            name: '@cname',
            address:'@county(true)' // 省市区
            // 'age|20-30': 23,
            // 'job|1': ['前端工程师', '后端工程师', 'UI工程师', '需求工程师']
        }],
        'statisInfo|6':[{
            // "bgColor|+1":['blue','pink','purple'],
            bgColor:"@color",
            "icon|+1":['success','star-on','s-goods'],
            "value|100-1000": 23, // 23只是用来确定类型为Number
            name:"@ctitle" //c表示中文（标题）
        }],
        'date|10':[{
            // 'date': '@date'
            'date': '@date'
        }],
        'orderInfo|10':[{
            'apple|1000-3000':35,
            'oppo|1000-3000':35,
            'vivo|1000-3000':35,
        }],
        'userInfo|7':[{
            '新增用户|100-500':46,
            '活跃用户|50-300':35
        }],
        'waysInfo|5':[{
            wayName: '@cword',
            "value|100-1000": 344
        }]
    }
};

let userList = {
    code: 200,
    message: 'success',
    data: {
        'userInfo|20': [{
            name: '@cname',
            'age|10-50': 23,
            'sex|1':['男','女'],
            date: '@date',
            address:'@county(true)' // 省市区
        }],
    }
}
export default {
    'get|/getHomeData': infoList,
    'get|/getUserList': userList
}