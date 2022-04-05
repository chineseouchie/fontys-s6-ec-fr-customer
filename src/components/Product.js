import { useParams } from "react-router-dom";
import { useGetFetch } from "../hooks/useGetFetch"

export default function Products() {
	let params = useParams();
	const {result, error, loading} = useGetFetch(`http://localhost:3002/api/v1/product/${params.uuid}`)

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
