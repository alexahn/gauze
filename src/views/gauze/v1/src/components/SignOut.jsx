import React from "react";
import { useState } from "react";

export default function SignOut({ router, gauze, model }) {
	const [submitSignOut, setSubmitSignOut] = useState(false);
	const [error, setError] = useState("");
	function handleSignOut(e) {
		e.preventDefault();
		setError("");
		setSubmitSignOut(true);
		return gauze
			.signOut()
			.then(function (sessions) {
				setSubmitSignOut(false);
				// delete all the sessions from the model store
				const environmentJWT = gauze.getEnvironmentJWT();
				const systemJWT = gauze.getSystemJWT();
				const proxyJWT = gauze.getProxyJWT();
				sessions.forEach(function (session) {
					model.delete("SESSION", session.gauze__session__id);
					if (environmentJWT === session.gauze__session__value) {
						gauze.deleteEnvironmentJWT();
					}
					if (systemJWT === session.gauze__session__value) {
						gauze.deleteSystemJWT();
					}
					if (proxyJWT === session.gauze__session__value) {
						gauze.deleteProxyJWT();
					}
				});
				// all jwts should be cleared technically
				// navigate to signin
				router.navigate("environment.signin", {}, { replace: true });
			})
			.catch(function (err) {
				setSubmitSignOut(false);
				setError("Something went wrong!");
			});
	}
	const buttonClass = "clouds athelas bgx10 bdx10 bgx9h bdx9h ba br2 bw1 cx6 w-100 f6";
	return (
		<div>
			{/*<div>Sign Out</div>*/}
			<hr />
			<form method="post" onSubmit={handleSignOut}>
				<button className={buttonClass} type="submit" disabled={submitSignOut}>
					Sign Out
				</button>
			</form>
		</div>
	);
}
