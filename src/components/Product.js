import { useParams } from "react-router-dom";
import { useGetFetch } from "../hooks/useGetFetch"

export default function Products() {
	let params = useParams();
	const PRODUCT_URL = process.env.REACT_APP_PRODUCT_URL
	const {result, error, loading} = useGetFetch(`${PRODUCT_URL}/${params.uuid}`)

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
			<div >
				{result.data.name} - {result.data.description} - €{result.data.price}
			</div>
		</>
	)
}
