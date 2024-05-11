import React from "react";
import { useState } from "react";

export default function SignOut({ router, gauze, model }) {
	return (
		<div>
			<div>Sign Out</div>
			<div>
				<a href={router.buildUrl("environment.signin", {})}>Sign In</a>
				<a href={router.buildUrl("environment.signup", {})}>Sign Up</a>
			</div>
		</div>
	);
}
