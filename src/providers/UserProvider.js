import { createContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const UserContext = createContext({auth: false})

export default function UserProvider ({children})  {
	const [user, setUser] = useState({jwt: null})
	const [jwt, setJwt] = useLocalStorage("ec-jwt");

	useEffect(() => {
		if (jwt) {
			setUser(() => ({
				jwt: jwt
			}))
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const login = (token) => {
		setJwt(token)
		setUser(() => ({
			jwt: token
		}));
	}

	const logout = () => {
		setJwt(null)
		setUser(() => ({
			jwt: null
		}));
	};

	return(
		<UserContext.Provider value={{user, login, logout}}>
			{children}
		</UserContext.Provider>
	)
}
