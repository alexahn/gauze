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
			})
			.catch(function (err) {
				setSubmitSignUp(false);
				setError("Something went wrong!");
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
	const fieldClass = "flex items-center athelas";
	const labelClass = "clouds br2 ba bw1 bgxyz4 bdxyz4 cx6 w4 f7";
	const inputClass = "clouds w-100 h-100 br2 bdx6 bgx6 ba bw1 cx2 f6";
	const previousButtonClass = "clouds athelas bgx2 bdx2 bgx3h bdx3h ba br2 bw1 cx4 cx5h w3 f6";
	const resetButtonClass = "clouds athelas bgx7 bdx7 bgx6h bdx6h ba br2 bw1 cx6 cxyz7h w3 f6";
	const nextButtonClass = "clouds athelas bgx11 bdx11 bgx9h bdx9h ba br2 bw1 cx7 cx5h w3 f6";
	const errorClass = "clouds athelas bgx10 bdx10 cx7 ba br2 bw1 pa1 f6";
	if (step === 0) {
		return (
			<div>
				{/*<div>Sign Up</div>*/}
				<hr />
				<form method="post" onSubmit={handleSubmitPerson}>
					<div className={fieldClass}>
						<label htmlFor="email">
							<button className={labelClass} disabled={true}>
								EMAIL
							</button>
						</label>
						<input className={inputClass} name="email" defaultValue={person.email} disabled={submitSignUp} />
					</div>
					<hr />
					<div align="right">
						<button className={previousButtonClass} type="reset" disabled={submitSignUp}>
							Reset
						</button>
						<button className={nextButtonClass} type="submit" disabled={submitSignUp}>
							Next
						</button>
					</div>
				</form>
				<div className="h1" align="right">
					<div style={{ visibility: "hidden" }}>*</div>
					{error ? <label className={errorClass}>{error}</label> : null}
				</div>
			</div>
		);
	} else if (step === 1) {
		return (
			<div>
				{/*<div>Sign Up</div>*/}
				<hr />
				<form method="post" onSubmit={handleSubmitAccount}>
					<div className={fieldClass}>
						<label htmlFor="password">
							<button className={labelClass} disabled={true}>
								PASSWORD
							</button>
						</label>
						<input className={inputClass} name="password" type="password" defaultValue={account.password} disabled={submitSignUp} />
					</div>
					<hr />
					<div align="right">
						<button className={previousButtonClass} onClick={previous} disabled={submitSignUp}>
							Previous
						</button>
						<button className={resetButtonClass} type="reset" disabled={submitSignUp}>
							Reset
						</button>
						<button className={nextButtonClass} type="submit" disabled={submitSignUp}>
							Next
						</button>
					</div>
				</form>
				<div className="h1" align="right">
					<div style={{ visibility: "hidden" }}>*</div>
					{error ? <label className={errorClass}>{error}</label> : null}
				</div>
			</div>
		);
	} else if (step === 2) {
		return (
			<div>
				{/*<div>Sign Up</div>*/}
				<hr />
				<form method="post" onSubmit={handleSignUp}>
					<div className={fieldClass} style={{ visibility: "hidden" }}>
						<label htmlFor="password">
							<button className={labelClass} disabled={true}>
								PASSWORD
							</button>
						</label>
						<input className={inputClass} name="password" type="password" defaultValue={account.password} disabled={submitSignUp} />
					</div>
					<div align="right">
						<button className={previousButtonClass} onClick={previous} disabled={submitSignUp}>
							Previous
						</button>
						<button className={nextButtonClass} type="submit" disabled={submitSignUp}>
							Sign Up
						</button>
					</div>
				</form>
				<div className="h1" align="right">
					<div style={{ visibility: "hidden" }}>*</div>
					{error ? <label className={errorClass}>{error}</label> : null}
				</div>
			</div>
		);
	} else {
		return <div>Something went wrong!</div>;
	}
}
