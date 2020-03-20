var http = require('http')
var fs = require('fs')
var path = require('path')

var server = http.createServer()


server.on('request', function(request, response) {
    var url = request.url

    fs.readFile('./src/template.html', function(err, data) {
        if (err) {
            response.setHeader('Content-Type', 'text/plain; charset=utf-8')
            return response.end('文件读取失败，请稍后重试！')
        }

        // 1. 得到希望映射的目录列表中的文件名和目录名
        //    * fs.readdir
        // 2. 如何将得到的文件名和目录名替换到 template.html 中
        //    * 模板引擎 
        //      2.1 在 template.html 中需要替换的位置预留一个特殊的标记
        //      2.2 根据 files 生成需要替换的 html 内容
        var fileDir = path.resolve('files')
        fs.readdir(fileDir, function(err, files) {
            if (err) {
                return response.end('Not Found Directory')
            }
            // console.log(files)

            // 2.1 生成需要替换的内容
            var content = ''
            files.forEach(function(item) {
                content += `
                <tr>
                    <td data-value="apple/"><a class="icon dir" href="${fileDir + '/' + item}">${item}/</a></td>
                    <td class="detailsColumn" data-value="0"></td>
                    <td class="detailsColumn" data-value="1509589967">2017/11/2 上午10:32:47</td>
                </tr>
                `
            })
            
            // 2.2 替换
            data = data.toString()
            data = data.replace('^_^', content)

            console.log(data)
            
            // 3. 发送替换过后的内容
            response.setHeader('Content-Type', 'text/html; charset=utf-8')
            response.end(data) 
        })
        
    })
})


server.listen('5000', function() {
    console.log('服务器已经启动了，您们访问 http://localhost:5000/ ')
})