// allows field to be set only on create
const RUD_PROTECTED__MIDDLEWARE__GAUZE__ABSTRACT = function (field) {
	return {
		create: function (attributes) {
			return attributes;
		},
		update: function (attributes) {
			delete attributes[field];
			return attributes;
		},
		read: function (attributes) {
			//delete attributes[field];
			return attributes;
		},
		delete: function (attributes) {
			delete attributes[field];
			return attributes;
		},
	};
};

const CREATED_AT_PROTECTED__MIDDLEWARE__GAUZE__ABSTRACT = function (field) {
	return {
		create: function (attributes) {
			delete attributes[field];
			return attributes;
		},
		update: function (attributes) {
			delete attributes[field];
			return attributes;
		},
		read: function (attributes) {
			//delete attributes[field];
			return attributes;
		},
		delete: function (attributes) {
			delete attributes[field];
			return attributes;
		},
	};
};

const UPDATED_AT_PROTECTED__MIDDLEWARE__GAUZE__ABSTRACT = function (field) {
	return {
		create: function (attributes) {
			delete attributes[field];
			return attributes;
		},
		update: function (attributes) {
			delete attributes[field];
			return attributes;
		},
		read: function (attributes) {
			//delete attributes[field];
			return attributes;
		},
		delete: function (attributes) {
			delete attributes[field];
			return attributes;
		},
	};
};

const DELETED_AT_PROTECTED__MIDDLEWARE__GAUZE__ABSTRACT = function (field) {
	return {
		create: function (attributes) {
			delete attributes[field];
			return attributes;
		},
		update: function (attributes) {
			delete attributes[field];
			return attributes;
		},
		read: function (attributes) {
			//delete attributes[field];
			return attributes;
		},
		delete: function (attributes) {
			delete attributes[field];
			return attributes;
		},
	};
};

export {
	RUD_PROTECTED__MIDDLEWARE__GAUZE__ABSTRACT,
	CREATED_AT_PROTECTED__MIDDLEWARE__GAUZE__ABSTRACT,
	UPDATED_AT_PROTECTED__MIDDLEWARE__GAUZE__ABSTRACT,
	DELETED_AT_PROTECTED__MIDDLEWARE__GAUZE__ABSTRACT,
};
