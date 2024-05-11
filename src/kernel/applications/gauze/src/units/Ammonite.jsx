import React from "react";
import { useDispatch, useSelector } from "react-redux";

import SignOut from "./../components/signout.jsx";

// Ammonite hooks up the router, gauze, and model services to the SignOut component

export default function Ammonite() {
	const id = "unit:ammonite";
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
			Ammonite
			{/* render a pure function component here */}
			<SignOut router={router} gauze={gauze} model={model} />
		</div>
	);
}
