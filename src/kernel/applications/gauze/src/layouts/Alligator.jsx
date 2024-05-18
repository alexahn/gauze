import React from "react";

// alligator shows one section
export default function Alligator({ sections, units }) {
	const id = "layout:alligator";
	return (
		<div id={id} key={id} className="flex justify-center w-100">
			<div className="flex mw9 cf w-100 flex-column">
				<div className="fl w-100 pa4">
					<sections.top units={units.top} />
				</div>
				{/*
				<div className="fl w-100 pa4">
					<hr />
				</div>
				*/}
				<div className="fl w-100 pa4">
					<sections.bottom units={units.bottom} />
				</div>
			</div>
		</div>
	);
}
