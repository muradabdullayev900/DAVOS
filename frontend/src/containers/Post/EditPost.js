import React, {useState, useEffect} from 'react';
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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { green, red } from '@mui/material/colors';
import {useNavigate, useParams, Navigate} from 'react-router-dom';
import axios from 'axios';
import { editPost } from '../../actions/post';


const theme = createTheme();

const useStyles = makeStyles((theme) => ({
    alert: {
      textAlign: 'left',
      fontSize: '12px',
      color: 'red',
    }
}));

const EditPost = ({ editPost}) => {
    const classes = useStyles();
    const [successMessage, setSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [errors, setErrors] = useState({});
    const [errorsContent, setErrorsContent] = useState({});
    const {slug} = useParams()
    const navigate = useNavigate();
    const [post, setPost] = useState(null)

    const getPostBody = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/view/` + slug)
        .then(response => {
            setPost(response.data)
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        if (!localStorage.getItem('access')) {
            navigate('/forum')
        }
        getPostBody();
    }, [])

    const onChange = e => setPost({...post, [e.target.name]: e.target.value});

    const handleClose = () => {
        if (successMessage) navigate('/forum/view/' + post.slug)
        setSuccessMessage(false);
        setErrorMessage(false);
    };

    const validate = () => {
        let errors = {"EnterTitle": false, "EnterContent": false}
        let errorsContent = {};
        let isValid = true;
        if (!post.title) {
          isValid = false;
          errors["EnterTitle"] = true;
          errorsContent["EnterTitle"] = "Başlıq qeyd edin.";
        }
        if (!post.content) {
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
            editPost(post)
            .then(() => setSuccessMessage(true))
            .catch(() => setErrorMessage(true))
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {post ? 
            <Container maxWidth="sm">
            <Typography component="h1" variant="h4" sx={{ mt: 3 }}>
                POSTU YENİLƏ
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
                        value={post.title}
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
                        value={post.content}
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
                    YENİLƏ
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
                Postunuz yeniləndi!</DialogTitle>
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
                Postunuz yenilənə bilmədi!</DialogTitle>
            </Dialog>
            </Container>
            : <></> }
        </ThemeProvider>
    )
};

const mapStateToProps = state => ({
    post: state.post.post,
})

export default connect(mapStateToProps, { editPost })(EditPost);