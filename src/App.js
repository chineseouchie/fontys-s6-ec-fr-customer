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
import Admin from "./components/Admin/Admin";
import OrderSuccess from "./components/Order/OrderSuccess";

function App() {
	const { user } = useContext(UserContext)

	return (
		<div className="App">
			<Router>
				<Nav/>
				<main>
					<Routes>
						<Route path="/" element={<>Ecommerce</>} />
						<Route path="/login" element={<Login />} />
						<Route path="/products" element={<Products />} />
						<Route path="/product/:uuid" element={<Product />} />
						<Route path="/cart" element={<Cart />} />

						<Route path="/register" element={user.jwt ? <Login /> : <Register />} />
						<Route path="/order" element={user.jwt ? <Order /> : <Login />} />
						<Route path="/order/success" element={user.jwt ? <OrderSuccess /> : <Products />} />
						
						<Route path="/admin" element={user.isAdmin ? <Admin /> : <Login />} />
						<Route path="/admin/add-product" element={user.isAdmin ? <AddProducts /> : <Login />} />
					</Routes>
				</main>
			</Router>
		</div>
	);
}

export default App;
