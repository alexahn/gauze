import * as React from "react";
import { useState } from "react";

import { navigate } from "./../router.js";

function SignOut({ pathfinder, services, next }) {
	const { gauze } = services;
	const [error, setError] = useState("");
	const [submitSignOut, setSubmitSignOut] = useState(false);
	function handleSignOut(formData) {
		// signout
		setError("");
		setSubmitSignOut(true);
		return gauze.default
			.signOut()
			.then(function (sessions) {
				setSubmitSignOut(false);
				// sessions are signed out sessions
				gauze.default.deleteEnvironmentJWT();
				gauze.default.deleteProxyJWT();
				gauze.default.deleteSystemJWT();
				// redirect to next
				navigate(next, {
					push: true,
					replace: true,
					pathfinder: pathfinder,
				});
			})
			.catch(function (err) {
				setSubmitSignOut(false);
				setError("Something went wrong!");
			});
	}
	const buttonClass = "clouds athelas bgx10 bdx10 bgx9h bdx9h ba br2 bw1 cx6 w-100 f6";
	const errorClass = "clouds athelas bgx10 bdx10 cx7 ba br2 bw1 pa1 f6";
	return (
		<form action={handleSignOut}>
			<hr />
			<button className={buttonClass} type="submit" disabled={submitSignOut}>
				Sign Out
			</button>
			<div className="h1" align="center">
				<div style={{ visibility: "hidden" }}>*</div>
				{error ? <label className={errorClass}>{error}</label> : null}
			</div>
		</form>
	);
}

export default SignOut;
