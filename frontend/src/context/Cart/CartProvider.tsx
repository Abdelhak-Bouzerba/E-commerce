import { FC, PropsWithChildren , useEffect, useState } from "react";
import  {CartContext}  from "./CartContext";
import { CartItem } from "../../types/cartItem";
import { BASE_URL } from "../../constant/BASE_URL";
import { useAuth } from "../Auth/AuthContext";

const CartProvider: FC<PropsWithChildren> = ({ children }) => {
    const {token} = useAuth();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!token) {
            return;
        }

        const fetchCart = async() => {
            const response = await fetch(`${BASE_URL}carts`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                setError("Failed to fetch user cart ,please try again");
            }
            const cart = await response.json();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const cartMapped = cart.items.map(({product, quantity , unitPrice}:{product:any,quantity:number,unitPrice:number}) => ({
                productId: product._id,
                title:product.title,
                image: product.image,
                unitPrice,
                quantity,
            }))
            setCartItems(cartMapped);
            setTotalAmount(cart.totalAmount);
        } 
        fetchCart();
    }, [token])

    const addItemToCart = async (productId:string) => {
        try {
            const response = await fetch(`${BASE_URL}carts/items`, {
                method:'POST',
                headers: {
                    'content-type': 'application/json',
                    'Authorization':`Bearer ${token}`,
                },
                body: JSON.stringify({
                    productId,
                    quantity:1,
                })
            })
            if (!response.ok) {
                setError('failed to add to cart');
            }

            const cart = await response.json();

            if (!cart) {
                setError("Failed to parse cart data");
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const cartMapped = cart.items.map(({product, quantity , unitPrice}:{product:any,quantity:number,unitPrice:number}) => ({
                productId: product._id,
                title:product.title,
                image: product.image,
                unitPrice,
                quantity,
            }))
            setCartItems([...cartMapped])
            setTotalAmount(cart.totalAmount);
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <CartContext.Provider value={{cartItems ,totalAmount , addItemToCart}}>
            {children}
        </CartContext.Provider>
    )
}
export default CartProvider;