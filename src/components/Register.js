import { Button, FormControl, FormGroup, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

export default function Register() {
	const navigate = useNavigate()
	const { enqueueSnackbar } = useSnackbar();

	const handleSubmit = async (e) => {
		e.preventDefault()

		const email = e.target.email.value
		const password = e.target.password.value
		const firstname = e.target.firstname.value
		const lastname = e.target.lastname.value

		if (!email || !password) {
			enqueueSnackbar(`Not all form inputs have been filled in`, {
				variant: "error",
				autoHideDuration: 2500,
			});
			return
		}

		const res = await fetch("http://ec-auth-deployment/api/v1/auth/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({email, password, firstname, lastname})
		})
		
		const result = await res.json()

		if (res.status === 200) {
			enqueueSnackbar(`Registration success`, {
				variant: "success",
				autoHideDuration: 2500,
			});
			console.log(result)
			navigate("/login")
		} else {
			enqueueSnackbar(`${result.message}`, {
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
						<TextField label="Firstname" type="text" name="firstname" variant="standard" required/>
						<TextField label="Lastname" type="text" name="lastname" variant="standard" required/>
					</FormGroup>

					<FormGroup >
						<TextField label="Email" type="email" name="email" variant="standard" required/>
						<TextField label="Password" type="password" name="password" variant="standard" required/>
					</FormGroup>

					<Button variant="contained" type="submit">
						Register
					</Button>
				</FormControl>
				
			</form>
		</>
	)
}
