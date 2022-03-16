import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export const UserContext = createContext({auth: false})

export default function UserProvider ({children})  {
	const [user, setUser] = useState({jwt: null})
	const [cookies, setCookie, removeCookie] = useCookies(["ec_jwt"]);
	useEffect(() => {
		if (cookies?.ec_jwt) {
			setUser(() => ({
				jwt: cookies?.ec_jwt
			}))
		}
	}, [])

	const login = (jwt) => {
		setCookie("ec_jwt", jwt)
		setUser(() => ({
			jwt: jwt
		}))
	}

	const logout = () => {
		removeCookie("ec_jwt")
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
