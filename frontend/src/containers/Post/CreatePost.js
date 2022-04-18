import React, {useState} from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ErrorIcon from '@mui/icons-material/Error';
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import { sendNewPostToServer } from '../../actions/post';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { green, red } from '@mui/material/colors';
import { useNavigate } from "react-router-dom";


const theme = createTheme();

const useStyles = makeStyles((theme) => ({
    alert: {
      textAlign: 'left',
      fontSize: '12px',
      color: 'red',
    }
}));

const CreatePost = ({postAdded, post, sendNewPostToServer}) => {
    const classes = useStyles();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
    });
    const [successMessage, setSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

    const {title, content} = formData;

    const [errors, setErrors] = useState({});
    const [errorsContent, setErrorsContent] = useState({});
    const navigate = useNavigate();

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const handleClose = () => {
        if (successMessage) navigate('/forum/view/' + post.slug)
        setSuccessMessage(false);
        setErrorMessage(false);
    };

    const validate = () => {
        let errors = {"EnterTitle": false, "EnterContent": false}
        let errorsContent = {};
        let isValid = true;
        if (!title) {
          isValid = false;
          errors["EnterTitle"] = true;
          errorsContent["EnterTitle"] = "Başlıq qeyd edin.";
        }
        if (!content) {
          isValid = false;
          errors["EnterContent"] = true;
          errorsContent["EnterContent"] = "Məzmun qeyd edin.";
        }
        setErrors(errors);
        setErrorsContent(errorsContent);
        return isValid;
    }

    const onSubmit = e => {
        e.preventDefault();
        if (validate()) {
            sendNewPostToServer(formData)
            .then(() => setSuccessMessage(true))
            .catch(() => setErrorMessage(true))
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="sm">
            <Typography component="h1" variant="h4" sx={{ mt: 3 }}>
                Yeni Post
            </Typography>
            <Divider />
            <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={e => onSubmit(e)}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                        name="title"
                        required
                        fullWidth
                        id="title"
                        label="Başlıq"
                        value={title}
                        onChange={e => onChange(e)}
                        inputProps={{ maxLength: 50 }}
                        autoFocus
                        />
                        {errors["title"] && <div className={classes.alert}> {<ErrorIcon fontSize="small"/>} {errorsContent["title"]} </div>}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        id="content"
                        label="Məzmun"
                        name='content'
                        multiline
                        rows={4}
                        value={content}
                        onChange={e => onChange(e)}
                        />
                        {errors["content"] && <div className={classes.alert}> {<ErrorIcon fontSize="small"/>} {errorsContent["content"]} </div>}
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    PAYLAŞ
                </Button>
            </Box>
            <Dialog
                open={successMessage}
                onClose={handleClose}
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
                Postunuz əlavə olundu!</DialogTitle>
            </Dialog>
            <Dialog
                open={errorMessage}
                onClose={handleClose}
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
                Postunuz əlavə oluna bilmədi!</DialogTitle>
            </Dialog>
            </Container>
        </ThemeProvider>
    )
};

const mapStateToProps = state => ({
    postAdded: state.post.postAdded,
    post: state.post.post
})

export default connect(mapStateToProps, { sendNewPostToServer })(CreatePost);