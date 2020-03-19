var foo = 'bbb'

exports.foo = 'hello'

exports.readFile = function(path, callback) {
	console.log(path)
}