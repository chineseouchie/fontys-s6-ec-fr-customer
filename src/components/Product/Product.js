import { Box, Button, Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { useGetFetch } from "../../hooks/useGetFetch"
import { CartContext } from "../../providers/CartProvider";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

export default function Products() {
	let params = useParams();
	const PRODUCT_URL = process.env.REACT_APP_PRODUCT_URL
	const {result, error, loading} = useGetFetch(`${PRODUCT_URL}/${params.uuid}`)
	const { addItem } = useContext(CartContext)
	if (loading) {
		return(
			<></>
		)
	}

	if (error) {
		return(
			<>
				Something went wrong.
			</>
		)
	}

	console.log(result);

	const product = result.data;

	return(
		<>
			<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
				<Grid item mt={1} xs={12} sm={4} md={4}>
					<Box component="img" src={product.image_url} alt={product.name}/>
				</Grid>
				<Grid item m="auto" xs={12} sm={4} md={4} >
					<Typography gutterBottom variant="h5" component="div">
						{product.name}
					</Typography>
					<Typography component="div">
						{product.description}
					</Typography>
					<Typography  component="div">
						€{product.price}
					</Typography>
					<Button variant="contained" onClick={()=>addItem(result.data)}><AddShoppingCartIcon/> Add to cart</Button>
				</Grid>
			</Grid>
			
		</>
	)
}
