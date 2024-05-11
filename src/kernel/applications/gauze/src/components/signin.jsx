import React from "react";
import { useState } from "react";

export default function SignIn({ router, gauze, model }) {
	const [step, setStep] = useState(0);
	const requirements = ["person.assert.email", "account.verify.password"];
	// have a switch here based on the requirements as a very simple implementation for the flow
	function handleSubmit() {
		setStep(step + 1);
	}
	if (step === 0) {
		return (
			<div>
				<div>Sign In</div>
				<div>
					Email
					<input />
					<button onClick={handleSubmit}>Next</button>
				</div>
			</div>
		);
	} else if (step === 1) {
		return (
			<div>
				<div>Sign In</div>
				<div>
					Password
					<input />
					<button onClick={handleSubmit}>Next</button>
				</div>
			</div>
		);
	} else if (step === 2) {
		return (
			<div>
				<div>Sign In</div>
				<div>Signing In!</div>
			</div>
		);
	} else {
		return <div>Something went wrong!</div>;
	}
}
