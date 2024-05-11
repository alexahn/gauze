import React from "react";

export default function Alligator({ sections, units }) {
	const id = "layout:alligator";
	return (
		<div id={id} key={id}>
			Alligator
			<sections.top units={units} />
			<sections.bottom units={units} />
		</div>
	);
}
