import React from "react";
import { useDispatch, useSelector } from "react-redux";

import SignUp from "./../components/SignUp.jsx";

// Amethyst hooks up the router, gauze, and model services to the SignUp component

export default function Amethyst() {
	const id = "unit:amethyst";
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
			<SignUp router={router} gauze={gauze} model={model} />
		</div>
	);
}
