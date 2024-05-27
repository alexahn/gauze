import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Root from "./../components/Root.jsx";

import { v4 as uuidv4 } from "uuid";

export default function RootUnit() {
	const id = "unit:root";
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
	const gauze = useSelector(gauzeSelector);
	const route = useSelector(routeSelector);
	const router = useSelector(routerSelector);
	const render = useSelector(renderSelector);
	const model = useSelector(modelSelector);
	const rootID = uuidv4();
	return (
		<div id={id} key={id}>
			{/* render a pure function component here */}
			<Root gauze={gauze} route={route} router={router} render={render} model={model} rootID={rootID} />
		</div>
	);
}
