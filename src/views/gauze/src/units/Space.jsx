import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Space from "./../components/Space.jsx";

export default function SpaceUnit() {
	const id = "unit:space";
	function gauzeSelector(state) {
		return state.services.gauze.default;
	}
	function routeSelector(state) {
		return state.router.route;
	}
	function routerSelector(state) {
		return state.services.router.default;
	}
	function renderSelector(state) {
		return state.services.render.default;
	}
	function modelSelector(state) {
		return state.services.model.default;
	}
	function graphSelector(state) {
		return state.services.graph.default;
	}
	const gauze = useSelector(gauzeSelector);
	const route = useSelector(routeSelector);
	const router = useSelector(routerSelector);
	const render = useSelector(renderSelector);
	const model = useSelector(modelSelector);
	const graph = useSelector(graphSelector);
	return (
		<div id={id} key={id}>
			<Space gauze={gauze} route={route} router={router} render={render} model={model} graph={graph} />
		</div>
	);
}
