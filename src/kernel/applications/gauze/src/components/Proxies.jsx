import React from "react";
import { useState } from "react";

export default function Proxies({ router, gauze, model }) {
	const [submitProxy, setSubmitProxy] = useState(false);
	const [error, setError] = useState("");

	const proxies = model.all("PROXY");

	function handleProxy(proxy) {
		return function (e) {
			e.preventDefault();
			setError("");
			const form = e.target;
			const formData = new FormData(form);
			const formJSON = Object.fromEntries(formData.entries());
			setSubmitProxy(true);
			// async call
			// check if we have a system session for the proxy
			// if not, create one
			const sessions = model.all("SESSION").filter(function (session) {
				return session.gauze__session__agent_type === proxy.gauze__proxy__agent_type && session.gauze__session__agent_id === proxy.gauze__proxy__agent_id;
			});
			if (sessions && sessions.length) {
				const session = sessions[0];
				setSubmitProxy(false);
				gauze.setSystemJWT(session.gauze__session__value);
				router.navigate("system.types", {}, {});
			} else {
				return gauze.proxyEnterSession(proxy).then(function (session) {
					setSubmitProxy(false);
					gauze.setSystemJWT(session.gauze__session__value);
					console.log("proxy", session);
					model.create("SESSION", session.gauze__session__id, session);
					// use router here to do a redirect
					router.navigate("system.types", {}, {});
				});
			}
		};
	}
	return (
		<div>
			<div>Proxy List</div>
			<hr />
			{proxies.map(function (proxy, index) {
				return (
					<form key={proxy.gauze__proxy__id} method="post" onSubmit={handleProxy(proxy)}>
						<label>
							{proxy.gauze__proxy__agent_type}: {proxy.gauze__proxy__agent_id}
						</label>
						<button type="submit" disabled={submitProxy}>
							Enter
						</button>
					</form>
				);
			})}
			<label>{error}</label>
		</div>
	);
}
