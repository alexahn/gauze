import React from "react";

import Container from "@mui/material/Container";

// alligator shows one section
export default function Alligator({ sections, units }) {
	const id = "layout:alligator";
	return (
		<Container fixed>
			<div id={id} key={id}>
				<sections.top units={units.top} />
				<hr />
				<sections.bottom units={units.bottom} />
			</div>
		</Container>
	);
}
