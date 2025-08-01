import * as React from "react";
import { useState } from "react";

function Headers({ headers }) {
	const [submitHeader, setSubmitHeader] = useState(false);
	const buttonClass = "clouds w-100 ba bw1 br2 truncate-ns mb1 f6 athelas bgx2 bdx2 cx6 bgx3h bdx3h cx6h";
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
					<form key={header.name} className="mb0" action={handleHeader(header)}>
						<button className={buttonClass} type="submit" disabled={submitHeader}>
							{header.graphql_meta_type}
						</button>
					</form>
				);
			})}
		</div>
	);
}

export default Headers;
