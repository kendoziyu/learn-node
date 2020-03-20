var template = require('art-template')
var fs = require('fs')

fs.readFile('./src/example-tpl.html', function(err, data) {
    if (err) {
        return console.log('读取文件失败了')
    }

    // readFile 默认读取到的 data 是二进制数据
    // 而模板引擎的 render 方法需要接收的是字符串
    // 所以我们在这里需要把 data 二进制数据转为 字符串
    var ret = template.render(data.toString(), {
        title: '自我介绍',
        name: 'Jackson',
        age: '20',
        province: '江苏',
        hobbies: [
            "唱",
            "跳",
            "rap",
            "篮球"
        ]
    })

    console.log(ret)
})