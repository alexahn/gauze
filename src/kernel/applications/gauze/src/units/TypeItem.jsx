import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

import TypeItem from "./../components/TypeItem.jsx";

// TypeItemUnit hooks up the router, gauze, and model services to the TypeItem component

export default function TypeItemUnit() {
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
	const route = useSelector(routeSelector);
	const router = useSelector(routerSelector);
	const model = useSelector(modelSelector);
	const gauze = useSelector(gauzeSelector);
	return (
		<div id={id} key={id}>
			{/* render a pure function component here */}
			<TypeItem route={route} router={router} gauze={gauze} model={model} />
		</div>
	);
}
