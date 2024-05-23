import React from "react";

export default function Albatross({ sections, units }) {
	const id = "layout:albatross";
	return (
		<div id={id} key={id} className="w-100 h-100">
			{/*
			<div className="flex w-100 h-100 flex-column">
				<div className="h3 w-100">
					<sections.top units={units.top} />
				</div>
				<div className="h-100 w-100">
					<sections.bottom units={units.bottom} />
				</div>
			</div>
			*/}
			<sections.bottom units={units.bottom} />
		</div>
	);
}
