import { Link } from "react-router-dom";
import { useGetFetch } from "../hooks/useGetFetch"

export default function Products() {
	const {result, error, loading} = useGetFetch("http://localhost:3002/api/v1/product")

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

	console.log(result);

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
