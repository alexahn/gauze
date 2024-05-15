import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Type from "./../components/Type.jsx";

// Ammonite hooks up the router, gauze, and model services to the Type component

export default function TypeUnit() {
	const id = "unit:type";
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
	const fields = useSelector((state) => {
		const fieldsParam = state.router.route.params.fields;
		const header = model.read("HEADER", state.router.route.params.type);
		const headerFields = header.attributes.split(" ");
		// invert
		function applyNegation(header, negated) {
			console.log("APPLYING NEGATION", negated);
			const filtered = header.slice(0);
			Object.keys(negated).forEach(function (field) {
				filtered.splice(filtered.indexOf(field), 1);
			});
			console.log("filtered", filtered);
			return filtered;
		}
		if (fieldsParam) {
			return applyNegation(headerFields, JSON.parse(decodeURIComponent(fieldsParam)));
		} else {
			return headerFields;
		}
	});
	const where = useSelector((state) => {
		const whereParam = state.router.route.params.where;
		if (whereParam) {
			return JSON.parse(decodeURIComponent(whereParam));
		} else {
			return {};
		}
	});
	return (
		<div id={id} key={id}>
			{/* render a pure function component here */}
			<Type route={route} router={router} gauze={gauze} model={model} fields={fields} where={where} />
		</div>
	);
}
