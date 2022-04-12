import { useContext, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register"
import Login from "./components/Login";
import Nav from "./components/Nav";
import Products from "./components/Products";
import Product from "./components/Product";
import { UserContext } from "./providers/UserProvider";
import Order from "./components/Order";
import Cart from "./components/Cart";

function App() {
	const { user } = useContext(UserContext)
	const [cart, setCart] = useState([])

	return (
		<div className="App">
			<Router>
				<Nav/>
				<main>
					<Routes>
						<Route path="/" element={
							<>
								Ecommerce
							</>} />
						<Route path="/register" element={user.jwt ? <Login /> : <Register />} />
						<Route path="/login" element={<Login />} />
						<Route path="/products" element={<Products />} />
						<Route path="/product/:uuid" element={<Product />} />
						<Route path="/order" element={user.jwt ? <Order /> : <Login />} />
						<Route path="/cart" element={<Cart />} />
					</Routes>
				</main>
			</Router>
		</div>
	);
}

export default App;
