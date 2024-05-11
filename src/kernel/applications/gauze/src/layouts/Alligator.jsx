import React from "react";

// alligator shows one section
export default function Alligator({ sections, units }) {
	const id = "layout:alligator";
	return (
		<div id={id} key={id}>
			Alligator
			<sections.main units={units} />
		</div>
	);
}
