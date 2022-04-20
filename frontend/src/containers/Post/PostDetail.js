import React, { Fragment, useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import Divider from '@mui/material/Divider';
import { fetchUserProfile } from '../../actions/auth';
import { deletePost } from '../../actions/post';
import { connect } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import Comments from '../Comment/Comments';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';


const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginBottom: '10px'
    },
  }),
);

const theme = createTheme();


const PostDetail = ({profileData, fetchUserProfile}) => {
    const classes = useStyles();
    const {slug} = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState(null)
    let navigate = useNavigate(); 

    const getPostBody = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/view/` + slug)
        .then(response => {
            setPost(response.data)
        }).catch(err => console.log(err))
    }

    const getCommentsList = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/comments/` + slug)
        .then(response => {
            setComments(response.data)
            console.log(response.data)
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        fetchUserProfile();
        getPostBody();
        getCommentsList();
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="sm">
            <Grid 
                    container
                    direction="row"
                    
                >
            {post ? profileData ?
                <Grid item>
                <Card className={classes.root}>
                    <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {post.author_full_name}
                        </Avatar>
                    }
                    title={post.author_full_name}
                    subheader={new Date(post.published_on).toDateString()}
                    action={
                        post.author === profileData.id ? 
                        <Fragment>
                            <Button href={"/forum/" + post.slug + "/edit/"} color="inherit" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                                YENİLƏ
                            </Button>
                            <Button href={"/forum/"} onClick={deletePost(post.slug)} color="inherit" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                                SİL
                            </Button>
                        </Fragment> : null
                    }
                    >
                    {post.author == profileData.id ? 
                    console.log("HELLO")
                    : null}
                    </CardHeader>
                    <Divider />
                    <CardContent>
                        <Typography variant="h5" paragraph sx={{fontWeight: 'bold'}}>
                            {post.title}
                        </Typography>
                        <Typography variant="subtitle1" paragraph>
                        {post.content}
                        </Typography>
                    </CardContent>
                    {/* <CardMedia
                        component="img"
                        sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
                        image={post.image}
                        alt={post.imageLabel}
                    /> */}
                </Card>
                </Grid>
                : <></> : <></>}
                <br></br>
                {comments ? 
                <Comments commentsList={comments} />
                : null}
                </Grid>
            </Container>
        </ThemeProvider>
    )
};
const mapStateToProps = state => ({
    profileData: state.auth.profileData,
})
  
  
export default connect(mapStateToProps, { fetchUserProfile, deletePost})(PostDetail);