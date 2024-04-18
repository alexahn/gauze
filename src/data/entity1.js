import {
	create_index
} from './helper.js'

const Records = [{
	id: '1',
	text: 'begin'
}, {
	id: '2',
	text: 'end'
}]

const Index = create_index({}, Records, 'id')

export {
	Records,
	Index
}