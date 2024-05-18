import React from "react";
import { useState } from "react";

export default function Proxies({ route, router, gauze, model }) {
	const [submitProxy, setSubmitProxy] = useState(false);
	const [error, setError] = useState("");

	const proxies = model.all("PROXY");

	const readable = {
		gauze__agent_root: "ROOT",
		gauze__agent_account: "ACCOUNT",
		gauze__agent_user: "USER",
		gauze__agent_person: "PERSON",
		gauze__agent_character: "CHARACTER",
	};
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
				// route navigate
				if (route.params && route.params.next) {
					const matched = router.matchUrl(route.params.next);
					if (matched) {
						router.navigate(matched.name, matched.params);
					} else {
						router.navigate("system.types", {}, {});
					}
				} else {
					router.navigate("system.types", {}, {});
				}
			} else {
				return gauze.proxyEnterSession(proxy).then(function (session) {
					setSubmitProxy(false);
					gauze.setSystemJWT(session.gauze__session__value);
					model.create("SESSION", session.gauze__session__id, session);
					// router navigate
					if (route.params && route.params.next) {
						const matched = router.matchUrl(route.params.next);
						if (matched) {
							router.navigate(matched.name, matched.params);
						} else {
							router.navigate("system.types", {}, {});
						}
					} else {
						router.navigate("system.types", {}, {});
					}
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
					<form key={proxy.gauze__proxy__id} method="post" className="mb0" onSubmit={handleProxy(proxy)}>
						<button type="submit" className="w4 truncate-ns" disabled={submitProxy}>
							{readable[proxy.gauze__proxy__agent_type]}
						</button>
					</form>
				);
			})}
			<label>{error}</label>
		</div>
	);
}
