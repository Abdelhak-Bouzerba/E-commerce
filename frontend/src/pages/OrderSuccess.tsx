import {  CheckCircleOutline } from "@mui/icons-material";
import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";



const OrderSuccess = () => {
    const navigate = useNavigate();
    return (
        <Container fixed sx={{ display: 'flex', flexDirection: 'column',justifyContent:'center',alignItems: 'center', gap: 2, mt: 2 }}>
            <CheckCircleOutline color="success" sx={{fontSize:80}}/>
            <Typography variant="h4">Thanks for Your Order</Typography>
            <Typography variant="h6">We started processing it,and we will get back to you soon</Typography>
            <Button onClick={()=> navigate('/')}>Go to Home</Button>
        </Container>
    )
}
export default OrderSuccess;