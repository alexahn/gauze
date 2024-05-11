import React from "react";
import { useDispatch, useSelector } from "react-redux";

import SignUp from "./../components/signup.jsx";

// Amethyst hooks up the router, gauze, and model services to the SignUp component

export default function Amethyst() {
	const id = "unit:amethyst";
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
			Amethyst
			{/* render a pure function component here */}
			<SignUp router={router} gauze={gauze} model={model} />
		</div>
	);
}
