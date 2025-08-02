import * as React from "react";
import { useState } from "react";

function Headers({ pathfinder, headers }) {
	const [submitHeader, setSubmitHeader] = useState(false);
	const buttonClass = "clouds w-100 ba bw1 br2 truncate-ns mb1 f6 athelas bgx2 bdx2 cx6 bgx3h bdx3h cx6h truncate-ns mw4";
	function handleHeader(header) {
		return function (e) {
			setSubmitHeader(true);
			console.log("handling", header);
			setSubmitHeader(false);
		};
	}
	return (
		<div>
			{headers.map(function (header) {
				return (
					<div key={header.name} className="mb0">
						<a href={pathfinder.stateToURL("project.system.headers.header.list", { header: header.graphql_meta_type.toLowerCase() }, {})}>
							<button className={buttonClass} type="button" disabled={submitHeader}>
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
