import * as React from "react";
import { useState } from "react";

function SignIn({ pathfinder, services, next }) {
	const { gauze } = services;
	const [step, setStep] = useState(0);
	const [person, setPerson] = useState({});
	const [submitPerson, setSubmitPerson] = useState(false);
	const [account, setAccount] = useState({});
	const [submitAccount, setSubmitAccount] = useState(false);
	const [submitSignIn, setSubmitSignIn] = useState(false);
	function handlePerson(formData) {
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
			});
	}
	function handleAccount(formData) {
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
			});
	}
	function handleSignIn(formData) {
		setSubmitSignIn(true);
		return gauze.default
			.signIn()
			.then(function (session) {
				gauze.default.setProxyJWT(session.gauze__session__value);
				setSubmitSignIn(false);
				setStep((step + 1) % 3);
				// redirect to next
				location.replace(next);
			})
			.catch(function (err) {
				setSubmitSignIn(false);
			});
	}
	function handlePrevious() {
		setStep((step - 1) % 3);
	}
	if (step === 0) {
		return (
			<form key={step} action={handlePerson}>
				<label>Email</label>
				<input name="email" defaultValue={person.email} />
				<button type="submit" disabled={submitPerson}>
					Next
				</button>
			</form>
		);
	} else if (step === 1) {
		// note: pressing enter seems to trigger the immediate button following the input field
		return (
			<form key={step} action={handleAccount}>
				<label>Password</label>
				<input name="password" type="password" defaultValue={account.password} />
				<button type="button" onClick={handlePrevious} disabled={submitAccount}>
					Prev
				</button>
				<button type="submit" disabled={submitAccount}>
					Next
				</button>
			</form>
		);
	} else if (step === 2) {
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
	} else {
		return null;
	}
}

export default SignIn;
