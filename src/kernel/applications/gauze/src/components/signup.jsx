import React from "react";
import { useState } from "react";

export default function SignUp({ router, gauze, model }) {
	const [step, setStep] = useState(0);
	const [person, setPerson] = useState({});
	const [account, setAccount] = useState({});
	const requirements = ["person.email", "account.password"];
	const [submitSignUp, setSubmitSignUp] = useState(false);
	const [error, setError] = useState("");

	// have a switch here based on the requirements as a very simple implementation for the flow
	function handleSubmitPerson(e) {
		e.preventDefault();
		setError("");
		const form = e.target;
		const formData = new FormData(form);
		const formJSON = Object.fromEntries(formData.entries());
		setPerson(formJSON);
		if (formJSON.email) {
			setStep(step + 1);
		}
	}
	function handleSubmitAccount(e) {
		e.preventDefault();
		setError("");
		const form = e.target;
		const formData = new FormData(form);
		const formJSON = Object.fromEntries(formData.entries());
		setAccount(formJSON);
		setStep(step + 1);
	}
	function handleSignUp(e) {
		e.preventDefault();
		setError("");
		const form = e.target;
		const formData = new FormData(form);
		const formJSON = Object.fromEntries(formData.entries());
		setSubmitSignUp(true);
		// async call
		return gauze
			.signUp({
				person: person,
				account: account,
			})
			.then(function (session) {
				setSubmitSignUp(false);
				gauze.setProxyJWT(session.gauze__session__value);
				model.create("SESSION", session.gauze__session__id, session);
				// use router here to do a redirect
				router.navigate("proxy.agents", {}, { replace: true });
			});
	}
	function previous() {
		if (0 < step) {
			setStep(step - 1);
		}
	}
	function next() {
		if (step < requirements.length) {
			setStep(step + 1);
		}
	}
	if (step === 0) {
		return (
			<div>
				<div>Sign Up</div>
				<hr />
				<form method="post" onSubmit={handleSubmitPerson}>
					<label>
						Email: <input name="email" defaultValue={person.email} disabled={submitSignUp} />
					</label>
					<hr />
					<button type="reset" disabled={submitSignUp}>
						Reset
					</button>
					<button type="submit" disabled={submitSignUp}>
						Next
					</button>
				</form>
				<label>{error}</label>
			</div>
		);
	} else if (step === 1) {
		return (
			<div>
				<div>Sign Up</div>
				<hr />
				<form method="post" onSubmit={handleSubmitAccount}>
					<label>
						Password: <input name="password" type="password" defaultValue={account.password} disabled={submitSignUp} />
					</label>
					<hr />
					<button onClick={previous} disabled={submitSignUp}>
						Previous
					</button>
					<button type="reset" disabled={submitSignUp}>
						Reset
					</button>
					<button type="submit" disabled={submitSignUp}>
						Next
					</button>
				</form>
				<label>{error}</label>
			</div>
		);
	} else if (step === 2) {
		return (
			<div>
				<div>Sign Up</div>
				<hr />
				<form method="post" onSubmit={handleSignUp}>
					<button onClick={previous} disabled={submitSignUp}>
						Previous
					</button>
					<button type="submit" disabled={submitSignUp}>
						Sign Up
					</button>
				</form>
				<label>{error}</label>
			</div>
		);
	} else {
		return <div>Something went wrong!</div>;
	}
}
