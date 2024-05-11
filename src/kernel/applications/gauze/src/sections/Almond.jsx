import React from "react";

export default function Almond({ units }) {
	const id = "section:almond";
	return (
		<div id={id} key={id}>
			Almond
			<units.header />
			<units.body />
		</div>
	);
}
