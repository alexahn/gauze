import * as React from "react";
import { useState } from "react";

function Proxies({ pathfinder, services, proxies, next }) {
	const { gauze } = services
	// render each proxy as a button
	// on click use gauze service to enter system session
	// on success, redirect to next
    return (
		<div>
			<h2>Proxies</h2>
			{proxies.map(function (proxy) {
				return (<div>{proxy._metadata.id}</div>)
			})}
		</div>
    );
}

export default Proxies
