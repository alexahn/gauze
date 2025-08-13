import * as React from "react";
import { useState } from "react";

import { navigate } from "@ahn/sinew";

function SignUp({ pathfinder, services, next }) {
	const { gauze } = services;
	const [step, setStep] = useState(0);
	const [error, setError] = useState("");
	const [person, setPerson] = useState({});
	const [submitPerson, setSubmitPerson] = useState(false);
	const [account, setAccount] = useState({});
	const [submitAccount, setSubmitAccount] = useState(false);
	const [submitSignUp, setSubmitSignUp] = useState(false);
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
				setError("Email is already taken!");
				setSubmitPerson(false);
				//setStep((step + 1) % 3);
			})
			.catch(function (err) {
				setSubmitPerson(false);
				if (err.message === "Agent person could not be found") {
					//setError("Email could not be found!")
					setStep((step + 1) % 3);
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
		setSubmitAccount(false);
		setStep((step + 1) % 3);
	}
	function handleSignUp(formData) {
		setError("");
		setSubmitSignUp(true);
		return gauze.default
			.signUp({
				person,
				account,
			})
			.then(function (session) {
				gauze.default.setProxyJWT(session.gauze__session__value);
				setSubmitSignUp(false);
				setStep((step + 1) % 3);
				// redirect to next
				navigate(next, {
					push: true,
					replace: true,
					pathfinder: pathfinder,
				});
			})
			.catch(function (err) {
				setSubmitSignUp(false);
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
	} else if (step === 2) {
		return (
			<form key={step} action={handleSignUp}>
				<hr />
				<div className={fieldClass} style={{ visibility: "hidden" }}>
					<label htmlFor="password">
						<button type="button" className={labelClass} disabled={true}>
							PASSWORD
						</button>
					</label>
					<input className={inputClass} name="password" type="password" defaultValue={account.password} disabled={submitSignUp} autoFocus />
				</div>
				<hr />
				<div align="right">
					<button className={previousButtonClass} type="button" onClick={handlePrevious} disabled={submitSignUp}>
						Previous
					</button>
					<button className={nextButtonClass} type="submit" disabled={submitSignUp}>
						Sign Up
					</button>
				</div>
				<div className="h1" align="center">
					<div style={{ visibility: "hidden" }}>*</div>
					{error ? <label className={errorClass}>{error}</label> : null}
				</div>
			</form>
		);
	} else {
		return null;
	}
}

export default SignUp;
