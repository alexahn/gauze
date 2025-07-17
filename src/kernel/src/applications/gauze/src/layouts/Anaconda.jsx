import React from "react";

export default function Anaconda({ sections, units }) {
	const id = "layout:anaconda";
	return (
		<div id={id} key={id} className="flex justify-center w-100 h-100">
			<div className="flex mw9 w-100 h-100 cf">
				<div className="fl w-20 h-100 pa4">
					<sections.left units={units.left} />
				</div>
				<div className="fl w-80 h-100 pa4">
					<sections.right units={units.right} />
				</div>
			</div>
		</div>
	);
}
