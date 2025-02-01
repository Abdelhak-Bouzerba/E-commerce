import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constant/BASE_URL";
import { useAuth } from "../context/Auth/AuthContext";
import { useCart } from "../context/Cart/CartContext";





const CartPage = () => {

    const { token } = useAuth();
    const { totalAmount, cartItems } = useCart();
    const [error, setError] = useState("");
    
    return(
        <Container>
            <Typography variant="h4">My Cart</Typography>
            {cartItems.map((item) => (
                <Box>{item.Title}</Box>
            ))}
        </Container>
    )
}
export default CartPage;