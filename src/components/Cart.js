import { Box, Button } from "@mui/material"
import { useSnackbar } from "notistack"
import { useContext } from "react"
import { CartContext } from "../providers/CartProvider"
import { UserContext } from "../providers/UserProvider"

export default function Cart() {
	const ORDER_URL = process.env.REACT_APP_ORDER_URL
	const { cart, removeItem } = useContext(CartContext)
	const { user } = useContext(UserContext)
	const { enqueueSnackbar } = useSnackbar();
	console.log(cart)
	console.log(user)

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

	return(<>
		{cart.map(item => (
			<Box key={item.product_uuid}>
				{item.product_name} - {item.quantity}
				<Button variant="contained" onClick={() => {removeItem(item.product_uuid)}}>Remove</Button>
			</Box>
		))}
		<Box>
			<Button onClick={onOrder} variant="contained">Order</Button>
		</Box>
	</>)
}
