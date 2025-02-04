import { createContext, useContext } from "react";
import { CartItem } from "../../types/cartItem";

interface CartContextType{
    cartItems: CartItem[];
    totalAmount: number;
    addItemToCart: (productId: string) => void;
    updateItemInCart: (productId: string, quantity: number) => void;
    removeItemFromCart: (productId: string) => void;
    clearCart: () => void;
    isCleared: boolean;
}
export const CartContext = createContext<CartContextType>({
    cartItems: [],
    totalAmount: 0,
    addItemToCart: () => {},
    updateItemInCart: () => {},
    removeItemFromCart: () => { },
    clearCart: () => { },
    isCleared:false,
});
export const useCart = () => useContext(CartContext);