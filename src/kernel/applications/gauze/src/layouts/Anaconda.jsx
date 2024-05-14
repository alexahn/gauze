import React from "react";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";

export default function Anaconda({ sections, units }) {
	const id = "layout:anaconda";
	return (
		<Container fixed>
			<div id={id} key={id}>
				<Box>
					<Grid container spacing={2}>
						<Grid xs={3}>
							<sections.left units={units.left} />
						</Grid>

						<Grid xs={9}>
							<sections.right units={units.right} />
						</Grid>
					</Grid>
				</Box>
			</div>
		</Container>
	);
}
