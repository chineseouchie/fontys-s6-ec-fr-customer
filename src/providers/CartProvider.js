import { useSnackbar } from "notistack";
import { createContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const CartContext = createContext([])

export default function CartProvider ({children})  {
	const [cart, setCart] = useState([])
	const [localCart, setLocalCart] = useLocalStorage("ec-cart");
	const { enqueueSnackbar } = useSnackbar();
	useEffect(() => {
		if (localCart) {
			setCart(localCart)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		setLocalCart(cart)
	}, [cart, setLocalCart])



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
				image_url: product.image_url,
				quantity: 1
			}

			setCart((old) => [...old, x])
		}

		enqueueSnackbar(`The item was added to your cart`, {
			variant: "success",
			autoHideDuration: 1000,
		});
	}

	const removeItem = (e) => {
		const productsInCart = [...cart]
		const products = productsInCart.filter(i => i.product_uuid !== e)

		setCart(products)
	};

	return(
		<CartContext.Provider value={{cart, addItem, removeItem}}>
			{children}
		</CartContext.Provider>
	)
}
