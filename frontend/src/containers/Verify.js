import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { connect } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import VerifiedIcon from '@mui/icons-material/Verified';
import Avatar from '@mui/material/Avatar';
import { makeStyles } from '@mui/styles';
import { useLocation } from 'react-router-dom';
import { resend_email } from '../actions/auth';

const theme = createTheme();

const useStyles = makeStyles((theme) => ({
    header: {
        fontWeight: 600,
    }
}));

function Verify({ resend_email }) {
    const classes = useStyles();
    const { state } = useLocation();
    const { email } = state;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="md">
        <Paper elevation={4} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, display: 'flex',
            flexDirection: 'column',
            alignItems: 'center' }}>
            <Avatar sx={{ m: 1, bgcolor: 'green' }}>
            <VerifiedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" align="center" className={classes.header} gutterBottom sx={{ mb: 3 }}>
                Zəhmət olmasa, emailinizi təsdiq edin
            </Typography>
            <Typography component="h1" variant="body2" align="center" gutterBottom>
                Demək olar ki, bitirmisiniz! Biz <b>{email}</b> adresinə mail göndərmişik. 
            </Typography>
            <Typography component="h1" variant="body2" align="center" >
                Qeydiyyatınızı tamamlamaq üçün həmin e-poçtdakı linkə klikləyin. 
            </Typography>
            <Typography component="h1" variant="body2" align="center" gutterBottom>
                Əgər onu görmürsünüzsə, spam qovluğunuzu yoxlamalı ola bilərsiniz.
            </Typography>
            <Typography component="h1" variant="body2" align="center">
                Hələ də e-poçtu tapa bilmirsiniz?
            </Typography>
            <Button variant="contained" color="success" sx={{ mt: 3, ml: 1 }} onClick={() => resend_email(email)}>
                E-poçtu YENİDƏN GÖNDƏRİN
            </Button>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default connect(null, { resend_email })(Verify);