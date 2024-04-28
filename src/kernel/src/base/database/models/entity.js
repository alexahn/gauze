import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";
import * as $kernel from "./../../kernel/index.js";

class ba381b0cc764c4c9a187b716ae94ed96DatabaseModel extends $kernel.models.database.DatabaseModel {
	constructor(root_config, config) {
		super(root_config, config);
		const self = this;
	}
	create(context, input) {
		const self = this;
		return self._create(context, input);
	}
	read(context, input) {
		const self = this;
		return self._read(context, input);
	}
	update(context, input) {
		const self = this;
		return self._update(context, input);
	}
	delete(context, input) {
		const self = this;
		return self._delete(context, input);
	}
}

const cd637bc32c364580be5cc28396d3dee8_MODEL_DATABASE_ROOT_CONFIG = {
	entity: $abstract.entities.a2b8dbc3427b41a9899e11671c2422c7.default($abstract),
	entity_name: "$abstract.entities.a2b8dbc3427b41a9899e11671c2422c7.default",
};
const cd637bc32c364580be5cc28396d3dee8_MODEL_DATABASE_CONFIG = {
	table_name: $structure.a2b8dbc3427b41a9899e11671c2422c7.database.sql.TABLE_NAME__SQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
	primary_key: $structure.a2b8dbc3427b41a9899e11671c2422c7.database.sql.PRIMARY_KEY__SQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
};
const cd637bc32c364580be5cc28396d3dee8_MODEL_DATABASE = new ba381b0cc764c4c9a187b716ae94ed96DatabaseModel(
	cd637bc32c364580be5cc28396d3dee8_MODEL_DATABASE_ROOT_CONFIG,
	cd637bc32c364580be5cc28396d3dee8_MODEL_DATABASE_CONFIG,
);

export { cd637bc32c364580be5cc28396d3dee8_MODEL_DATABASE };
