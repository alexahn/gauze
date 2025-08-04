import * as React from "react";
import { useState } from "react";

import navigate from "./../navigate.js"

function SignIn({ pathfinder, services, next }) {
	const { gauze } = services;
	const [step, setStep] = useState(0);
	const [error, setError] = useState("");
	const [person, setPerson] = useState({});
	const [submitPerson, setSubmitPerson] = useState(false);
	const [account, setAccount] = useState({});
	const [submitAccount, setSubmitAccount] = useState(false);
	const [submitSignIn, setSubmitSignIn] = useState(false);
	function handlePerson(formData) {
		setError("");
		setSubmitPerson(true);
		const email = formData.get("email");
		setPerson({
			email,
		});
		return gauze.default
			.assertPerson({
				email: email,
			})
			.then(function () {
				setSubmitPerson(false);
				setStep((step + 1) % 3);
			})
			.catch(function (err) {
				setSubmitPerson(false);
				if (err.message === "Agent person could not be found") {
					setError("Email could not be found!");
				} else {
					setError("Something went wrong!");
				}
			});
	}
	function handleAccount(formData) {
		setError("");
		setSubmitAccount(true);
		const password = formData.get("password");
		setAccount({
			password,
		});
		return gauze.default
			.verifyAccount({
				password: password,
			})
			.then(function () {
				setSubmitAccount(false);
				setStep((step + 1) % 3);
			})
			.catch(function (err) {
				setSubmitAccount(false);
				if (err.message === "Invalid password") {
					setError("Password does not match!");
				} else {
					setError("Something went wrong!");
				}
			});
	}
	function handleSignIn(formData) {
		setError("");
		setSubmitSignIn(true);
		return gauze.default
			.signIn()
			.then(function (session) {
				gauze.default.setProxyJWT(session.gauze__session__value);
				setSubmitSignIn(false);
				setStep((step + 1) % 3);
				// redirect to next
				//location.replace(next);
				navigate(next, {
					replace: true
				})
			})
			.catch(function (err) {
				setSubmitSignIn(false);
				setError("Something went wrong!");
			});
	}
	function handlePrevious() {
		setStep((step - 1) % 3);
	}
	const fieldClass = "flex items-center athelas";
	const labelClass = "clouds br2 ba bw1 bw0 bgxyz4 bdxyz4 cx6 w4 f7";
	const inputClass = "clouds w-100 h-100 br2 bdx6 bgx6 ba bw1 cx2 f6";
	const previousButtonClass = "clouds athelas bgx2 bdx2 bgx3h bdx3h ba br2 bw1 cx4 cx5h w3 f6";
	const resetButtonClass = "clouds athelas bgx7 bdx7 bgx6h bdx6h ba br2 bw1 cx6 cxyz7h w3 f6";
	const nextButtonClass = "clouds athelas bgx11 bdx11 bgx9h bdx9h ba br2 bw1 cx7 cx5h w3 f6";
	const errorClass = "clouds athelas bgx10 bdx10 cx7 ba br2 bw1 pa1 f6";
	if (step === 0) {
		return (
			<form key={step} action={handlePerson}>
				<hr />
				<div className={fieldClass}>
					<label htmlFor="email">
						<button type="button" className={labelClass} disabled={true}>
							EMAIL
						</button>
					</label>
					<input className={inputClass} name="email" defaultValue={person.email} disabled={submitPerson} autoFocus />
				</div>
				<hr />
				<div align="right">
					<button className={nextButtonClass} type="submit" disabled={submitPerson}>
						Next
					</button>
				</div>
				<div className="h1" align="right">
					<div style={{ visibility: "hidden" }}>*</div>
					{error ? <label className={errorClass}>{error}</label> : null}
				</div>
			</form>
		);
		/*
		return (
			<form key={step} action={handlePerson}>
				<label>Email</label>
				<input name="email" defaultValue={person.email} autoFocus />
				<button type="submit" disabled={submitPerson}>
					Next
				</button>
			</form>
		);
		*/
	} else if (step === 1) {
		return (
			<form key={step} action={handleAccount}>
				<hr />
				<div className={fieldClass}>
					<label htmlFor="password">
						<button type="button" className={labelClass} disabled={true}>
							PASSWORD
						</button>
					</label>
					<input className={inputClass} name="password" type="password" defaultValue={account.password} disabled={submitAccount} autoFocus />
				</div>
				<hr />
				<div align="right">
					<button className={previousButtonClass} type="button" onClick={handlePrevious} disabled={submitAccount}>
						Previous
					</button>
					<button className={nextButtonClass} type="submit" disabled={submitAccount}>
						Next
					</button>
				</div>
				<div className="h1" align="right">
					<div style={{ visibility: "hidden" }}>*</div>
					{error ? <label className={errorClass}>{error}</label> : null}
				</div>
			</form>
		);
		/*
		return (
			<form key={step} action={handleAccount}>
				<label>Password</label>
				<input name="password" type="password" defaultValue={account.password} autoFocus />
				<button type="button" onClick={handlePrevious} disabled={submitAccount}>
					Prev
				</button>
				<button type="submit" disabled={submitAccount}>
					Next
				</button>
			</form>
		);
		*/
	} else if (step === 2) {
		return (
			<form key={step} action={handleSignIn}>
				<hr />
				<div className={fieldClass} style={{ visibility: "hidden" }}>
					<label htmlFor="password">
						<button type="button" className={labelClass} disabled={true}>
							PASSWORD
						</button>
					</label>
					<input className={inputClass} name="password" type="password" defaultValue={account.password} disabled={submitSignIn} autoFocus />
				</div>
				<hr />
				<div align="right">
					<button className={previousButtonClass} type="button" onClick={handlePrevious} disabled={submitSignIn}>
						Previous
					</button>
					<button className={nextButtonClass} type="submit" disabled={submitSignIn}>
						Sign In
					</button>
				</div>
				<div className="h1" align="center">
					<div style={{ visibility: "hidden" }}>*</div>
					{error ? <label className={errorClass}>{error}</label> : null}
				</div>
			</form>
		);
		/*
		return (
			<form key={step} action={handleSignIn}>
				<label>Sign In</label>
				<button type="button" onClick={handlePrevious} disabled={submitSignIn}>
					Prev
				</button>
				<button type="submit" disabled={submitSignIn}>
					Next
				</button>
			</form>
		);
		*/
	} else {
		return null;
	}
}

export default SignIn;
