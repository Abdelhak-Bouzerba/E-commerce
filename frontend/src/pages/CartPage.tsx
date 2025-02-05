import { Box, Button, ButtonGroup, Container, Typography } from "@mui/material";
import { useCart } from "../context/Cart/CartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
    const { totalAmount, cartItems, updateItemInCart, removeItemFromCart, clearCart, isCleared } = useCart();
    const navigate = useNavigate();

    const handleQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            return;
        }
        updateItemInCart(productId, quantity);
    }
    const handleRemoveItem = (productId: string) => {
        removeItemFromCart(productId);
    }
    const handleClearCart = () => {
        clearCart();
    }
    return (
        <Container fixed sx={{ mt: 2 }}>
            <Box display={'flex'} justifyContent={'space-between'} mb={2}>
                <Typography variant="h5">My Cart</Typography>
                {!isCleared ? (<Button onClick={handleClearCart}>Clear Cart</Button>):(<Box></Box>)}
            </Box>
            {cartItems.length ?
                (<Box display={"flex"} flexDirection={"column"} gap={2}>
                    {cartItems.map((item) => (
                        <Box
                            display={"flex"}
                            flexDirection={"row"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                            sx={{ border: 1, borderColor: '#f2f2f2', borderRadius: 5, padding: 1 }}
                        >
                            <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={1}>
                                <img src={item.image} width={50} alt="" />
                                <Box>
                                    <Typography variant="h6">{item.title}</Typography>
                                    <Typography>{item.quantity} X {item.unitPrice}$</Typography>
                                    <Button onClick={() => handleRemoveItem(item.productId)}>Remove Item</Button>
                                </Box>
                            </Box>
                            <ButtonGroup variant="contained" aria-label="Basic button group">
                                <Button onClick={() => handleQuantity(item.productId, item.quantity - 1)}>-</Button>
                                <Button onClick={() => handleQuantity(item.productId, item.quantity + 1)}>+</Button>
                            </ButtonGroup>
                        </Box>
                    ))}
                    <Box sx={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                        <Typography variant="h4">Total Amount:{totalAmount.toFixed(2)}$</Typography>
                        <Button variant="contained" onClick={() => navigate('/checkout')}>go to checkout</Button>
                    </Box>
                </Box>) : (<Typography>cart is empty</Typography>)
            }
        </Container>
    );
};
export default CartPage;
