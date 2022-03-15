import { createContext, useState } from "react";

export const UserContext = createContext({auth: false})

export default function UserProvider ({children})  {
	const [user, setUser] = useState({name: "", auth: false})

	const login = (name) => {
		setUser(() => ({
			name: name,
			auth: true
		}))
	}

	const logout = () => {
		setUser(() => ({
		  name: "",
		  auth: false,
		}));
	  };

	return(
		<UserContext.Provider value={{user, login, logout}}>
			{children}
		</UserContext.Provider>
	)
}
