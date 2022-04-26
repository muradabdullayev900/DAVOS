import React, {useState} from 'react';
import { connect } from 'react-redux';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { delete_user, logout } from '../../actions/auth';
import ErrorIcon from '@mui/icons-material/Error';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { green } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const useStyles = makeStyles((theme) => ({
  alert: {
    textAlign: 'left',
    fontSize: '12px',
    color: 'red',
  },
  header: {
    fontWeight: 600
}
}));

const DeleteAccount = ({logout, delete_user}) => {
    const classes = useStyles();
    const [formData, setFormData] = useState({
        current_password: '',
    });
    const [errors, setErrors] = useState({});
    const [errorsContent, setErrorsContent] = useState({});
    const [alerts, setAlerts] = useState({'password': false});
    const alertsContent = { 'password': 'Parolunuz düzgün deyil.'};
    const [successMessage, setSuccessMessage] = useState(false);
    const [reason, setReason] = useState('')


    const { current_password } = formData;

    const handleChange = (event) => {
        setReason(event.target.value);
    };

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
      e.preventDefault();
      setAlerts({'password': false})
      if (validate(formData)) {
        const config = {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `JWT ${localStorage.getItem('access')}`,
            },
            data: {
                current_password: current_password
            }
        };
        axios.delete(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config)
        .then(() => setSuccessMessage(true))
        .catch((err) => {
          if (err.response) {
            if (err.response.data.current_password == 'Invalid password.') {
              setAlerts({"password": true});
            }
          }
        }) 
      }
    };

    const handleDialogClose = () => {
      setSuccessMessage(false);
      logout()
    };

    const validate = () => {
      let errors = {"EnterCurPass": false}
      let errorsContent = {};
      let isValid = true;
      if (!current_password) {
        isValid = false;
        errors["EnterCurPass"] = true;
        errorsContent["EnterCurPass"] = "Hazırkı parolu daxil edin.";
      }
      setErrors(errors);
      setErrorsContent(errorsContent);
      return isValid;
    }

    return (
      <Box component="form" noValidate onSubmit={e => onSubmit(e)} sx={{ mt: 3 }}>
       <Typography component="h1" variant="h4" align='center' gutterBottom>Hesabı silin</Typography>
       <Typography component="div" variant="body1" align='center' >Dəyərli üzvümüz! Hesabınızı silmək istədiyinizi eşitdiyimiz üçün çox məyusuq.</Typography>
       <Typography component="div" variant="body1" align='center' className={classes.header} gutterBottom mt={2}>Hesabınızı nə üçün silirsiniz?</Typography>
       <FormControl fullWidth>
            <Select
            value={reason}
            onChange={handleChange}
            displayEmpty
            >
            <MenuItem value="Çox məşğul/çox diqqəti yayındıran">Çox məşğul/çox diqqəti yayındıran</MenuItem>
            <MenuItem value="İkinci hesab yaratdım">İkinci hesab yaratdım</MenuItem>
            <MenuItem value="Məxfilik narahatlığı">Məxfilik narahatlığı</MenuItem>
            <MenuItem value="Başlamaqda çətinlik">Başlamaqda çətinlik</MenuItem>
            <MenuItem value="Başqa bir şey">Başqa bir şey</MenuItem>
            </Select>
        </FormControl>

       <Typography component="div" variant="body1" align='center' className={classes.header} mt={2}>Davam etmək üçün parolunuzu yenidən daxil edin.</Typography>
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
        {alerts["password"] && <div className={classes.alert}>{<ErrorIcon fontSize="small"/>} {alertsContent["password"]}</div>}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          >
          Hesabı silin
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
        Hesabınız silindi:(</DialogTitle>
      </Dialog>
      </Box>
    );
};


export default connect(null, { delete_user, logout })(DeleteAccount);