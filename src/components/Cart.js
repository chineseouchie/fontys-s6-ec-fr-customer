import { MenuItem, Typography } from "@mui/material"
import { useState } from "react"
import { Link } from "react-router-dom"

export default function Cart() {
	const [totalItem] = useState(0)
	return (
		<>	
			<Link to="/order">
				<MenuItem>
					<Typography textAlign="center">
					Cart: {totalItem}
					</Typography>
				</MenuItem>
			</Link>
		</>
	)
}
