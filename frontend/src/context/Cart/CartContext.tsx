import { createContext, useContext } from "react";
import { CartItem } from "../../types/cartItem";

interface CartContextType{
    cartItems: CartItem[];
    totalAmount: number;
    addItemToCart: (productId: string) => void;
    updateItemInCart: (productId: string, quantity: number) => void;
    removeItemFromCart: (productId: string) => void;
}
export const CartContext = createContext<CartContextType>({
    cartItems: [],
    totalAmount: 0,
    addItemToCart: () => {},
    updateItemInCart: () => {},
    removeItemFromCart: () => {},

});
export const useCart = () => useContext(CartContext);