import { useContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Auth/Register"
import Login from "./components/Auth/Login";
import Nav from "./components/Nav/Nav";
import Products from "./components/Product/Products";
import Product from "./components/Product/Product";
import { UserContext } from "./providers/UserProvider";
import Order from "./components/Order/Order";
import Cart from "./components/Cart/Cart";
import AddProducts from "./components/Product/AddProducts";

function App() {
	const { user } = useContext(UserContext)

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
						<Route path="/products/add" element={<AddProducts />} />
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
