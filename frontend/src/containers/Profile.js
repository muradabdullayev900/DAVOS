import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles';
import Avatar from 'react-avatar';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';



const useStyles = makeStyles((theme) => ({
    card: {
        display: 'flex',
    },
    profile: {
      borderRadius: '50%',
      marginBottom: '5px',
    },
}));

export default function Profile() {
    const theme = useTheme();
    const classes = useStyles();
  
    return (
    <Container component="main" maxWidth="lg">
      <Card sx={{ display: 'flex', margin: theme.spacing(5), padding: theme.spacing(2) }}>
        <CardMedia
          alt="Tom Cruise"
        >
        <Avatar name="Tom Cruise" size="100" textSizeRatio={1.2} 
          className={classes.profile} color="#2f2fa2"/>
        </CardMedia>
        <Box sx={{ flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5">
              Tom Cruise
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              tom.cruise.tc234@gmail.com
            </Typography>
          </CardContent>
        </Box>
      </Card>
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
            />
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField
            required
            fullWidth
            id="last_name"
            label="Soyad"
            name='last_name'
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
            autoComplete="email"
            />
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
    </Container>
    );
  }