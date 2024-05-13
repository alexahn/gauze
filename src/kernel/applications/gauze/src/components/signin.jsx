import React from "react";
import { useState } from "react";

export default function SignIn({ route, router, gauze, model }) {
	const [step, setStep] = useState(0);
	const [person, setPerson] = useState({});
	const [submitAssert, setSubmitAssert] = useState(false);
	const [account, setAccount] = useState({});
	const [submitVerify, setSubmitVerify] = useState(false);
	const requirements = ["person.assert.email", "account.verify.password"];
	const [submitSignIn, setSubmitSignIn] = useState(false);
	const [asserted, setAsserted] = useState({});
	const [verified, setVerified] = useState({});
	const [error, setError] = useState("");

	// have a switch here based on the requirements as a very simple implementation for the flow
	function handleSubmitAssert(e) {
		e.preventDefault();
		setError("");
		const form = e.target;
		const formData = new FormData(form);
		const formJSON = Object.fromEntries(formData.entries());
		setPerson(formJSON);
		setSubmitAssert(true);
		// async call
		return gauze.personAssert(formJSON).then(function (status) {
			setSubmitAssert(false);
			if (status.person.assert.email.success) {
				setAsserted({ ...asserted, ...status });
				setStep(step + 1);
			} else {
				// construct an error here
				setError("Person could not be asserted");
			}
		});
	}
	function handleSubmitVerify(e) {
		e.preventDefault();
		setError("");
		const form = e.target;
		const formData = new FormData(form);
		const formJSON = Object.fromEntries(formData.entries());
		setAccount(formJSON);
		setSubmitVerify(true);
		// async call
		return gauze.accountVerify(formJSON).then(function (status) {
			setSubmitVerify(false);
			if (status.account.verify.password.success) {
				setVerified({ ...verified, ...status });
				setStep(step + 1);
			} else {
				// construct an error here
				setError("Account could not be verified");
			}
		});
	}
	function handleSignIn(e) {
		e.preventDefault();
		setError("");
		const form = e.target;
		const formData = new FormData(form);
		const formJSON = Object.fromEntries(formData.entries());
		setSubmitSignIn(true);
		// async call
		return gauze.signIn().then(function (session) {
			setSubmitSignIn(false);
			gauze.setProxyJWT(session.gauze__session__value);
			model.create("SESSION", session.gauze__session__id, session);
			// router navigate
			router.navigate("proxy.agents", { next: route.params.next }, { replace: true });
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
				<div>Sign In</div>
				<hr />
				<form method="post" onSubmit={handleSubmitAssert}>
					<label>
						Email: <input name="email" defaultValue={person.email} disabled={submitAssert} />
					</label>
					<hr />
					<button type="reset" disabled={submitAssert}>
						Reset
					</button>
					<button type="submit" disabled={submitAssert}>
						Next
					</button>
				</form>
				<label>{error}</label>
			</div>
		);
	} else if (step === 1) {
		return (
			<div>
				<div>Sign In</div>
				<hr />
				<form method="post" onSubmit={handleSubmitVerify}>
					<label>
						Password: <input name="password" type="password" defaultValue={account.password} disabled={submitVerify} />
					</label>
					<hr />
					<button onClick={previous} disabled={submitVerify}>
						Previous
					</button>
					<button type="reset" disabled={submitVerify}>
						Reset
					</button>
					<button type="submit" disabled={submitVerify}>
						Next
					</button>
				</form>
				<label>{error}</label>
			</div>
		);
	} else if (step === 2) {
		return (
			<div>
				<div>Sign In</div>
				<hr />
				<form method="post" onSubmit={handleSignIn}>
					<button onClick={previous} disabled={submitSignIn}>
						Previous
					</button>
					<button type="submit" disabled={submitSignIn}>
						Sign In
					</button>
				</form>
				<label>{error}</label>
			</div>
		);
	} else {
		return <div>Something went wrong!</div>;
	}
}
