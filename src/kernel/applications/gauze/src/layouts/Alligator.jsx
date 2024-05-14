import React from "react";

// alligator shows one section
export default function Alligator({ sections, units }) {
	const id = "layout:alligator";
	return (
		<div id={id} key={id} className="flex justify-center w-100">
			<div className="w-100 mw8">
				<div className="fl w-100 pa2">
					<sections.top units={units.top} />
				</div>
				<div className="fl w-100 pa2 mr2">
					<hr />
				</div>
				<div className="fl w-100 pa2">
					<sections.bottom units={units.bottom} />
				</div>
			</div>
		</div>
	);
}
