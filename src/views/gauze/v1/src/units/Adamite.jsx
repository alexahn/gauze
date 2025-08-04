import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Banner from "./../components/Banner.jsx";

// Adamite hooks up the router, gauze, and model services to the Banner component

export default function Adamite() {
	const id = "unit:adamite";
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
			<Banner router={router} gauze={gauze} model={model} />
		</div>
	);
}
