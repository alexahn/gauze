import React from "react";
import { useDispatch, useSelector } from "react-redux";

import SignIn from "./../components/SignIn.jsx";

// Amber hooks up the router, gauze, and model services to the SignIn component

export default function Amber() {
	const id = "unit:amber";
	/*
	const { router, model, gauze } = useSelector((state) => {
		const { router, model, gauze } = state.services;
		return {
			router: router.default,
			model: model.default,
			gauze: gauze.default,
		};
	});
	*/
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
			<SignIn route={route} router={router} gauze={gauze} model={model} />
		</div>
	);
}
