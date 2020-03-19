var http = require('http')
var fs = require('fs')

var server = http.createServer()

server.on('request', function(request, response) {
    var url = request.url

    if (url === '/') {
        fs.readFile('./files/index.html', function(err, data) {
            if (err) {
                response.setHeader('Content-Type', 'text/plain; charset=utf-8')
                response.end('文件读取失败，请稍后重试！')
            } else {
                response.setHeader('Content-Type', 'text/html; charset=utf-8')
                // data 默认是二进制数据，可以通过，toString 转为咱们能识别的字符串
                // response.end() 支持两种数据类型，一种是二进制，一种是字符串
                response.end(data)
            }
        })
    } else if (url === '/car') {
        fs.readFile('./files/car.jpg', function(err, data) {
            if (err) {
                response.setHeader('Content-Type', 'text/plain; charset=utf-8')
                response.end('文件读取失败，请稍后重试！')
            } else {
                response.setHeader('Content-Type', 'image/jpeg')
                // data 默认是二进制数据，可以通过，toString 转为咱们能识别的字符串
                // response.end() 支持两种数据类型，一种是二进制，一种是字符串
                response.end(data)
            }
        }) 
    }
})


server.listen('5000', function() {
    console.log('服务器已经启动了，您们访问 http://localhost:5000/ ')
})