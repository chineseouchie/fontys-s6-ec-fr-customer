import { Link } from "react-router-dom";
import { useGetFetch } from "../../hooks/useGetFetch"

export default function Products() {
	const PRODUCT_URL = process.env.REACT_APP_PRODUCT_URL
	const {result, error, loading} = useGetFetch(PRODUCT_URL +"/")

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

	return(
		<>
			{result.data.map((product) => (
				<div key={product.product_uuid}>
					<Link to={`/product/${product.product_uuid}`}>
						{product.name} - {product.description} - €{product.price}
					</Link>
				</div>
			))}
		</>
	)
}
