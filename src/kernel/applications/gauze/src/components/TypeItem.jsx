import React from "react";
import { useState } from "react";

export default function TypeItem({ router, route, gauze, model }) {
	const header = model.read("HEADER", route.params.type);
	const headerFields = header.attributes.split(" ");
	const item = model.read(header.graphql_meta_type, route.params.id);

	// update this mapping when we add more types to $abstract
	const graphQLTypeToInputType = {
		Date: "datetime-local",
		String: "text",
	};
	const serializeGraphQLTypeToInputType = {
		Date: function (v) {
			const d = new Date(v).toISOString();
			return d.slice(0, 16);
		},
		String: function (v) {
			return v;
		},
	};
	return (
		<div className="mw-100 fr">
			<h1 align="right">{header.graphql_meta_type}</h1>
			<div align="right">Type Item</div>
			<hr />
			{header.fields.map(function (field) {
				return (
					<div>
						<div>{field.name}</div>
						<div>
							<input
								type={graphQLTypeToInputType[field.graphql_type.name]}
								defaultValue={serializeGraphQLTypeToInputType[field.graphql_type.name](item[field.name])}
								disabled={route.params.mode !== "edit"}
							/>
						</div>
					</div>
				);
			})}
		</div>
	);
}
