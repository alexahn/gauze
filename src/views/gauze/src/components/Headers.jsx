import * as React from "react";
import { useState } from "react";

import Link from "./Link.jsx";

function Headers({ pathfinder, headers }) {
	const buttonClass = "clouds w-100 ba bw1 br2 truncate-ns mb1 f6 athelas bgx2 bdx2 cx6 bgx3h bdx3h cx6h truncate-ns mw4";
	const buttonActiveClass = "clouds w-100 ba bw1 br2 truncate-ns mb1 f6 athelas bgx3 bdx3 cx6 bgx3h bdx3h cx6h truncate-ns mw4";
	const sectionButtonClass = "clouds w-100 ba bw1 br2 truncate-ns mb1 f6 athelas bgx3 bdx3 cx6 bgx4h bdx4h cx6h truncate-ns mw4";
	const sectionButtonActiveClass = "clouds w-100 ba bw1 br2 truncate-ns mb1 f6 athelas bgx4 bdx4 cx6 bgx4h bdx4h cx6h truncate-ns mw4";
	const separatorClass = "clouds athelas cx2 f7 mt2 mb1 w-100 mw4 tc";
	const state = pathfinder.URLToState(location.href);
	const proxyURL = pathfinder.stateToURL("project.proxy.proxies", {}, { next: location.href });
	const isGraphActive = state.name === "project.system.headers.graph";
	return (
		<div>
			<div className="mb1">
				<Link href={proxyURL} push={true}>
					<button className={sectionButtonClass} type="button">
						Proxy
					</button>
				</Link>
			</div>
			<div className="mb2">
				<Link href={pathfinder.stateToURL("project.system.headers.graph", {}, {})} push={true}>
					<button className={isGraphActive ? sectionButtonActiveClass : sectionButtonClass} type="button">
						Graph
					</button>
				</Link>
			</div>
			<div className={separatorClass}>Entities</div>
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
