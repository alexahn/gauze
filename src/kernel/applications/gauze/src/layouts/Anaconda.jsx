import React from "react";

export default function Anaconda({ sections, units }) {
	const id = "layout:anaconda";
	return (
		<div id={id} key={id}>
			<sections.left units={units.left} />
			<hr />
			<sections.right units={units.right} />
		</div>
	);
}
