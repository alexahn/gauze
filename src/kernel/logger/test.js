import {
	IO_LOGGER_KERNEL
} from './io.js'

IO_LOGGER_KERNEL.write('1', 'a', 'hello\nworld')

IO_LOGGER_KERNEL.write('1', 'b', JSON.stringify({x: 10}, null, 4))

console.log(JSON.stringify({x: 10}, null, 4))
