import React from "react";

import Box from "@mui/material/Box";

export default function Almond({ units }) {
	const id = "section:almond";
	return (
		<div id={id} key={id}>
			<units.header />
			<hr />
			<Box sx={{ overflow: "auto" }}>
				<units.body />
			</Box>
		</div>
	);
}
