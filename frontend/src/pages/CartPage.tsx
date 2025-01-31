import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constant/BASE_URL";
import { useAuth } from "../context/Auth/AuthContext";





const CartPage = () => {

    const { token } = useAuth();
    const [cart, setCart] = useState();
    const [error, setError] = useState("");

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
            const data = await response.json();
            setCart(data);
        } 
        fetchCart();
    }, [token])
    
    return(
        <Container>
            <Typography variant="h4">My Cart</Typography>
        </Container>
    )
}
export default CartPage;