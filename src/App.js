import { useContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register"
import Login from "./components/Login";
import Nav from "./components/Nav";
import { UserContext } from "./providers/UserProvider";

function App() {
	const { user} = useContext(UserContext)
	return (
		<div className="App">
			<Router>
				<Nav/>
				<main>
					<Routes>
						<Route path="/" element={
							<>
								root
							</>} />
						<Route path="/register" element={user.jwt ? <Login/> : <Register/>} />
						<Route path="/login" element={<Login/>} />
					</Routes>
				</main>
			</Router>
		</div>
	);
}

export default App;
