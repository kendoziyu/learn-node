const http = require('http');


const server = http.createServer()

server.on('request', function(request, response) {
	console.log('收到客户端的请求，请求地址是' + request.url)
	console.log('客户端的端口号是' , request.socket.remoteAddress, request.socket.remotePort)
	let url = request.url
	
	if (url === '/') {
		response.end('index page')
	} else if (url === '/login') {
		response.end('login page')
	} else if (url === '/products') {
		response.setHeader('Content-Type', 'test/plain; charset=utf-8')
		let products = [{
			name: '苹果',
			price: 10
		},
		{
			name: '菠萝',
			price: 20
		}]
		response.end(JSON.stringify(products))
	} else if (url === '/plain') {
		response.setHeader('Content-Type', 'text/plain; charset=utf-8')
		response.end('Hello 世界')
	} else if (url === '/html') {
		response.setHeader('Content-Type', 'text/html; charset=utf-8')
		response.end('<p>hello html <a href="http://www.baidu.com">点我</a></p>')
	} else {
		response.end('404 Not Found')
	}
})

server.listen(3000, function() {
	console.log('服务器启动成功了，请访问 http://127.0.0.1:3000/ 查看')

	
});