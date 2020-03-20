var http = require('http')
var fs = require('fs')
var path = require('path')
var template = require('art-template')

var server = http.createServer()

server.on('request', function(request, response) {
    var url = request.url

    fs.readFile('./src/template.html', function(err, data) {
        if (err) {
            response.setHeader('Content-Type', 'text/plain; charset=utf-8')
            return response.end('文件读取失败，请稍后重试！')
        }

        var fileDir = path.resolve('files')
        fs.readdir(fileDir, function(err, files) {
            if (err) {
                return response.end('Not Found Directory')
            }
            // console.log(files)

            fs.readFile('./src/filedir-template.html', function(err, data) {
                if (err) {
                    return console.log('读取模板文件失败！')
                }

                var htmlStr = data.toString()
                var ret = template.render(htmlStr, {
                    title: '我的文件夹',
                    files: files
                })

                // 3. 发送替换过后的内容
                response.setHeader('Content-Type', 'text/html; charset=utf-8')
                response.end(ret) 
            })
        })
        
    })
})


server.listen('5000', function() {
    console.log('服务器已经启动了，您们访问 http://localhost:5000/ ')
})