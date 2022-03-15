import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register"
import Login from "./components/Login";
import Nav from "./components/Nav";
import { useState } from "react";

function App() {
	const [loggedIn, setLoggedIn] = useState(false)
	return (
		<div className="App">
			<Router>
				<Nav loggedIn={loggedIn}/>
				<main>
					<Routes>
						<Route path="/" element={
							<>
								root
							</>} />
						<Route path="/register" element={<Register/>} />
						<Route path="/login" element={<Login/>} />
					</Routes>
				</main>
			</Router>
		</div>
	);
}

export default App;
