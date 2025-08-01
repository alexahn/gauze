import * as React from "react";
import { useState } from "react";

function Proxies({ pathfinder, services, proxies, next }) {
	const { gauze } = services;
	const [submitProxy, setSubmitProxy] = useState(false);
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
			<hr />
			{proxies.map(function (proxy) {
				return (
                    <form key={proxy.gauze__proxy__id} className="mb0" action={handleProxy(proxy)}>
                        <button className={classes[proxy.attributes.gauze__proxy__agent_type]} type="submit" disabled={submitProxy}>
                            {readable[proxy.attributes.gauze__proxy__agent_type]}
                        </button>
                    </form>
				)
				//return <button onClick={handleProxy(proxy)}>{proxy._metadata.id}</button>;
			})}
		</div>
	);
}

export default Proxies;
