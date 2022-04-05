import { useContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register"
import Login from "./components/Login";
import Nav from "./components/Nav";
import Products from "./components/Products";
import Product from "./components/Product";
import { UserContext } from "./providers/UserProvider";

function App() {
	const { user } = useContext(UserContext)
	return (
		<div className="App">
			<Router>
				<Nav />
				<main>
					<Routes>
						<Route path="/" element={
							<>
								Ecommerce test
							</>} />
						<Route path="/register" element={user.jwt ? <Login /> : <Register />} />
						<Route path="/login" element={<Login />} />
						<Route path="/products" element={<Products />} />
						<Route path="/product/:uuid" element={<Product />} />
					</Routes>
				</main>
			</Router>
		</div>
	);
}

export default App;
