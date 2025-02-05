import { Box, Container, Typography } from "@mui/material";
import { useAuth } from "../context/Auth/AuthContext";
import { useEffect } from "react";



const MyOrdersPage = () => {
    const { getMyOrders, myOrders } = useAuth();
    useEffect(() => {
        getMyOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <Container fixed sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2, mt: 2 }}>
            <Typography>My Ordres</Typography>
            {myOrders.map(({address,orderItems,totalAmount}) => (
                <Box sx={{borderRadius:2,border:1,borderColor:'gray',padding:2}}>
                    <Typography>addres: {address}</Typography>
                    <Typography>orders: {orderItems.length}</Typography>
                    <Typography>Total: {totalAmount}</Typography>
                </Box>
            ))}
        </Container>
    )
}
export default MyOrdersPage;