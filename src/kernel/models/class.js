import url from 'url'
import path from 'path'
const __FILEPATH = url.fileURLToPath(import.meta.url)
const __RELATIVE_FILEPATH = path.relative(process.cwd(), __FILEPATH)

import * as $kernel from './../../kernel/index.js'
import * as $structure from './../../structure/index.js'

// base model that is based off the organization of structure
class Model {
	constructor ({
		fields = {},
		protected_fields = [],
		field_serializers = {}
	}) {
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${this.name}.constructor:enter`)
		this.fields = fields
		this.protected_fields = protected_fields
		this.field_serializers = field_serializers
		this.name = this.__name()
		this.relationship_table = $structure.relationship.database.sql.TABLE_NAME__SQL__DATABASE__RELATIONSHIP__STRUCTURE
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${this.name}.constructor:exit`)
	}
	__name () {
		return this.constructor.name
	}
	// requires this.protected_fields and this.field_serializers
	serialize (attributes, method) {
		const self = this
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${this.name}.serialize:enter`, 'attributes', attributes)
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${this.name}.serialize:enter`, 'method', method)
		// clear attributes for protected fields
		this.protected_fields.forEach(function (field) {
			delete attributes[field]
		})
		// input serializers
		Object.keys(this.field_serializers).forEach(function (field) {
			if (self.field_serializers[field].input[method]) {
				attributes = self.field_serializers[field].input[method](attributes)
			}
		})
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${this.name}.deserialize:exit`, 'attributes', attributes)
		return attributes
	}
	// requires this.field_serializers
	deserialize (row) {
		const self = this
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${this.name}.deserialize:enter`, 'row', row)
		Object.keys(this.field_serializers).forEach(function (field) {
			row = self.field_serializers[field].output(row)
		})
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${this.name}.serialize_output:exit`, 'row', row)
		return row
	}
}

class KernelModel extends Model {

}

export {
	Model,
	KernelModel
}
