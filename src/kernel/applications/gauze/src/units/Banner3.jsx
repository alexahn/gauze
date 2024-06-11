import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Banner3 from "./../components/Banner3.jsx";

// Banner3 hooks up the router, gauze, and model services to the Banner3 component

export default function Banner3Unit() {
	const id = "unit:banner3";
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
			<Banner3 router={router} gauze={gauze} model={model} />
		</div>
	);
}
