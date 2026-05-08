import * as React from "react";

function Azurite({ children }) {
	const id = "layout:azurite";
	let header;
	let body;
	if (Array.isArray(children)) {
		header = children[0];
		body = children[1];
	} else {
		header = children;
		body = null;
	}
	return (
		<div id={id} key={id} className="flex bgx12 justify-center w-100 h-100 items-center">
			<div className="circle-border" style={{ zIndex: 4 }}>
				<div className="clouds flex cf mw6 w-100 flex-column bgxyz7 bdx6 cx12 br3 ba bw2" style={{ zIndex: 3 }}>
					<div className="fl w-100 pa4 pb2">{header}</div>
					<div className="fl w-100 pl4 pr4 pb5">{body}</div>
				</div>
			</div>
		</div>
	);
}

export default Azurite;
