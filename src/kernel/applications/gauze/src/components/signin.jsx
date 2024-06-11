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
		return gauze
			.personAssert(formJSON)
			.then(function (status) {
				setSubmitAssert(false);
				if (status.person.assert.email.success) {
					setAsserted({ ...asserted, ...status });
					console.log("incrementing");
					setStep(step + 1);
				} else {
					// construct an error here
					setError("Person could not be asserted");
				}
			})
			.catch(function (err) {
				setSubmitAssert(false);
				setError("Something went wrong!");
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
		return gauze
			.accountVerify(formJSON)
			.then(function (status) {
				setSubmitVerify(false);
				if (status.account.verify.password.success) {
					setVerified({ ...verified, ...status });
					setStep(step + 1);
				} else {
					// construct an error here
					setError("Account could not be verified");
				}
			})
			.catch(function (err) {
				setSubmitVerify(false);
				setError("Something went wrong!");
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
		return gauze
			.signIn()
			.then(function (session) {
				setSubmitSignIn(false);
				gauze.setProxyJWT(session.gauze__session__value);
				model.create("SESSION", session.gauze__session__id, session);
				// router navigate
				router.navigate("proxy.agents", { next: route.params.next }, { replace: true });
			})
			.catch(function (err) {
				setSubmitSignIn(false);
				setError("Something went wrong!");
			});
	}
	function previous() {
		if (0 < step) {
			console.log("decrementing");
			setStep(step - 1);
		}
	}
	function next() {
		if (step < requirements.length) {
			console.log("incrementing");
			setStep(step + 1);
		}
	}
	console.log("step", step);
	if (step === 0) {
		return (
			<div>
				<div>Sign In</div>
				<hr />
				<form method="post" onSubmit={handleSubmitAssert}>
					<div className="flex items-center athelas f5">
						<label htmlFor="email">
							<button className="br2 ba bw1 bgxyz4 bdxyz4 cx12 w3">Email</button>
						</label>
						<input className="w-100 br2 bdx12 bgx12 ba bw1" name="email" defaultValue={person.email} disabled={submitAssert} />
					</div>
					<hr />
					<div align="right">
					<button className="bgx2 bdx2 bgx3h bdx3h ba br2 bw1 cx11 cx9h w3" type="reset" disabled={submitAssert}>
						Reset
					</button>
					<button className="bgx11 bdx11 bgx9h bdx9h ba br2 bw1 cx2 cx4h w3" type="submit" disabled={submitAssert}>
						Next
					</button>
					</div>
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
					<label>Password:</label>
					<input name="password" type="password" defaultValue={account.password} disabled={submitVerify} />
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
