import * as React from "react";
import { useState } from "react";

function SignOut({ pathfinder, services, next }) {
	const { gauze } = services
	console.log("gauze", gauze.default)
	const [submitSignOut, setSubmitSignOut] = useState(false)
	function handleSignOut(formData) {
		// signout
		return gauze.default.signOut().then(function (sessions) {
			// sessions are signed out sessions
			gauze.default.deleteEnvironmentJWT()
			gauze.default.deleteProxyJWT()
			gauze.default.deleteSystemJWT()
			// redirect to next
			location.replace(next)
		})
	}
    return (
		<form action={handleSignOut}>
			<button type="submit" disabled={submitSignOut}>Sign Out</button>
		</form>
    );
}

export default SignOut
