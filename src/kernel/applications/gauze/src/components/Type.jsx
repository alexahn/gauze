import React from "react";
import { useState } from "react";

export default function Type({ route, router, gauze, model }) {
	const header = model.read("HEADER", route.params.type);
	// use pagination record once we implement it
	const items = model.all(header.type);
	const fields = header.attributes.split(" ");
	console.log("fields", fields);
	return (
		<div>
			<div>Type</div>
			<hr />
			<div>
				{items.map(function (item) {
					return (
						<div key={item[header.primary_key]}>
							{fields.map(function (field) {
								return (
									<div key={field}>
										{field}: {item[field]}
									</div>
								);
							})}
						</div>
					);
				})}
			</div>
		</div>
	);
}
