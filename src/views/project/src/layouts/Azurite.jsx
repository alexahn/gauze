import * as React from "react";

function Azurite({ children }) {
	if (Array.isArray(children)) {
		return (
			<div>
				{children[0] ? (
					<div>
						<h1>Header</h1>
						<div>{children[0]}</div>
					</div>
				) : null}
				{children[1] ? (
					<div>
						<h1>Body</h1>
						<div>{children[1]}</div>
					</div>
				) : null}
			</div>
		);
	} else {
		return (
			<div>
				<div>
					<h1>Header</h1>
					<div>{children}</div>
				</div>
			</div>
		);
	}
}

export default Azurite;
