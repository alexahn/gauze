import React from "react";
import { useState } from "react";

export default function Header({ router, gauze, model }) {
	const [submitHeader, setSubmitHeader] = useState(false);
	const [error, setError] = useState("");

	const headers = model.all("HEADER");

	return (
		<div>
			<div>Header List</div>
			<hr />
			{headers.map(function (header, index) {
				return (
					<div key={header.name} className="truncate-ns">
						<a href={router.buildUrl("system.types.list.type", { type: header.name })}>{header.graphql_meta_type}</a>
					</div>
				);
			})}
			<label>{error}</label>
		</div>
	);
}
