import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { BASE_URL } from "../constant/BASE_URL";
import { useAuth } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";



const LoginPage = () => {
    const [error, setError] = useState("");

    const { login } = useAuth();
    const navigate = useNavigate();
    const onSubmit = async () => {
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        //validate the form data
        if (!email || !password) {
            setError("check submiting data");
            return;
        }
        //call the api to new register
        const response = await fetch(`${BASE_URL}users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
            })
        });

        if (!response.ok) {
            setError('User already exists!');
        }

        const token = await response.json();
        if (!token) {
            setError("incorrect token");
            return;
        }
        login(email, token);
        navigate('/');
    }
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    return (
        <Container>
            <Box sx={{display:'flex' , justifyContent:'center', alignItems:'center' , mt:4,  flexDirection:'column'}}>
                <Typography variant="h6">Login to Your Account</Typography>
                <Box sx={{ display: 'flex' , flexDirection:'column', gap:2,mt:2,border:1,borderColor:"#f5f5f5",p:2}}>
                    <TextField inputRef={emailRef} name="email" label="Email"/>
                    <TextField inputRef={passwordRef} type="password" name="password" label="Password" />
                    <Button onClick={onSubmit} variant="contained">Login</Button>
                    {error && <Typography sx={{color:'red'}}>{error}</Typography>}
                </Box>
            </Box>
        </Container>
    )
}
export default LoginPage;