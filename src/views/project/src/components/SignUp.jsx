import * as React from "react";
import { useState } from "react";

function SignUp({ pathfinder, services, next }) {
	const { gauze } = services
	const [step, setStep] = useState(0)
	const [person, setPerson] = useState({})
	const [submitPerson, setSubmitPerson] = useState(false)
	const [account, setAccount] = useState({})
	const [submitAccount, setSubmitAccount] = useState(false)
	const [submitSignUp, setSubmitSignUp] = useState(false)
	function handlePerson(formData) {
		setSubmitPerson(true)
		const email = formData.get("email")
		setPerson({
			email
		})
		setSubmitPerson(false)
		setStep((step + 1) % 3)
			
	}
	function handleAccount(formData) {
		setSubmitAccount(true)
		const password = formData.get("password")
		setAccount({
			password
		})
		setSubmitAccount(false)
		setStep((step + 1) % 3)
	}
	function handleSignUp(formData) {
		setSubmitSignUp(true)
		return gauze.default.signUp({
			person,
			account
		}).then(function (session) {
			gauze.default.setProxyJWT(session.gauze__session__value)
			setSubmitSignUp(false)
			setStep((step + 1) % 3)
			// redirect to next
			location.replace(next)
		}).catch(function (err) {
			setSubmitSignUp(false)
		})
	}
	function handlePrevious() {
		setStep((step - 1) % 3)
	}
	if (step === 0) {
		return (
			<form key={step} action={handlePerson}>
				<label>Email</label>
				<input name="email" defaultValue={person.email}/>
				<button type="submit" disabled={submitPerson}>Next</button>
			</form>
		)
	} else if (step === 1) {
		// note: pressing enter seems to trigger the immediate button following the input field
		return (
			<form key={step} action={handleAccount}>
				<label>Password</label>
				<input name="password" type="password" defaultValue={account.password}/>
				<button type="submit" disabled={submitAccount}>Next</button>
				<button onClick={handlePrevious} disabled={submitAccount}>Prev</button>
			</form>
		)
	} else if (step === 2) {
		return (
			<form key={step} action={handleSignUp}>
				<label>Sign Up</label>
				<button type="submit" disabled={submitSignUp}>Next</button>
				<button onClick={handlePrevious} disabled={submitSignUp}>Prev</button>
			</form>
		)
	} else {
		return null
	}
}

export default SignUp
