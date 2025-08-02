import * as gauze from "./gauze.js"
import * as model from "./model.js"

class GauzeModelService {
	create(header, variables) {
		return gauze.default.create(header, variables).then(function (rows) {
			rows.forEach(function (row) {
				model.default.upsert(row._metadata, row.attributes)
			})
			return rows
		})
	}
	count(header, variables) {
		return gauze.default.count(header, variables).then(function (rows) {

		})
	}
	read(header, variables) {
		return gauze.default.read(header, variables).then(function (rows) {
			rows.forEach(function (row) {
				model.default.upsert(row._metadata, row.attributes)
			})
			return rows
		})
	}
	update(header, variables) {
		return gauze.default.update(header, variables).then(function (rows) {
			rows.forEach(function (row) {
				model.default.upsert(row._metadata, row.attributes)
			})
			return rows
		})
	}
	delete(header, variables) {
		return gauze.default.delete(header, variables).then(function (rows) {
			rows.forEach(function (row) {
				model.default.delete(row._metadata)
			})
			return rows
		})
	}
}

export default new GauzeModelService()
