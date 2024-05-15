import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

import TypeList from "./../components/TypeList.jsx";

// TypeListUnit hooks up the router, gauze, and model services to the TypeList component

export default function TypeListUnit() {
	const id = "unit:type";
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
	const whereSelector = createSelector([routeSelector], (route) => {
		const whereParam = route.params.where;
		if (whereParam) {
			return JSON.parse(decodeURIComponent(whereParam));
		} else {
			return {};
		}
	});
	const route = useSelector(routeSelector);
	const router = useSelector(routerSelector);
	const model = useSelector(modelSelector);
	const gauze = useSelector(gauzeSelector);
	const fields = useSelector((state) => {
		return fieldsSelector(state);
	});
	const where = useSelector((state) => {
		return whereSelector(state);
	});
	return (
		<div id={id} key={id}>
			{/* render a pure function component here */}
			<TypeList route={route} router={router} gauze={gauze} model={model} fields={fields} where={where} />
		</div>
	);
}
