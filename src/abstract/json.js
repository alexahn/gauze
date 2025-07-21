import * as gauze_scalars from "./gauze/types/graphql/scalars/index.js";
import * as project_scalars from "./project/types/graphql/scalars/index.js";

// note: replacer is a formality that should only be used in tests
// note: every parsed graphql type value should have a toJSON method
// note: the output from toJSON should align with the output from the scalar serialize method
// todo: remove this function
const REPLACER__JSON__ABSTRACT = function (key, value) {
	Object.values(gauze_scalars).forEach(function (module) {
		Object.values(module).forEach(function (scalar) {
			// use .match_value
			if (scalar.match_value(value)) {
				return scalar.serialize(value);
			}
		});
	});
	return value;
};

export { REPLACER__JSON__ABSTRACT };
