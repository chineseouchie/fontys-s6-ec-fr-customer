import { Button, FormControl, FormGroup, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

export default function Register() {
	const navigate = useNavigate()
	const { enqueueSnackbar } = useSnackbar();
	const AUTH_URL = process.env.REACT_APP_AUTH_URL
	
	const handleSubmit = async (e) => {
		e.preventDefault()
		const form = e.target;

		const email = form.email.value
		const password = form.password.value
		const firstname = form.firstname.value
		const lastname = form.lastname.value
		const street = form.street.value
		const city = form.city.value
		const province = form.province.value
		const country = form.country.value

		if (!email || !password) {
			enqueueSnackbar(`Not all form inputs have been filled in`, {
				variant: "error",
				autoHideDuration: 2500,
			});
			return
		}

		const res = await fetch(`${AUTH_URL}/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({email, password, firstname, lastname, street, city, province, country})
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
			{AUTH_URL}
			<form onSubmit={handleSubmit} className="register-form">
				<FormControl>
					<FormGroup >
						<TextField label="Firstname" type="text" name="firstname" variant="standard" required defaultValue="joey"/>
						<TextField label="Lastname" type="text" name="lastname" variant="standard" required defaultValue="lau"/>
						<TextField label="Street" type="text" name="street" variant="standard" required defaultValue="straat 23"/>
						<TextField label="City" type="text" name="city" variant="standard" required defaultValue="Amsterdam"/>
						<TextField label="Province" type="text" name="province" variant="standard" required defaultValue="Noord Holland" />
						<TextField label="Country" type="text" name="country" variant="standard" required defaultValue="Nederland"/>
					</FormGroup>

					<FormGroup >
						<TextField label="Email" type="email" name="email" variant="standard" required defaultValue="test@example.com" />
						<TextField label="Password" type="password" name="password" variant="standard" required defaultValue="Testtest1!" />
					</FormGroup>

					<Button variant="contained" type="submit">
						Register
					</Button>
				</FormControl>
				
			</form>
		</>
	)
}
