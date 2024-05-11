import React from "react";

// import pure function component and do state binding
export default function Amber() {
	const id = "unit:amber";
	return (
		<div id={id} key={id}>
			Amber
			{/* render a pure function component here */}
		</div>
	);
}
