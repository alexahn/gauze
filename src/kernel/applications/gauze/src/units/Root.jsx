import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Root from "./../components/Root.jsx";

export default function RootUnit() {
	const id = "unit:root";
	return (
		<div id={id} key={id}>
			{/* render a pure function component here */}
			<Root />
		</div>
	);
}
