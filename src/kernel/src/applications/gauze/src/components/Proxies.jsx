import React from "react";
import { useState } from "react";

import * as jose from "jose";

export default function Proxies({ route, router, gauze, model }) {
	const [submitProxy, setSubmitProxy] = useState(false);
	const [error, setError] = useState("");

	const order = {
		gauze__agent_root: 0,
		gauze__agent_account: 1,
		gauze__agent_user: 2,
		gauze__agent_person: 3,
		gauze__agent_character: 4,
	};

	const proxies = model.all("PROXY").sort(function (a, b) {
		return order[b.gauze__proxy__agent_type] < order[a.gauze__proxy__agent_type];
	});

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
			const sessions = model
				.all("SESSION")
				.filter(function (session) {
					return session.gauze__session__agent_type === proxy.gauze__proxy__agent_type && session.gauze__session__agent_id === proxy.gauze__proxy__agent_id;
				})
				.filter(function (session) {
					const now = new Date().getTime() / 1000;
					const decoded = jose.decodeJwt(session.gauze__session__value);
					return now < decoded.exp;
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
						router.navigate("system.graph.space", { space: "home" }, {});
					}
				} else {
					router.navigate("system.graph.space", { space: "home" }, {});
				}
			} else {
				return gauze.proxyEnterSession(proxy).then(function (session) {
					setSubmitProxy(false);
					model.create("SESSION", session.gauze__session__id, session);
					gauze.setSystemJWT(session.gauze__session__value);
					// router navigate
					if (route.params && route.params.next) {
						const matched = router.matchUrl(route.params.next);
						if (matched) {
							router.navigate(matched.name, matched.params);
						} else {
							router.navigate("system.graph.space", { space: "home" }, {});
						}
					} else {
						router.navigate("system.graph.space", { space: "home" }, {});
					}
				});
			}
		};
	}
	const buttonClass = "clouds w-100 ba bw1 br2 truncate-ns mb1 f6 athelas";
	const classes = {
		gauze__agent_root: `${buttonClass} bgx2 bdx2 cx6 bgx3h bdx3h cx6h`,
		gauze__agent_account: `${buttonClass} bgx4 bdx4 cx6 bgx5h bdx5h cx6h`,
		gauze__agent_user: `${buttonClass} bgx6 bdx6 cxyz7 bgxyz6h bdxyz6h cx12h`,
		gauze__agent_person: `${buttonClass} bgx8 bdx8 cx6 bgx7h bdx7h`,
		gauze__agent_character: `${buttonClass} bgx10 bdx10 cx6 bgx9h bdx9h`,
	};
	return (
		<div>
			{/*<div>Proxy List</div>*/}
			<hr />
			{proxies.map(function (proxy, index) {
				return (
					<form key={proxy.gauze__proxy__id} method="post" className="mb0" onSubmit={handleProxy(proxy)}>
						<button className={classes[proxy.gauze__proxy__agent_type]} type="submit" disabled={submitProxy}>
							{readable[proxy.gauze__proxy__agent_type]}
						</button>
					</form>
				);
			})}
			<label>{error}</label>
		</div>
	);
}
