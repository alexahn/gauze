import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "./../components/Header.jsx";

export default function HeaderUnit() {
	const id = "unit:header";
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
			<Header router={router} gauze={gauze} model={model} />
		</div>
	);
}
