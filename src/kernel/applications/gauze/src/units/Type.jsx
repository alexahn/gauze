import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Type from "./../components/Type.jsx";

// Ammonite hooks up the router, gauze, and model services to the Type component

export default function TypeUnit() {
	const id = "unit:type";
	const route = useSelector((state) => {
		return state.router.route;
	});
	const router = useSelector((state) => {
		return state.services.router.default;
	});
	const model = useSelector((state) => {
		return state.services.model.default;
	});
	const gauze = useSelector((state) => {
		return state.services.gauze.default;
	});
	return (
		<div id={id} key={id}>
			{/* render a pure function component here */}
			<Type route={route} router={router} gauze={gauze} model={model} />
		</div>
	);
}
