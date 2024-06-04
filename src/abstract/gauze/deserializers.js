const CREATED_AT__DESERIALIZER__GAUZE__ABSTRACT = function (field) {
	function convert(row) {
		row[field] = new Date(row[field]);
		return row;
	}
	return {
		create: convert,
		read: convert,
		update: convert,
		delete: convert,
		count: convert,
	};
};

const UPDATED_AT__DESERIALIZER__GAUZE__ABSTRACT = function (field) {
	function convert(row) {
		row[field] = new Date(row[field]);
		return row;
	}
	return {
		create: convert,
		read: convert,
		update: convert,
		delete: convert,
		count: convert,
	};
};

const DELETED_AT__DESERIALIZER__GAUZE__ABSTRACT = function (field) {
	function convert(row) {
		row[field] = new Date(row[field]);
		return row;
	}
	return {
		create: convert,
		read: convert,
		update: convert,
		delete: convert,
		count: convert
	};
};

export { CREATED_AT__DESERIALIZER__GAUZE__ABSTRACT, UPDATED_AT__DESERIALIZER__GAUZE__ABSTRACT, DELETED_AT__DESERIALIZER__GAUZE__ABSTRACT };
