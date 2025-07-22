import React from "react";

// alligator shows one section
export default function Alligator({ sections, units }) {
	const id = "layout:alligator";
	return (
		<div id={id} key={id} className="flex justify-center w-100">
			<div className="flex cf mw9 w-100 flex-column">
				<div className="fl w-100 pa4 pb2">
					<sections.top units={units.top} />
				</div>
				{/*
				<div className="fl w-100 pa4">
					<hr />
				</div>
				*/}
				<div className="fl w-100 pl4 pr4">
					<sections.bottom units={units.bottom} />
				</div>
			</div>
		</div>
	);
}
