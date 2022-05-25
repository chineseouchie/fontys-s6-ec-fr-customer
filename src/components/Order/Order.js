import { useSnackbar } from "notistack";
import { useContext } from "react";
import { CartContext } from "../../providers/CartProvider";
import { UserContext } from "../../providers/UserProvider";
import { useGetFetch } from "../../hooks/useGetFetch"
import { FormGroup, Grid, TextField } from "@mui/material";

export default function Order() {
	const { cart } = useContext(CartContext)
	const ORDER_URL = process.env.REACT_APP_ORDER_URL
	const AUTH_URL = process.env.REACT_APP_AUTH_URL
	const { enqueueSnackbar } = useSnackbar();
	const { user } = useContext(UserContext)
	const [result, error, loading] = useGetFetch(`${AUTH_URL}/me`, user.jwt)
	
	if (loading) {
		return <></>
	}
	if (error) {
		return <>error</>
	}


	const onOrder = async () => {
		const orderProducts = cart.map(e => ({product_uuid: e.product_uuid, quantity: e.quantity}))
		
		try {
			const res = await fetch(ORDER_URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `jwt ${user.jwt}`
				},
				body: JSON.stringify({"orderProducts": orderProducts})
			})

			const result = await res.json()
			if (res.status === 200) {
				console.log(result)
				enqueueSnackbar(`Order placed`, {
					variant: "success",
					autoHideDuration: 2500,
				});
			} else {
				enqueueSnackbar(result.message, {
					variant: "error",
					autoHideDuration: 2500,
				});
			}
	
		} catch(e) {
			console.log(e)
			enqueueSnackbar(`Something went wrong. Try again later`, {
				variant: "error",
				autoHideDuration: 2500,
			});
		}
	}

	const account = result.data
	return (
		<>
			Order
			<form>
				<Grid container spacing={2}>
					<Grid item xs={7} pr={3} >
						<FormGroup sx={{ mt: 3, ml: 3}}>
							<TextField label="First name" type="text" name="firstname" variant="standard" required defaultValue={account.firstname}/>
							<TextField label="Last name" type="text" name="lastname" variant="standard" required defaultValue={account.lastname}/>
							<TextField label="Street" type="text" name="street" variant="standard" required defaultValue={account.street}/>
							<TextField label="City" type="text" name="city" variant="standard" required defaultValue={account.city}/>
							<TextField label="Province" type="text" name="province" variant="standard" required defaultValue={account.province}/>
							<TextField label="country" type="text" name="country" variant="standard" required defaultValue={account.country}/>
						</FormGroup>

					</Grid>
				</Grid>
			</form>
		</>
	)
}
