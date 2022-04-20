import React, { useState } from 'react';
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
import { sendNewCommentToServer } from '../../actions/comment';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { green, red } from '@mui/material/colors';
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';



const theme = createTheme();

const useStyles = makeStyles((theme) => ({
    alert: {
        textAlign: 'left',
        fontSize: '12px',
        color: 'red',
    },
    box: {
        backgroundColor: '#E0FFFF',
    },
    width: {
        width: '100%',
        paddingLeft: '0 !important',
        paddingRight: '0 !important',
    }
}));

const CreateComment = ({ slug, refresh, profileData, sendNewCommentToServer }) => {
    const classes = useStyles();
    const [formData, setFormData] = useState({
        body: '',
    });

    const { body } = formData;

    const [errors, setErrors] = useState({});
    const [errorsContent, setErrorsContent] = useState({});
    const navigate = useNavigate();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const validate = () => {
        let errors = { "EnterTitle": false, "EnterContent": false }
        let errorsContent = {};
        let isValid = true;
        if (!body) {
            isValid = false;
            errors["EnterBody"] = true;
            errorsContent["EnterBody"] = "Şərh bildirin."
        }
        setErrors(errors);
        setErrorsContent(errorsContent);
        return isValid;
    }

    const onSubmit = e => {
        e.preventDefault();
        if (validate()) {
            sendNewCommentToServer(formData, slug, refresh)
                .then(() => console.log('success'))
                .catch(err => console.log(err))
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
                <Box component="form" noValidate onSubmit={e => onSubmit(e)} className={classes.width}>
                    <Card className={classes.box}>
                        <Grid container wrap="nowrap" spacing={2}>
                            <Grid item>
                                <Avatar alt={profileData.first_name} src={profileData.image} />
                            </Grid>

                            <Grid justifyContent="left" item xs zeroMinWidth>
                                <TextField
                                    id="filled-multiline-flexible"
                                    margin='dense'
                                    style={{ background: "white" }}
                                    required
                                    multiline
                                    name='body'
                                    value={body}
                                    onChange={e => onChange(e)}
                                    placeholder="Şərh bildirin..."
                                    maxRows={4}
                                    fullWidth
                                />

                                {errors["content"] && <div className={classes.alert}> {<ErrorIcon fontSize="small" />} {errorsContent["content"]} </div>}

                            </Grid>
                            <Grid item justifyContent="center" alignItems="center">
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    PAYLAŞ
                                </Button>
                            </Grid>
                        </Grid>
                    </Card>
                </Box>
        </ThemeProvider>
    )
};

const mapStateToProps = state => ({
    commentAdded: state.comment.commentAdded,
    comment: state.comment.comment
})

export default connect(mapStateToProps, { sendNewCommentToServer })(CreateComment);