import jwtDecode from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const UserContext = createContext({auth: false})

export default function UserProvider ({children})  {
	const [user, setUser] = useState({jwt: null, roles: [], isAdmin: false})
	const [jwt, setJwt] = useLocalStorage("ec-jwt");

	useEffect(() => {
		if (jwt) {
			const roles = jwtDecode(jwt).roles
			setUser(() => ({
				jwt: jwt,
				roles: jwt ? roles : [],
				isAdmin: roles.includes("ADMIN")
			}))
		}
	}, [jwt])


	const login = (token) => {
		setJwt(token)
		setUser(() => ({
			jwt: token
		}));
	}

	const logout = () => {
		setJwt(null)
		setUser(() => ({
			jwt: null,
			roles: [],
			isAdmin: false
		}));
	};

	return(
		<UserContext.Provider value={{user, login, logout}}>
			{children}
		</UserContext.Provider>
	)
}
