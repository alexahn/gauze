import * as React from "react";
import { useState } from "react";
import * as jose from "jose";

function Proxies({ pathfinder, services, proxies, next }) {
	const { gauze } = services;
	const [error, setError] = useState("");
	const [submitProxy, setSubmitProxy] = useState(false);
	let currentAgent;

	const systemJWT = gauze.default.getSystemJWT();

	if (systemJWT) {
		const decoded = jose.decodeJwt(systemJWT);
		currentAgent = decoded.agent_type;
	}

	const order = {
		gauze__agent_root: 0,
		gauze__agent_account: 1,
		gauze__agent_user: 2,
		gauze__agent_person: 3,
		gauze__agent_character: 4,
	};
	const readable = {
		gauze__agent_root: "ROOT",
		gauze__agent_account: "ACCOUNT",
		gauze__agent_user: "USER",
		gauze__agent_person: "PERSON",
		gauze__agent_character: "CHARACTER",
	};

	proxies.sort(function (a, b) {
		return order[b.attributes.gauze__proxy__agent_type] < order[a.attributes.gauze__proxy__agent_type];
	});

	function handleProxy(proxy) {
		return function (e) {
			setError("");
			setSubmitProxy(true);
			return gauze.default
				.enterSystemSession(proxy.attributes)
				.then(function (session) {
					gauze.default.setSystemJWT(session.gauze__session__value);
					setSubmitProxy(false);
					location.replace(next);
				})
				.catch(function (err) {
					setSubmitProxy(false);
					setError("Something went wrong!");
				});
		};
	}

	const errorClass = "clouds athelas bgx10 bdx10 cx7 ba br2 bw1 pa1 f6";
	const buttonClass = "clouds w-100 ba bw1 br2 truncate-ns mb1 f6 athelas";
	const classes = {
		gauze__agent_root: `${buttonClass} bgx2 bdx2 cx6 bgx3h bdx3h cx6h`,
		gauze__agent_account: `${buttonClass} bgx4 bdx4 cx6 bgx5h bdx5h cx6h`,
		gauze__agent_user: `${buttonClass} bgx6 bdx6 cxyz7 bgxyz6h bdxyz6h cx12h`,
		gauze__agent_person: `${buttonClass} bgx8 bdx8 cx6 bgx7h bdx7h`,
		gauze__agent_character: `${buttonClass} bgx10 bdx10 cx6 bgx9h bdx9h`,
	};

	// todo: disable the button for the agent that is currently active (by parsing the system jwt)
	return (
		<div>
			<hr />
			{proxies.map(function (proxy) {
				const isActive = proxy.attributes.gauze__proxy__agent_type === currentAgent;
				return (
					<form key={proxy.gauze__proxy__id} className="mb0" action={handleProxy(proxy)}>
						<button className={classes[proxy.attributes.gauze__proxy__agent_type]} style={{ opacity: isActive ? "0.25" : "1" }} type="submit" disabled={submitProxy || isActive}>
							{readable[proxy.attributes.gauze__proxy__agent_type]}
						</button>
					</form>
				);
			})}
			<div className="h1" align="center">
				<div style={{ visibility: "hidden" }}>*</div>
				{error ? <label className={errorClass}>{error}</label> : null}
			</div>
		</div>
	);
}

export default Proxies;
