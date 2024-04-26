const CREATED_AT__SERIALIZER__GAUZE__ABSTRACT = function (field) {
	return {
		create: function (attributes) {
			attributes[field] = new Date();
			return attributes;
		},
	};
};

const UPDATED_AT__SERIALIZER__GAUZE__ABSTRACT = function (field) {
	return {
		create: function (attributes) {
			attributes[field] = new Date();
			return attributes;
		},
		update: function (attributes) {
			attributes[field] = new Date();
			return attributes;
		},
	};
};

const DELETED_AT__SERIALIZER__GAUZE__ABSTRACT = function (field) {
	return {
		delete: function (attributes) {
			attributes[field] = new Date();
			return attributes;
		},
	};
};

export { CREATED_AT__SERIALIZER__GAUZE__ABSTRACT, UPDATED_AT__SERIALIZER__GAUZE__ABSTRACT, DELETED_AT__SERIALIZER__GAUZE__ABSTRACT };
