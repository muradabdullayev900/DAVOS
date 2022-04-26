import React, {useState} from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { set_password } from '../../actions/auth';
import ErrorIcon from '@mui/icons-material/Error';
import { makeStyles } from '@mui/styles';
import validator from 'validator';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { green } from '@mui/material/colors';
import Typography from '@mui/material/Typography';

const theme = createTheme();

const useStyles = makeStyles((theme) => ({
  alert: {
    textAlign: 'left',
    fontSize: '12px',
    color: 'red',
  }
}));

const ChangePassword = ({set_password}) => {
    const classes = useStyles();
    const [formData, setFormData] = useState({
        current_password: '',
        new_password: '',
        re_new_password: '',
    });
    const [errors, setErrors] = useState({});
    const [errorsContent, setErrorsContent] = useState({});
    const [alerts, setAlerts] = useState({'InvalidPassword': false});
    const alertsContent = { 'InvalidPassword': 'Parolunuz düzgün deyil.', 'NewPassword': 'Parolunuz e-poçtunuza çox bənzəyir.'};
    const [successMessage, setSuccessMessage] = useState(false);


    const { current_password, new_password, re_new_password } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
      e.preventDefault();
      setAlerts({'InvalidPassword': false, 'NewPassword': false})
      if (validate(formData)) {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
          }
        };
        const body = JSON.stringify({ new_password, re_new_password, current_password });
        axios.post(`${process.env.REACT_APP_API_URL}/auth/users/set_password/`, body, config)
        .then(() => setSuccessMessage(true))
        .catch((err) => {
          if (err.response) {
            if (err.response.data.current_password == 'Invalid password.') {
              setAlerts({"InvalidPassword": true, "NewPassword": false});
            } else if (err.response.data.new_password == 'The password is too similar to the email.' ){
              setAlerts({"InvalidPassword": false, "NewPassword": true});
            }
          }
        }) 
      }
    };

    const handleDialogClose = () => {
      setSuccessMessage(false);
      return <Navigate to='/forum' />
    };

    const validate = () => {
      let errors = {"EnterCurPass": false, "EnterNewPass": false, "ConfirmNewPass": false, "equality": false}
      let errorsContent = {};
      let isValid = true;
      if (!current_password) {
        isValid = false;
        errors["EnterCurPass"] = true;
        errorsContent["EnterCurPass"] = "Hazırkı parolu daxil edin.";
      }
      if (new_password.length < 10) {
        isValid = false;
        errors["EnterNewPass"] = true;
        errorsContent["EnterNewPass"] = "Parol üçün 10 və daha artıq simvoldan istifadə edin.";
      }
      if (!re_new_password) {
        isValid = false;
        errors["ConfirmNewPass"] = true;
        errorsContent["ConfirmNewPass"] = "Yeni parolu təsdiq edin.";
      }
      if (new_password !== re_new_password) {
        isValid = false;
        errors["equality"] = true;
        errorsContent["equality"] = "Parollar uyğun gəlmədi. Yenidən cəhd edin.";
      }
      if (!validator.isStrongPassword(new_password, {minLowercase: 1,
        minUppercase: 1, minNumbers: 1, minSymbols: 1})) {
        isValid = false;
        errors["EnterNewPass"] = true;
        errorsContent["EnterNewPass"] = "Daha güclü parol seçin. Hərflərin (böyük və kiçik), rəqəmlərin və simvolların qarışığını sınayın.";
      }
      setErrors(errors);
      setErrorsContent(errorsContent);
      return isValid;
    }

    return (
      <Box component="form" noValidate onSubmit={e => onSubmit(e)} sx={{ mt: 3 }}>
        <Typography component="h1" variant="h4" align='center'>Parolu dəyişin</Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          name="current_password"
          label="Hazırkı parol"
          type="password"
          id="current_password"
          value={current_password}
          onChange = {e => onChange(e)}
          inputProps={{ minLength: 6 }}
        />
        {errors["EnterCurPass"] && <div className={classes.alert}> {<ErrorIcon fontSize="small"/>} {errorsContent["EnterCurPass"]} </div>}
        {alerts["InvalidPassword"] && <div className={classes.alert}>{<ErrorIcon fontSize="small"/>} {alertsContent["InvalidPassword"]}</div>}
        <TextField
          margin="normal"
          required
          fullWidth
          name="new_password"
          label="Yeni parol"
          type="password"
          id="new_password"
          value={new_password}
          onChange = {e => onChange(e)}
          inputProps={{ minLength: 6 }}
        />
        {errors["EnterNewPass"] && <div className={classes.alert}> {<ErrorIcon fontSize="small"/>} {errorsContent["EnterNewPass"]} </div>}
        {alerts["NewPassword"] && <div className={classes.alert}>{<ErrorIcon fontSize="small"/>} {alertsContent["NewPassword"]}</div>}
        <TextField
          margin="normal"
          required
          fullWidth
          name="re_new_password"
          label="Təsdiq edin"
          type="password"
          id="re_new_password"
          value={re_new_password}
          onChange = {e => onChange(e)}
          inputProps={{ minLength: 6 }}
        />
        {errors["ConfirmNewPass"] && <div className={classes.alert}> {<ErrorIcon fontSize="small"/>} {errorsContent["ConfirmNewPass"]} </div>}
        {errors["equality"] && <div className={classes.alert}> {<ErrorIcon fontSize="small"/>} {errorsContent["equality"]} </div>}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          >
          PAROLU DƏYİŞ
        </Button>
      <Dialog
        open={successMessage}
        onClose={handleDialogClose}
        PaperProps={{
          style: {
            backgroundColor: '#DDF3E2',
            textAlign: 'center',
            color: 'rgb(30, 70, 32)',
          },
        }}
      >
        <DialogTitle>
        <CheckCircleIcon style={{ color: green[500], fontSize: '2rem', verticalAlign: 'middle'}} />
        Parolunuz uğurla dəyişdirildi!</DialogTitle>
      </Dialog>
      </Box>
    );
};


export default connect(null, { set_password })(ChangePassword);