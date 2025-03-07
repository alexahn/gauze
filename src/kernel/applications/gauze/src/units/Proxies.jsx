import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Proxies from "./../components/Proxies.jsx";

// Ammonite hooks up the router, gauze, and model services to the Proxies component

export default function ProxiesUnit() {
	const id = "unit:proxies";
	const route = useSelector((state) => {
		return state.router.route;
	});
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
			<Proxies route={route} router={router} gauze={gauze} model={model} />
		</div>
	);
}
