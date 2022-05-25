import { Box, Button, IconButton, Typography } from "@mui/material"
import { useSnackbar } from "notistack"
import { useContext } from "react"
import { CartContext } from "../../providers/CartProvider"
import { UserContext } from "../../providers/UserProvider"
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
export default function Cart() {
	const ORDER_URL = process.env.REACT_APP_ORDER_URL
	const { cart, removeItem, updateQuantity } = useContext(CartContext)
	const { enqueueSnackbar } = useSnackbar();
	const { user } = useContext(UserContext)

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
			<div key={item.product_uuid} className="cart-list">
				<Box
					component="img"
					sx={{height: 200, width: 200, objectFit: "contain"}}
					alt={item.product_name}
					src={item.image_url}/>
				
				<div className="cart-list-item">
					<Typography variant="h5">
						{item.product_name}
					</Typography>
					
					
					<div className="cart-list-item-action">
						<IconButton color="primary" size="small"  onClick={() => {updateQuantity(item.product_uuid, "decrease")}}><RemoveIcon/></IconButton>
						<Typography>
							{item.quantity}
						</Typography>
						<IconButton color="primary" size="small"  onClick={() => {updateQuantity(item.product_uuid, "increase")}}><AddIcon/></IconButton>
					</div>
					<IconButton color="primary" size="small"  onClick={() => {removeItem(item.product_uuid)}}><DeleteIcon/></IconButton>
				</div>
			</div>
		))}
		<Box>
			<Button onClick={onOrder} variant="contained" disabled={(cart.length === 0)}>Order</Button>
		</Box>
	</>)
}
