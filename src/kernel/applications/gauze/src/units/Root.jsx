import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Root from "./../components/Root.jsx";

export default function RootUnit() {
	const id = "unit:root";
    function routeSelector(state) {
        return state.router.route;
    }
    function renderSelector(state) {
        return state.services.render.default;
    }
	const route = useSelector(routeSelector)
	const render = useSelector(renderSelector)
	return (
		<div id={id} key={id}>
			{/* render a pure function component here */}
			<Root route={route} render={render} />
		</div>
	);
}
