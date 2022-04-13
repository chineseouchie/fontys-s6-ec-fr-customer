import { createContext, useEffect, useState } from "react";

export const CartContext = createContext([])

export default function CartProvider ({children})  {
	const [cart, setCart] = useState([])
	
	useEffect(() => {
		console.log(cart)
	}, [cart])

	const addItem = (product) => {
		const f = cart.some(e => e.product_uuid === product.product_uuid)
		if (f) {
			const productIndex = cart.findIndex((obj => obj.product_uuid === product.product_uuid));
			const productsInCart = [...cart]
			productsInCart[productIndex].quantity++
			
			setCart(productsInCart)
		} else {
			const x = {
				product_uuid: product.product_uuid,
				product_name: product.name,
				quantity: 1
			}
			
			setCart((old) => [...old, x])
		}
	}

	const removeItem = (e) => {
		const productsInCart = [...cart]
		const newa = productsInCart.filter(i => i.product_uuid !== e)

		setCart(newa)
	};

	return(
		<CartContext.Provider value={{cart, addItem, removeItem}}>
			{children}
		</CartContext.Provider>
	)
}
