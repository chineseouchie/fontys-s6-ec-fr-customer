import { Button, FormControl, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
	const [formError, setFormError] = useState(false)
	const [formErrorMsg, setFormErrorMsg] = useState("")
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()
		setFormError(false)

		const email = e.target.email.value
		const password = e.target.password.value

		if (!email || !password) {
			setFormError(true)
			setFormErrorMsg("Not all form input are filled in")
			return
		}

		const res = await fetch("http://localhost:3001/api/v1/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({email, password})
		})
		const result = await res.json()
		if (res.status === 200) {
			console.log(result)
			navigate("/login")
		} else {
			setFormError(true)
			setFormErrorMsg(result.message)
		}
	}

	return(
		<>
			<form onSubmit={handleSubmit}>
				{formError && <div>{formErrorMsg}</div>}
				<FormControl>
					<TextField label="Email" type="email" name="email" variant="standard" />
					<TextField label="Password" type="password" name="password" variant="standard" />

					<Button variant="contained" type="submit">
						Register
					</Button>
				</FormControl>
				
			</form>
		</>
	)
}
