import * as $kernel from "./../../kernel/index.js";

import { MODEL__RELATIONSHIP__MODEL__DATABASE } from "./../models/relationship.js";

class RelationshipDatabaseController extends $kernel.controllers.database.DatabaseController {
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
	count(context, input) {
		const self = this;
		return self._count(context, input);
	}
}

const ROOT_CONFIG__RELATIONSHIP__CONTROLLER__DATABASE = {};
const CONFIG__RELATIONSHIP__CONTROLLER__DATABASE = {
	model: MODEL__RELATIONSHIP__MODEL__DATABASE,
	model_name: "MODEL__RELATIONSHIP__MODEL__DATABASE",
};
const CONTROLLER__RELATIONSHIP__CONTROLLER__DATABASE = new RelationshipDatabaseController(ROOT_CONFIG__RELATIONSHIP__CONTROLLER__DATABASE, CONFIG__RELATIONSHIP__CONTROLLER__DATABASE);

export { CONTROLLER__RELATIONSHIP__CONTROLLER__DATABASE };
