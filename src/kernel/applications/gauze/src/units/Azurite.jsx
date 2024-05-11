import React from "react";
import { useDispatch, useSelector } from "react-redux";

// Azurite is currently empty

export default function Azurite() {
	const id = "unit:azurite";
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
			Azurite
			{/* render a pure function component here */}
		</div>
	);
}
