import React, {Fragment} from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from '@mui/material/Link';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

const theme = createTheme();

const Navbar = ({ logout, isAuthenticated }) => {
    const guestLinks = () => (
        <Fragment>
            <Button href="/login" color="inherit" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            DAXİL OL
            </Button>
            <Button href="/signup" color="inherit" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            QEYDİYYAT
            </Button>
        </Fragment>
    );

    const authLinks = () => (
        <Fragment>
            <Button href="/forum" color="inherit" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                FORUM
            </Button>
            <Button href="/profile" color="inherit" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                PROFİL
            </Button>
            <Button href="#!" color="inherit" variant="outlined" onClick={ logout } sx={{ my: 1, mx: 1.5 }}>
                ÇIXIŞ
            </Button>
        </Fragment>
    );

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />
            <AppBar
            position="relative"
            elevation={0}
            sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
            >
            <Toolbar sx={{ flexWrap: 'wrap' }}>
                <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                <Link href='#' to="/" color='inherit' sx={{ textDecoration: 'none' }}>
                    DAVOS Forum
                </Link>
                </Typography>
                {isAuthenticated ? authLinks() : guestLinks()}
            </Toolbar>
            </AppBar>
        </ThemeProvider>
    )
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Navbar);