import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { BASE_URL } from "../constant/BASE_URL";



const RegisterPage = () => {
    const [error, setError] = useState("");
    const onSubmit = async () => {
        const firstName = firstNameRef.current?.value;
        const lastName = lastNameRef.current?.value;
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        //call the api to new register
        const response = await fetch(`${BASE_URL}users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password,
            })
        });
        if (!response.ok) {
            setError('User already exists!');
        }
        const data = await response.json();
        console.log(data);
    }
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    return (
        <Container>
            <Box sx={{display:'flex' , justifyContent:'center', alignItems:'center' , mt:4,  flexDirection:'column'}}>
                <Typography variant="h6">Register New Account</Typography>
                <Box sx={{ display: 'flex' , flexDirection:'column', gap:2,mt:2,border:1,borderColor:"#f5f5f5",p:2}}>
                    <TextField inputRef={firstNameRef} name="fullName" label="Full Name" />
                    <TextField inputRef={lastNameRef} name="fullName" label="Full Name" />
                    <TextField inputRef={emailRef} name="email" label="Email"/>
                    <TextField inputRef={passwordRef} type="password" name="password" label="Password" />
                    <Button onClick={onSubmit} variant="contained">Register</Button>
                    {error && <Typography sx={{color:'red'}}>{error}</Typography>}
                </Box>
            </Box>
        </Container>
    )
}
export default RegisterPage;