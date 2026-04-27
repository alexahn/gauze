import * as React from "react";

import { navigate } from "@ahn/sinew";

function Link({ href, push, target, rel, children }) {
	function handleClick(e) {
		if (push && target !== "_blank") {
			e.preventDefault();
			navigate(href, {
				push: true,
				replace: false,
			});
		} else {
		}
	}
	return (
		<a href={href} target={target} rel={rel} onClick={handleClick}>
			{children}
		</a>
	);
}

export default Link;
