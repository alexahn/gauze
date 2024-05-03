import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";
import * as $kernel from "./../../kernel/index.js";

class ba381b0cc764c4c9a187b716ae94ed96DatabaseModel extends $kernel.models.database.DatabaseModel {
	constructor(root_config, config) {
		super(root_config, config);
		const self = this;
	}
	create(context, parameters) {
		const self = this;
		return self._create(context, parameters);
	}
	read(context, parameters) {
		const self = this;
		return self._read(context, parameters);
	}
	update(context, parameters) {
		const self = this;
		return self._update(context, parameters);
	}
	delete(context, parameters) {
		const self = this;
		return self._delete(context, parameters);
	}
}

const ROOT_CONFIG__cd637bc32c364580be5cc28396d3dee8__MODEL__DATABASE = {
	entity: $abstract.entities.a2b8dbc3427b41a9899e11671c2422c7.default($abstract),
	entity_name: "$abstract.entities.a2b8dbc3427b41a9899e11671c2422c7.default",
};
const CONFIG__cd637bc32c364580be5cc28396d3dee8__MODEL__DATABASE = {
	table_name: $structure.entities.a2b8dbc3427b41a9899e11671c2422c7.database.sql.TABLE_NAME__SQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
	primary_key: $structure.entities.a2b8dbc3427b41a9899e11671c2422c7.database.sql.PRIMARY_KEY__SQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
};
const MODEL__cd637bc32c364580be5cc28396d3dee8__MODEL__DATABASE = new ba381b0cc764c4c9a187b716ae94ed96DatabaseModel(
	ROOT_CONFIG__cd637bc32c364580be5cc28396d3dee8__MODEL__DATABASE,
	CONFIG__cd637bc32c364580be5cc28396d3dee8__MODEL__DATABASE,
);

export { MODEL__cd637bc32c364580be5cc28396d3dee8__MODEL__DATABASE };
