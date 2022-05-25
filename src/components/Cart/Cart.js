import { Box, Button, IconButton, Typography } from "@mui/material"
import { useContext } from "react"
import { CartContext } from "../../providers/CartProvider"
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useNavigate } from "react-router-dom";

export default function Cart() {
	const { cart, removeItem, updateQuantity } = useContext(CartContext)
	const navigate = useNavigate()

	const toOrder = () => {
		navigate("/order")
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
			<Button onClick={toOrder} variant="contained" disabled={(cart.length === 0)}>Order</Button>
		</Box>
	</>)
}
