import * as React from "react";
import { useState } from "react";

function SignIn({ pathfinder, services, next }) {
	const { gauze } = services
	console.log("gauze", gauze.default)
	const [step, setStep] = useState(0)
	//const [person, setPerson] = useState(null)
	const [submitPerson, setSubmitPerson] = useState(false)
	//const [account, setAccount] = useState(null)
	const [submitAccount, setSubmitAccount] = useState(false)
	const [submitSignIn, setSubmitSignIn] = useState(false)
	function handlePerson(formData) {
		setSubmitPerson(true)
		const email = formData.get("email")
		return gauze.default.assertPerson({
			email: email
		}).then(function () {
			setSubmitPerson(false)
			setStep((step + 1) % 3)
			
		}).catch(function (err) {
			setSubmitPerson(false)
		})
	}
	function handleAccount(formData) {
		setSubmitAccount(true)
		const password = formData.get("password")
		// verify_password
		return gauze.default.verifyAccount({
			password: password
		}).then(function () {
			setSubmitAccount(false)
			setStep((step + 1) % 3)
			
		}).catch(function (err) {
			setSubmitAccount(false)
		})
	}
	function handleSignIn(formData) {
		// signin
		setSubmitSignIn(true)
		return gauze.default.signIn().then(function (session) {
			console.log("SIGNIN SESSION", session)
			gauze.default.setProxyJWT(session.gauze__session__value)
			setSubmitSignIn(false)
			setStep((step + 1) % 3)
			// redirect to proxies and pass forward ?next
			//location.replace(pathfinder.stateToURL("project.proxy.proxies", {}, { next }))
			location.replace(next)
		}).catch(function (err) {
			setSubmitSignIn(false)
		})
	}
	if (step === 0) {
		return (
			<form action={handlePerson}>
				<label>Email</label>
				<input name="email"/>
				<button type="submit">Next</button>
			</form>
		)
	} else if (step === 1) {
		return (
			<form action={handleAccount}>
				<label>Password</label>
				<input name="password" type="password"/>
				<button>Prev</button>
				<button type="submit">Next</button>
			</form>
		)
	} else if (step === 2) {
		return (
			<form action={handleSignIn}>
				<label>Sign In</label>
				<button>Prev</button>
				<button type="submit">Next</button>
			</form>
		)
	} else {
		return null
	}
    return (
		<form action={handleForm}>
			<input name="email"/>
			<button type="submit">Next</button>
		</form>
    );
}

export default SignIn
