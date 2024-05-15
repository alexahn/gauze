import React from "react";

export default function Anaconda({ sections, units }) {
	const id = "layout:anaconda";
	return (
		<div id={id} key={id} className="flex justify-center">
			<div className="flex w-100 mw9">
				<div className="fl w-20 pa4">
					<sections.left units={units.left} />
				</div>
				<div className="fl w-80 pa4">
					<sections.right units={units.right} />
				</div>
			</div>
		</div>
	);
}
