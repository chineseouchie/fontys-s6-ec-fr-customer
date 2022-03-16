import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";

export default function Login() {
	const { user } = useContext(UserContext)
	const navigate = useNavigate()

	if (user.jwt) {
		navigate("/")
	}

	return(
		<>
			Login
		</>
	)
}
