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
import validator from 'validator';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { signup } from '../actions/auth';
import { makeStyles } from '@material-ui/core/styles';
import ErrorIcon from '@mui/icons-material/Error';


const theme = createTheme();

const useStyles = makeStyles((theme) => ({
    alert: {
      textAlign: 'left',
      fontSize: '12px',
      color: 'red',
    }
  }));

const Signup = ({ signup, isAuthenticated }) => {
    const classes = useStyles();
    const [accountCreated, setAccountCreated] = useState(false)
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        re_password: ''
    });

    const [errors, setErrors] = useState(false);
    const [errorsContent, setErrorsContent] = useState('');
    const [alerts, setAlerts] = useState({'email': false, 'password': false});
    const alertsContent = { 'email': 'Bu e-poçtla istifadəçi hesabı artıq mövcuddur.', 'password': 'Parolunuz e-poçtunuza çox bənzəyir.'};

    const { first_name, last_name, email, password, re_password } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        setAlerts({'email': false, 'password': false})
        if (validate()) {
            signup(first_name, last_name, email, password, re_password)
            .then((res) => {
              console.log(res)
              if (res.hasOwnProperty('email')) {
                if (res.email == 'user account with this email already exists.') {
                    setAlerts({"email": true, "password": false});
                }
              } else if (res.hasOwnProperty('password')) {
                if (res.password == 'The password is too similar to the email.') {
                  setAlerts({"email": false, "password": true});
              }
              } else {
                setAccountCreated(true)
              }
            })
}
    };

    const validate = () => {
        let errors = {};
        let errorsContent = {"name":false,"email":false,"password":false};
        let isValid = true;
        if (!first_name || !last_name){
          isValid = false;
          errors["name"] = true;
          errorsContent["name"] = "Ad və Soyad daxil edin.";
        }
        if (!validator.isEmail(email)) {
          isValid = false;
          errors["email"] = true;
          errorsContent["email"] = "E-poçt ünvanı etibarlı deyil.";
        }
        if (email.length < 6){
          isValid = false;
          errors["email"] = true;
          errorsContent["email"] = "E-poçt ünvanı üçün 6 və daha artıq simvoldan istifadə edin.";
        }
        if (!email) {
          isValid = false;
          errors["email"] = true;
          errorsContent["email"] = "E-poçt ünvanı daxil edin.";
        }
        if (!validator.isStrongPassword(password, {minLowercase: 1,
          minUppercase: 1, minNumbers: 1, minSymbols: 1})) {
          isValid = false;
          errors["password"] = true;
          errorsContent["password"] = "Daha güclü parol seçin. Hərflərin (böyük və kiçik), rəqəmlərin və simvolların qarışığını sınayın.";
        }
        if (password.length < 10){
          isValid = false;
          errors["password"] = true;
          errorsContent["password"] = "Parol üçün 10 və daha artıq simvoldan istifadə edin.";
        }
        if (re_password !== password) {
          isValid = false;
          errors["password"] = true;
          errorsContent["password"] = "Parollar uyğun gəlmədi. Yenidən cəhd edin.";
        }
        if (!re_password) {
          isValid = false;
          errors["password"] = true;
          errorsContent["password"] = "Parolunuzu təsdiq edin.";
        }
        if (!password) {
          isValid = false;
          errors["password"] = true;
          errorsContent["password"] = "Parol daxil edin.";
        }
        setErrors(errors);
        setErrorsContent(errorsContent);
        return isValid;
      }
    

    // Is the user authenticated ?
    // Navigate them to the home page

    if (isAuthenticated) {
        return <Navigate to='/' />
    }
    if (accountCreated) {
        return <Navigate to={"/verify"} state={{ email }}/>
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
            <CssBaseline />
                <Box
                    sx={{
                        marginTop: 5,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                }}
                >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Qeydiyyat
                </Typography>
                <Box component="form" noValidate onSubmit={e => onSubmit(e)} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        autoComplete="given-name"
                        name="first_name"
                        required
                        fullWidth
                        id="first_name"
                        label="Ad"
                        value={first_name}
                        onChange={e => onChange(e)}
                        autoFocus
                        />
                        {errors["name"] && <div className={classes.alert}> {<ErrorIcon fontSize="small"/>} {errorsContent["name"]} </div>}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        required
                        fullWidth
                        id="last_name"
                        label="Soyad"
                        name='last_name'
                        value={last_name}
                        onChange={e => onChange(e)}
                        autoComplete="family-name"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        id="email"
                        label="E-poçt"
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                        autoComplete="email"
                        />
                        {errors["email"] && <div className={classes.alert}>{<ErrorIcon fontSize="small"/>} {errorsContent["email"]}</div>}
                        {alerts["email"] && <div className={classes.alert}>{<ErrorIcon fontSize="small"/>} {alertsContent["email"]}</div>}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        name='password'
                        value={password}
                        onChange={e => onChange(e)}
                        label="Parol"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        inputProps={{ minLength: 6 }}
                        />
                        {errors["password"] && <div className={classes.alert}>{<ErrorIcon fontSize="small"/>} {errorsContent["password"]}</div>}
                        {errors["EnterPassword"] && <div className={classes.alert}>{<ErrorIcon fontSize="small"/>} {errorsContent["EnterPassword"]}</div>}
                        {alerts["password"] && <div className={classes.alert}>{<ErrorIcon fontSize="small"/>} {alertsContent["password"]}</div>}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        name='re_password'
                        value={re_password}
                        onChange={e => onChange(e)}
                        label="Parolu təsdiqlə"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        inputProps={{ minLength: 6 }}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    QEYDİYYATDAN KEÇ
                </Button>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link href="/login" variant="body2">
                        Əvəzinə daxil olun
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
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { signup })(Signup);