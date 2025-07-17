import React from "react";

// alpaca shows one section
export default function Alpaca({ sections, units }) {
	const id = "layout:alpaca";
	return (
		<div id={id} key={id} className="flex bgx12 justify-center w-100 h-100 items-center">
			{/*
			<div className="fixed wrapper w-100 h-100">
				<div className="one bgx1" />
				<div className="two bgx2" />
				<div className="three bgx3" />
				<div className="four bgx4" />
				<div className="five bgx5" />
				<div className="six bgx6" />
				<div className="seven bgx7" />
				<div className="eight bgx8" />
				<div className="nine bgx9" />
				<div className="ten bgx10" />
				<div className="eleven bgx11" />
				<div className="twelve bgx12" />
			</div>
			*/}
			<div className="circle-border" style={{ zIndex: 4 }}>
				<div className="clouds flex cf mw6 w-100 flex-column bgxyz7 bdx6 cx12 br3 ba bw2" style={{ zIndex: 3 }}>
					<div className="fl w-100 pa4 pb2">
						<sections.top units={units.top} />
					</div>
					<div className="fl w-100 pl4 pr4 pb5">
						<sections.bottom units={units.bottom} />
					</div>
				</div>
			</div>
		</div>
	);
}
