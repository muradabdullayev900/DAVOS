import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { fetchUserProfile, updateUserProfile } from '../../actions/auth';
import { connect } from 'react-redux';
import validator from 'validator';
import ErrorIcon from '@mui/icons-material/Error';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { green, red } from '@mui/material/colors';
import ButtonGroup from '@mui/material/ButtonGroup';
import ChangePassword from './ChangePassword';
import DeleteAccount from './DeleteAccount';
import { useNavigate } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
    card: {
        display: 'flex',
    },
    profile: {
      borderRadius: '50%',
      marginBottom: '5px',
      height: '150px',
      width: '150px'
    },
    alert: {
      textAlign: 'left',
      fontSize: '12px',
      color: 'red',
    }
}));

function Profile({isAuthenticated, profileData, updateSuccess, fetchUserProfile, updateUserProfile}) {
    const theme = useTheme();
    const classes = useStyles();
    const [formData, setFormData] = useState({
      first_name: '',
      last_name: '',
      email: '',
      image: null
    });
    const [errors, setErrors] = useState(false);
    const [errorsContent, setErrorsContent] = useState('');
    const [successMessage, setSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [option, setOption] = useState(0);
    const navigate = useNavigate()

    const { first_name, last_name, email} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const handleImageChange = (e) => {
      setFormData({...formData,
        image: e.target.files[0]
      })
    };

    const onSubmit = e => {
      e.preventDefault();
      if (validate()) {
        let updatedProfile = {}
        for (let key in formData) {
          if (formData[key] !== '' || formData[key] !== null) {
            updatedProfile[key] = formData[key]
          }
          else {
            updatedProfile[key] = profileData[key]
          }
        }
        updateUserProfile(updatedProfile)
        .then(() => fetchUserProfile())
        .then(() => setSuccessMessage(true))
        .catch((err) => setErrorMessage(true))
      }
    };

    const handleDialogClose = () => {
      setSuccessMessage(false);
      setErrorMessage(false);
    };

    const validate = () => {
      let errors = {};
      let errorsContent = {"name":false,"email":false};
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
      setErrors(errors);
      setErrorsContent(errorsContent);
      return isValid;
    }

    useEffect(() => {
      if (!localStorage.getItem('access')) {
        console.log(isAuthenticated)
        navigate('/forum')
      }
      fetchUserProfile()
    }, []);

  
    return ( profileData &&
    <Container component="main" maxWidth="lg">
      <Card sx={{ display: 'flex', margin: theme.spacing(5), padding: theme.spacing(2) }}>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={profileData.image}
          alt="Profile Picture"
          className={classes.profile}
        />
        <Box sx={{ flexDirection: 'column', ml: 4 }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5">
              {profileData.first_name} {profileData.last_name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {profileData.email}
            </Typography>
            <ButtonGroup variant="contained" aria-label="outlined primary button group" sx={{mt: 3}}>
              <Button onClick={() => {setOption(0)}}>PROFİLİ YENİLƏ</Button>
              <Button onClick={() => {setOption(1)}}>ŞİFRƏNİ DƏYİŞ</Button>
              <Button onClick={() => {setOption(2)}}>HESABI SİL</Button>
            </ButtonGroup>
          </CardContent>
        </Box>
      </Card>
      {option === 0 ?
      <Box component="form" noValidate onSubmit={e => onSubmit(e)} sx={{ mt: 1 }}>
      <Typography component="h1" variant="h4" align='center' gutterBottom>Profili yeniləyin</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
            <TextField
            autoComplete="given-name"
            name="first_name"
            required
            fullWidth
            id="first_name"
            label="Ad"
            autoFocus
            value={first_name}
            onChange={e => onChange(e)}
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
            autoComplete="family-name"
            value={last_name}
            onChange={e => onChange(e)}
            />
        </Grid>
        <Grid item xs={12}>
            <TextField
            required
            fullWidth
            id="email"
            label="E-poçt"
            name='email'
            autoComplete="email"
            value={email}
            onChange={e => onChange(e)}
            />
            {errors["email"] && <div className={classes.alert}>{<ErrorIcon fontSize="small"/>} {errorsContent["email"]}</div>}
        </Grid>
        <Grid item xs={12}>
        <label htmlFor="image">
        <input type="file"
          style={{ display: 'none' }}
          id="image"
          name="btn-upload"
          className='btn-upload'
          accept="image/png, image/jpeg"  onChange={e => handleImageChange(e)} required/>
          <Button
            className="btn-choose"
            variant="outlined"
            component="span" >
             ŞƏKİL SEÇ
          </Button>
        </label>
        <Grid item xs={12}>
        <div className="file-name">
        {formData.image ? formData.image.name : null}
        </div>
        </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          >
          YENİLƏ
        </Button>
      </Grid>
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
        İstifadəçi məlumatlarınız uğurla yeniləndi!</DialogTitle>
      </Dialog>
      <Dialog
        open={errorMessage}
        onClose={handleDialogClose}
        PaperProps={{
          style: {
            backgroundColor: 'rgb(253, 236, 234)',
            textAlign: 'center',
            color: 'rgb(97, 26, 21)',
          },
        }}
      >
        <DialogTitle>
        <ErrorIcon style={{ color: red[500], fontSize: '2rem', verticalAlign: 'middle'}}/>
        İstifadəçi məlumatlarınız yenilənə bilmədi!</DialogTitle>
      </Dialog>
      </Box>
      : ( option === 1 ? <ChangePassword /> : (option === 2 ? <DeleteAccount /> : null))}
    </Container>
    );
  }

const mapStateToProps = state => ({
  profileData: state.auth.profileData,
  updateSuccess: state.auth.updateSuccess,
  isAuthenticated: state.auth.isAuthenticated,
})


export default connect(mapStateToProps, { fetchUserProfile, updateUserProfile })(Profile);