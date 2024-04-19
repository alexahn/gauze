import {
	IO_LOGGER_KERNEL
} from './io.js'

IO_LOGGER_KERNEL.write('1', 'a', 'hello\nworld')

IO_LOGGER_KERNEL.write('1', 'b', JSON.stringify({
	x: 10
}, null, 4))

IO_LOGGER_KERNEL.write('1.1', 'c', JSON.stringify({
	y: 20
}, null, 4), 'something')

IO_LOGGER_KERNEL.write('1.1', 'c', 'something', function hello () {})

IO_LOGGER_KERNEL.write('1.2', 'd', 'hello', 'world', JSON.stringify({
	z: 30
}, null, 4))

IO_LOGGER_KERNEL.write('1.3', 'e', JSON.stringify({
	a: 10
}, null, 4), 'hello', JSON.stringify({
	b: 20
}, null, 4), 'goodbye', JSON.stringify({
	c: 30
}, null, 4))