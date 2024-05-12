import React from "react";

// alligator shows one section
export default function Alligator({ sections, units }) {
	const id = "layout:alligator";
	return (
		<div id={id} key={id}>
			<sections.top units={units.top} />
			<hr />
			<sections.bottom units={units.bottom} />
		</div>
	);
}
