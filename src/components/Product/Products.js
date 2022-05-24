import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { useGetFetch } from "../../hooks/useGetFetch"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../providers/CartProvider";
import { useContext } from "react";

export default function Products() {
	const PRODUCT_URL = process.env.REACT_APP_PRODUCT_URL
	const [products, error, loading] = useGetFetch(PRODUCT_URL +"/")
	const navigate = useNavigate();
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

	console.log(products)
	return(
		<>
			<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
				{products.data.map((product) => (
					<Grid item mt={1} xs={12} sm={4} md={4} key={product.product_uuid}>
						<Card sx={{minWidth: 275}} >
							<div style={{cursor: "pointer"}} onClick={() => navigate(`/product/${product.product_uuid}`)}>
								<CardMedia
									component="img"
									height="140"
									image={product.image_url}
									sx={{
										objectFit: "contain",
										transition: "transform 100ms ease-in-out",
										"&:hover": {
											transform: "scale(1.2)"
										}
									}}
									alt={product.name}/>

								<CardContent>
									<Typography gutterBottom variant="h5" component="div">
          							{product.name}
									</Typography>
									<Typography variant="body2" color="text.secondary">
										{product.description}
									</Typography>
								</CardContent>
							</div>

							<CardActions sx={{display: "flex", justifyContent: "end"}}>
								<Button size="small" onClick={() => addItem(product)}><AddShoppingCartIcon/></Button>
							</CardActions>
						</Card>
					</Grid>
				))}
			</Grid>
		</>
	)
}
