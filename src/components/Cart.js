import { Box, Button } from "@mui/material"
import { useContext } from "react"
import { CartContext } from "../providers/CartProvider"

export default function Cart() {
	const { cart, removeItem } = useContext(CartContext)
	console.log(cart)

	return(<>
		{cart.map(item => (
			<Box key={item.product_uuid}>
				{item.product_name} - {item.quantity}
				<Button variant="contained" onClick={() => {removeItem(item.product_uuid)}}>Remove</Button>
			</Box>
		))}
		<Box>
			<Button variant="contained">Order</Button>
		</Box>
	</>)
}
