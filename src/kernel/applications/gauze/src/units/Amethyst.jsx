import React from "react";

// import pure function component and do state binding
export default function Amethyst() {
	const id = "unit:amethyst";
	return (
		<div id={id} key={id}>
			Amethyst
			{/* render a pure function component here */}
		</div>
	);
}
