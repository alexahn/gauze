import React from "react";

export default function Almond({ units }) {
	const id = "section:almond";
	return (
		<div id={id} key={id}>
			<units.header />
			<hr />
			<units.body />
		</div>
	);
}
