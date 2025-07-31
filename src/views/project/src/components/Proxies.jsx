import * as React from "react";
import { useState } from "react";

function Proxies({ pathfinder, services, proxies, next }) {
	const { gauze } = services;
	const [submitProxy, setSubmitProxy] = useState(false);
	function handleProxy(proxy) {
		return function (e) {
			setSubmitProxy(true);
			return gauze.default
				.enterSystemSession(proxy.attributes)
				.then(function (session) {
					console.log("system session", session);
					gauze.default.setSystemJWT(session.gauze__session__value);
					setSubmitProxy(false);
					location.replace(next);
				})
				.catch(function (err) {
					setSubmitProxy(false);
				});
		};
	}
	return (
		<div>
			<h2>Proxies</h2>
			{proxies.map(function (proxy) {
				return <button onClick={handleProxy(proxy)}>{proxy._metadata.id}</button>;
			})}
		</div>
	);
}

export default Proxies;
