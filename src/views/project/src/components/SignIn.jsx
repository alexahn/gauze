import * as React from "react";
import { useState } from "react";

function SignIn({}) {
	const [step, setStep] = useState(0)
	const [email, setEmail] = useState(null)
	const [password, setPassword] = useState(null)
	function handlePerson(formData) {
		const email = formData.get("email")
		alert(email)
	}
	function handleAccount(formData) {

	}
    return (
		<form action={handleForm}>
			<input name="email"/>
			<button type="submit">Next</button>
		</form>
    );
}

export default SignIn
