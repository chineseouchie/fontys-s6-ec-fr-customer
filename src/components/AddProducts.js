import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";

export default function AddProducts() {
	let params = useParams();
	const PRODUCT_URL = process.env.REACT_APP_PRODUCT_URL
	const { user } = useContext(UserContext)

	const [name, setName] = useState("")
	const [desc, setDesc] = useState("")
	const [price, setPrice] = useState()


	// console.log(result);
	const onAdd = async () => {
		const res = await fetch(`${PRODUCT_URL}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `jwt ${user.jwt}`
			},
			body: JSON.stringify({
				name: name,
				desc: desc,
				price: parseFloat(price),
				cat: null
			})
		})
		const result = await res.json()

		console.log(result)
	}

	return(
		<>
			<TextField id="outlined-basic" label="Name" variant="outlined" onChange={(e) => {setName(e.target.value)}}/>
			<TextField id="outlined-basic" label="Desc" variant="outlined" onChange={(e) => {setDesc(e.target.value)}}/>
			<TextField id="outlined-basic" label="Price" variant="outlined" type="number" onChange={(e) => {setPrice(e.target.value)}}/>
			<Button variant="contained" onClick={onAdd}>Add product</Button>
		</>
	)
}
