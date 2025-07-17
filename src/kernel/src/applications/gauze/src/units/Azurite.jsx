import React from "react";
import { useDispatch, useSelector } from "react-redux";

// Azurite is currently empty

export default function Azurite() {
	const id = "unit:azurite";
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
		</div>
	);
}
