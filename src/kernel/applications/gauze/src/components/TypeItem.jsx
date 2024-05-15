import React from "react";
import { useState } from "react";

export default function TypeItem({ router, route, gauze, model }) {
	const header = model.read("HEADER", route.params.type);
	const headerFields = header.attributes.split(" ");

	return (
		<div className="mw-100 fr">
			<h1 align="right">{header.graphql_meta_type}</h1>
			<div align="right">Type Item</div>
			<hr />
		</div>
	);
}
