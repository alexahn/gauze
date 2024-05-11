import React from "react";
import { useDispatch, useSelector } from "react-redux";

import SignIn from "./../components/signin.jsx";

// Amber hooks up the router, gauze, and model services to the SignIn component

export default function Amber() {
	const id = "unit:amber";
	const { router, model, gauze } = useSelector((state) => {
		const { router, model, gauze } = state.services;
		return {
			router: router.default,
			model: model.default,
			gauze: gauze.default,
		};
	});
	return (
		<div id={id} key={id}>
			Amber
			{/* render a pure function component here */}
			<SignIn router={router} gauze={gauze} model={model} />
		</div>
	);
}
