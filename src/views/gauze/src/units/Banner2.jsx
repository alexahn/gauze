import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Banner2 from "./../components/Banner2.jsx";

// Banner2 hooks up the router, gauze, and model services to the Banner component

export default function Banner2Unit() {
	const id = "unit:banner2";
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
			<Banner2 router={router} gauze={gauze} model={model} />
		</div>
	);
}
