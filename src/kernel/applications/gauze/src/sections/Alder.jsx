import React from "react";

export default function Alder({ units }) {
	const id = "section:alder";
	return (
		<div id={id} key={id}>
			Alder
			<units.header />
			<units.body />
		</div>
	);
}
