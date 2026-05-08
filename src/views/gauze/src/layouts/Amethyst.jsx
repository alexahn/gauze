import * as React from "react";

function Amethyst({ children }) {
	const id = "layout:amethyst";
	let header;
	let body;
	if (Array.isArray(children)) {
		header = children[0];
		body = children[1];
	} else {
		header = children;
		body = null;
	}
	return (
		<div id={id} key={id}>
			{header}
			{body}
		</div>
	);
}

export default Amethyst;
