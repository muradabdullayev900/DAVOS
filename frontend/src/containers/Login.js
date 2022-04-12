import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import TextField from '@mui/material/TextField';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { login } from '../actions/auth';
import { makeStyles } from '@mui/styles';
import Alert from '@mui/material/Alert';
import ErrorIcon from '@mui/icons-material/Error';


const theme = createTheme();

const useStyles = makeStyles((theme) => ({
    alert: {
      textAlign: 'left',
      fontSize: '12px',
      color: 'red',
    }
  }));

const Login = ({ login, isAuthenticated, failed }) => {
    const classes = useStyles();
    const [errors, setErrors] = useState({});
    const [errorsContent, setErrorsContent] = useState({});
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [alertsContent, setAlertsContent] = useState('');

    const {email, password} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const validate = () => {
        let errors = {"EnterEmail": false, "EnterPassword": false}
        let errorsContent = {};
        let isValid = true;
        if (!email) {
          isValid = false;
          errors["EnterEmail"] = true;
          errorsContent["EnterEmail"] = "E-poçt ünvanı daxil edin.";
        }
        if (!password) {
          isValid = false;
          errors["EnterPassword"] = true;
          errorsContent["EnterPassword"] = "Parol daxil edin.";
        }
        setErrors(errors);
        setErrorsContent(errorsContent);
        return isValid;
      }

    const onSubmit = e => {
        e.preventDefault();
        setAlertsContent('');
        if (validate()) {
            login(email, password)
            if (failed) {
                setAlertsContent("E-poçt və ya parol yanlışdır.");
            }
        }
    };

    // Is the user authenticated ?
    // Navigate them to the home page

    if (isAuthenticated) {
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
                    <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        GİRİŞ
                    </Typography>
                    <Box component='form' onSubmit={e => onSubmit(e)} noValidate sx={{ mt: 1 }}>
                        <TextField 
                            margin='normal'
                            required
                            fullWidth
                            id='email'
                            label="E-poçt"
                            type="email"
                            name="email"
                            value={email}
                            onChange = {e => onChange(e)}
                            autoFocus
                        />
                         {errors["EnterEmail"] && <div className={classes.alert}> {<ErrorIcon fontSize="small"/>} {errorsContent["EnterEmail"]} </div>}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Parol"
                            type="password"
                            id="password"
                            value={password}
                            onChange = {e => onChange(e)}
                            inputProps={{ minLength: 6 }}
                        />
                        {errors["EnterPassword"] && <div className={classes.alert}>{<ErrorIcon fontSize="small"/>} {errorsContent["EnterPassword"]}</div>}
                        {alertsContent && <Alert severity='error'>{alertsContent}</Alert>}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                        DAXİL OL
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="/reset-password" variant="body2">
                                    Parolu unutmusunuz?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    Hesab yaradın
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    failed: state.auth.failed
})

export default connect(mapStateToProps, { login })(Login);