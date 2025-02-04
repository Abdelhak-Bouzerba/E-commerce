import { Box, Button,Container, TextField, Typography } from "@mui/material";
import { useCart } from "../context/Cart/CartContext";
import { useRef } from "react";

const CheckoutPage = () => {
    const { totalAmount, cartItems, } = useCart();
    const addressRef = useRef<HTMLInputElement>(null);

    return (
        <Container fixed sx={{ mt: 2,display:'flex',flexDirection:'column',gap:2}}>
            <Box display={'flex'} justifyContent={'space-between'} mb={2}>
                <Typography variant="h5">Checkout</Typography>
            </Box>
            <TextField inputRef={addressRef} label="Delivery Address" name="address" fullWidth/>
                <Box display={"flex"} flexDirection={"column"} gap={2} sx={{border: 1, borderColor: '#f2f2f2', borderRadius: 5, padding: 1}}>
                    {cartItems.map((item) => (
                        <Box
                            display={"flex"}
                            flexDirection={"row"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                            width={"100%"}
                        >
                            <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={1} width={'100%'}>
                                <img src={item.image} width={50}/>
                                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'100%'}}>
                                    <Typography variant="h6">{item.title}</Typography>
                                    <Typography>{item.quantity} X {item.unitPrice}$</Typography>
                                </Box>
                            </Box>
                        </Box>
                    ))}
                    <Box>
                        <Typography variant="h6" sx={{textAlign:'right'}}>Total Amount:{totalAmount.toFixed(2)}$</Typography>
                    </Box>
            </Box>
            <Button variant="contained" fullWidth>Pay Now</Button>
        </Container>
    );
};
export default CheckoutPage;
