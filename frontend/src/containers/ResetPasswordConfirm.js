import React, {useState} from 'react';
import {Navigate, useParams} from 'react-router-dom';
import { connect } from 'react-redux';
import TextField from '@mui/material/TextField';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import LockResetIcon from '@mui/icons-material/LockReset';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { reset_password_confirm } from '../actions/auth';

const theme = createTheme();

const ResetPasswordConfirm = ({match, reset_password_confirm}) => {
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: ''
    });

    const {new_password, re_new_password} = formData;
    const {uid, token} = useParams();
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();

        //const uid = match.params.uid;
        //const token = match.params.token;

        reset_password_confirm(uid, token, new_password, re_new_password)
        setRequestSent(true)
    };

    // Is the user authenticated ?
    // Navigate them to the home page

    if (requestSent) {
        return <Navigate to='/' />
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
            <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockResetIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Şifrənin bərpası
                    </Typography>
                    <Box component='form' onSubmit={e => onSubmit(e)} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="new_password"
                            label="Yeni şifrə"
                            type="password"
                            id="password"
                            value={new_password}
                            onChange = {e => onChange(e)}
                            inputProps={{ minLength: 6 }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="re_new_password"
                            label="Yeni şifrəni təsdiq edin"
                            type="password"
                            id="password"
                            value={re_new_password}
                            onChange = {e => onChange(e)}
                            inputProps={{ minLength: 6 }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                        Şifrəni dəyiş
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);