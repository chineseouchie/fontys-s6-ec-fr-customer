import { MenuItem, Typography } from "@mui/material"
import { useState } from "react"

export default function Cart() {
	const [totalItem] = useState(0)
	return (
		<>
			<MenuItem>
				<Typography textAlign="center">
					Cart: {totalItem}
				</Typography>
			</MenuItem>
		</>
	)
}
