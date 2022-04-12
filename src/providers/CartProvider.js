import { createContext, useEffect, useState } from "react";

export const CartContext = createContext([])

export default function CartProvider ({children})  {
	const [cart, setCart] = useState([])
	useEffect(() => {
		console.log(cart)
	}, [cart])

	const addItem = (productUuid) => {
		const f = cart.some(e => e.product_uuid === productUuid)
		if (f) {
			const productIndex = cart.findIndex((obj => obj.product_uuid === productUuid));
			const productsInCart = [...cart]
			productsInCart[productIndex].quantity++
			
			setCart(productsInCart)
		} else {
			const x = {
				product_uuid: productUuid,
				quantity: 1
			}
			
			setCart((old) => [...old, x])
		}
	}

	const removeItem = () => {
	};

	return(
		<CartContext.Provider value={{cart, addItem, removeItem}}>
			{children}
		</CartContext.Provider>
	)
}
