import { Button, FormControl, FormGroup, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";

export default function Login() {
	const { user, login } = useContext(UserContext)
	const navigate = useNavigate()
	const { enqueueSnackbar } = useSnackbar();
	const AUTH_URL = process.env.REACT_APP_AUTH_URL

	useEffect(() => {
		if (user?.jwt) {
			navigate("/")
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user?.jwt])

	const handleSubmit = async (e) => {
		e.preventDefault()

		const email = e.target.email.value
		const password = e.target.password.value
		try {
			const res = await fetch(`${AUTH_URL}/login`, {
				method: "POST",
				headers: {
					"content-type": "application/json"
				},
				body: JSON.stringify({email, password})
			})
			const result = await res.json()
	
			if (res.status === 200) {
				enqueueSnackbar(`Login success`, {
					variant: "success",
					autoHideDuration: 2500,
				});
				login(result.data.jwt)
				console.log(result)
				console.log(result.data.jwt)
				navigate("/")
			} else {
				enqueueSnackbar(`${result.message}`, {
					variant: "error",
					autoHideDuration: 2500,
				});
			}
		} catch (e) {
			console.log(e);
			enqueueSnackbar(`Something went wrong. Try again later`, {
				variant: "error",
				autoHideDuration: 2500,
			});
		}
	}

	return(
		<>
			<form onSubmit={handleSubmit} className="register-form">
				<FormControl>
					<FormGroup >
						<TextField label="Email" type="email" name="email" variant="standard" required value="test@example.com"/>
						<TextField label="Password" type="password" name="password" variant="standard" required value="Testtest1!"/>
					</FormGroup>

					<Button variant="contained" type="submit">
						Login
					</Button>
				</FormControl>
				
				<div>No account yet? Click <Link to='/register'>here</Link> to register</div>
			</form>
		</>
	)
}
