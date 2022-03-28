import React from 'react';
import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme();


const Home = () => {
    const navigate = useNavigate();

    const handleClick = pageURL => {
        navigate(pageURL);
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="sm">
                <Typography
                sx={{marginTop: 10}}
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
                >
                DAVOS Forum
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" paragraph>
                Soruş! Müzakirə et! Öyrən!
                </Typography>
                <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
                >
                <Button variant="contained" onClick={() => handleClick("/login")}>BAŞLA</Button>
                </Stack>
            </Container>
        </ThemeProvider>
    )
};

export default Home;