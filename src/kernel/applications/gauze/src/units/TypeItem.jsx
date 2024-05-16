import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

import TypeItem from "./../components/TypeItem.jsx";

// TypeItemUnit hooks up the router, gauze, and model services to the TypeItem component

export default function TypeItemUnit() {
	const id = "unit:type-item";
	function routeSelector(state) {
		return state.router.route;
	}
	function routerSelector(state) {
		return state.services.router.default;
	}
	function modelSelector(state) {
		return state.services.model.default;
	}
	function gauzeSelector(state) {
		return state.services.gauze.default;
	}
	const fieldsSelector = createSelector([routeSelector, routerSelector, modelSelector], (route, router, model) => {
		const fieldsParam = route.params.fields;
		const header = model.read("HEADER", route.params.type);
		const headerFields = header.attributes.split(" ");
		// invert
		function applyNegation(header, negated) {
			const filtered = header.slice(0);
			Object.keys(negated).forEach(function (field) {
				filtered.splice(filtered.indexOf(field), 1);
			});
			return filtered;
		}
		if (fieldsParam) {
			return applyNegation(headerFields, JSON.parse(decodeURIComponent(fieldsParam)));
		} else {
			return headerFields;
		}
	});
	const route = useSelector(routeSelector);
	const router = useSelector(routerSelector);
	const model = useSelector(modelSelector);
	const gauze = useSelector(gauzeSelector);
	const fields = useSelector(fieldsSelector);
	return (
		<div id={id} key={id} className="w-100 h-100">
			{/* render a pure function component here */}
			<TypeItem route={route} router={router} gauze={gauze} model={model} fields={fields} />
		</div>
	);
}
