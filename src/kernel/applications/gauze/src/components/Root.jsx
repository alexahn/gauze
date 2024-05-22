import React from "react";
import { useState } from "react";

import PanAndZoom from "./PanAndZoom.jsx";

export default function Root({ gauze, model, router }) {
	const children = (
		<div className="pa2">
			<h1>Root</h1>
			<input className="pl1 pr1" />
			<h1>Test</h1>
		</div>
	);
	return (
		<div className="mw-100 mh-100 h-100 w-100">
			<PanAndZoom children={children} />
		</div>
	);
}
