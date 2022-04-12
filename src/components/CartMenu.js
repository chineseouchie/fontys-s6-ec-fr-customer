import { MenuItem, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { CartContext } from "../providers/CartProvider"

export default function CartMenu() {
	const { cart } = useContext(CartContext)

	return (
		<>	
			<Link to="/cart">
				<MenuItem>
					<Typography textAlign="center">
					Cart: {cart.length}
					</Typography>
				</MenuItem>
			</Link>
		</>
	)
}
