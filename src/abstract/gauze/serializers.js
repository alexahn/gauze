function preserve(attributes) {
	return attributes;
}

const CREATED_AT__SERIALIZER__GAUZE__ABSTRACT = function (field) {
	return {
		create: function (attributes) {
			attributes[field] = new Date();
			return attributes;
		},
		read: preserve,
		update: preserve,
		delete: preserve,
	};
};

const UPDATED_AT__SERIALIZER__GAUZE__ABSTRACT = function (field) {
	return {
		create: function (attributes) {
			attributes[field] = new Date();
			return attributes;
		},
		read: preserve,
		update: function (attributes) {
			attributes[field] = new Date();
			return attributes;
		},
		delete: preserve,
	};
};

const DELETED_AT__SERIALIZER__GAUZE__ABSTRACT = function (field) {
	return {
		create: preserve,
		read: preserve,
		update: preserve,
		delete: function (attributes) {
			attributes[field] = new Date();
			return attributes;
		},
	};
};

export { CREATED_AT__SERIALIZER__GAUZE__ABSTRACT, UPDATED_AT__SERIALIZER__GAUZE__ABSTRACT, DELETED_AT__SERIALIZER__GAUZE__ABSTRACT };
