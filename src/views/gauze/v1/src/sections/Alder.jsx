import React from "react";

// alder displays one thing
export default function Alder({ units }) {
	const id = "section:alder";
	return (
		<div id={id} key={id} className="w-100 h-100">
			<units.body />
		</div>
	);
}
