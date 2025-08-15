import * as React from "react";
import { useState } from "react";

import Link from "./Link.jsx";

function Headers({ pathfinder, headers }) {
	const buttonClass = "clouds w-100 ba bw1 br2 truncate-ns mb1 f6 athelas bgx2 bdx2 cx6 bgx3h bdx3h cx6h truncate-ns mw4";
	const buttonActiveClass = "clouds w-100 ba bw1 br2 truncate-ns mb1 f6 athelas bgx3 bdx3 cx6 bgx3h bdx3h cx6h truncate-ns mw4";
	const state = pathfinder.URLToState(location.href);
	return (
		<div>
			{headers.map(function (header) {
				// note: default variables are where_like and limit 20
				const variables = JSON.stringify({ where_like: {}, limit: 20 });
				const isActive = state.pathParams.header === header.graphql_meta_type.toLowerCase();
				return (
					<div key={header.name} className="mb0">
						<Link href={pathfinder.stateToURL("project.system.headers.header.list", { header: header.graphql_meta_type.toLowerCase() }, { variables })} push={true}>
							<button className={isActive ? buttonActiveClass : buttonClass} type="button">
								{header.graphql_meta_type}
							</button>
						</Link>
					</div>
				);
			})}
		</div>
	);
}

export default Headers;
