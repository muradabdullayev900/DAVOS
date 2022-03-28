import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { verify } from '../actions/auth';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const Activate = ({ verify, match }) => {
    const [verified, setVerified] = useState(false);
    const {uid, token} = useParams();
    const verify_account = e => {
        // const uid = uid;
        // const token = token;

        verify(uid, token);
        setVerified(true);
    };

    if (verified) {
        return <Navigate to='/' />
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
                Hesabınızı təsdiqləyin:
                </Typography>
                <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
                >
                <Button variant="contained" onClick={verify_account}>Təsdiqlə</Button>
                </Stack>
            </Container>
        </ThemeProvider>
    );
};

export default connect(null, { verify })(Activate);