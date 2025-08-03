import * as React from "react";
import { useState } from "react";

function Headers({ pathfinder, headers }) {
	const buttonClass = "clouds w-100 ba bw1 br2 truncate-ns mb1 f6 athelas bgx2 bdx2 cx6 bgx3h bdx3h cx6h truncate-ns mw4";
	return (
		<div>
			{headers.map(function (header) {
				// note: default variables are where_like and limit 20
				const variables = JSON.stringify({ where_like: {}, limit: 20 });
				return (
					<div key={header.name} className="mb0">
						<a href={pathfinder.stateToURL("project.system.headers.header.list", { header: header.graphql_meta_type.toLowerCase() }, { variables })}>
							<button className={buttonClass} type="button">
								{header.graphql_meta_type}
							</button>
						</a>
					</div>
				);
			})}
		</div>
	);
}

export default Headers;
