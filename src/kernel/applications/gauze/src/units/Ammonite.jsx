import React from "react";
import { useDispatch, useSelector } from "react-redux";

import SignOut from "./../components/signout.jsx";

// Ammonite hooks up the router, gauze, and model services to the SignOut component

export default function Ammonite() {
	const id = "unit:ammonite";
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
			Ammonite
			{/* render a pure function component here */}
			<SignOut router={router} gauze={gauze} model={model} />
		</div>
	);
}
