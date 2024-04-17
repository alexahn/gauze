import { create_index } from './helper.js'

const Records = [{
	id: '1',
	text: 'hello'
}, {
	id: '2',
	text: 'world'
}]

const Index = create_index({}, Records, 'id')

export {
	Records,
	Index
}
