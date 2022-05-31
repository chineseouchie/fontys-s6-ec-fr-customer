import { useLocation } from "react-router-dom";

export default function OrderSuccess() {
	const location = useLocation();
	const order = location.state.order;
	return(
		<>
			Order placed.
			Order ID: {order.data.orderId}
		</>
	)
}
