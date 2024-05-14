import React from "react";

export default function Anaconda({ sections, units }) {
	const id = "layout:anaconda";
	return (
		<div id={id} key={id} className="flex justify-center w-100">
			<div className="w-100 mw8">
				<div className="fl w-third pa2">
					<sections.left units={units.left} />
				</div>
				<div className="fl w-two-thirds pa2">
					<sections.right units={units.right} />
				</div>
			</div>
		</div>
	);
}
