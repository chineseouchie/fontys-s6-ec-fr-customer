import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { useGetFetch } from "../../hooks/useGetFetch"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../providers/CartProvider";
import { useContext } from "react";

export default function Products() {
	const PRODUCT_URL = process.env.REACT_APP_PRODUCT_URL
	const {result, error, loading} = useGetFetch(PRODUCT_URL +"/")
	const navigate = useNavigate();
	const { addItem } = useContext(CartContext)
	if (loading) {
		return(
			<>
				Loading...
			</>
		)
	}

	if (error) {
		return(
			<>
				Something went wrong.
			</>
		)
	}

	const toProduct = (uuid) => {
		navigate(`/product/${uuid}`)
	}

	console.log(result)
	return(
		<>
			<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
				{result.data.map((product) => (
					<Grid item mt={1} xs={12} sm={4} md={4} key={product.product_uuid}>
						<Card sx={{minWidth: 275}}>
							<CardMedia
								component="img"
								height="140"
								image={product.image_url}
								sx={{
									objectFit: "contain"
								}}
								alt="green iguana"/>

							<CardContent>
								<Typography gutterBottom variant="h5" component="div">
          							{product.name}
								</Typography>
								<Typography variant="body2" color="text.secondary">
									{product.description}
								</Typography>
							</CardContent>

							<CardActions sx={{
								display: "flex",
								justifyContent: "end"
							}}>
								<Button size="small" onClick={() => toProduct(product.product_uuid)}>Open</Button>
								<Button size="small" onClick={() => addItem(product)}><AddShoppingCartIcon/></Button>
							</CardActions>
						</Card>
					</Grid>
				))}
			</Grid>
		</>
	)
}
