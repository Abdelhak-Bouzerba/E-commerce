import Grid from '@mui/material/Grid';
import Container from "@mui/material/Container";
import { ProductCard } from "../components/ProductCard";
import { useEffect, useState } from 'react';
import { Product } from '../types/Product';
import { BASE_URL } from '../constant/BASE_URL';
import { Box } from '@mui/material';




const HomePage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}products`);
                const data = await response.json();
                setProducts(data);
            } catch {
                setError(true);
            }
        }
        fetchData();
    }, [])
    if (error) {
        return <Box>Something went wrong please try again !</Box>
    }
    return (
        <Container sx={{ mt: 2 }}>
            <Grid container spacing={2}>
                {products.map((p) => {
                    return (
                        <Grid item md={4}>
                            <ProductCard   {...p} />
                        </Grid>
                    )
                })}
            </Grid>
        </Container>
    )
}
export default HomePage; 