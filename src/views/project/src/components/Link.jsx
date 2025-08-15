import * as React from "react";

import { navigate } from "@ahn/sinew";

function Link({ href, push, children }) {
	function handleClick(e) {
		if (push) {
			e.preventDefault();
			navigate(href, {
				push: true,
				replace: false,
			});
		} else {
		}
	}
	return (
		<a href={href} onClick={handleClick}>
			{children}
		</a>
	);
}

export default Link;
