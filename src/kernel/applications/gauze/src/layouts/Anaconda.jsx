import React from "react";

export default function Anaconda({ sections, units }) {
	const id = "layout:anaconda";
	return (
		<div id={id} key={id}>
			Anaconda
			<sections.left units={units} />
			<sections.right units={units} />
		</div>
	);
}
