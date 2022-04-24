import React, { Fragment, useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { fetchUserProfile } from '../../actions/auth';
import { deletePost } from '../../actions/post';
import { connect } from 'react-redux';
import Comments from '../Comment/Comments';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import CreateComment from '../Comment/CreateComment';


const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginBottom: '10px'
    },
  }),
);

const theme = createTheme();


const PostDetail = ({profileData, isAuthenticated, fetchUserProfile}) => {
    const classes = useStyles();
    const {slug} = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([])
    let navigate = useNavigate(); 

    const getPostBody = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/view/` + slug)
        .then(response => {
            setPost(response.data)
            console.log(response.data)
        }).catch(err => console.log(err))
    }

    const getCommentsList = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/comments/` + slug)
        .then(response => {
            setComments(response.data)
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        if (!localStorage.getItem('access')) {
            console.log(isAuthenticated)
            navigate('/forum')
        }
        fetchUserProfile()
        .then(() => getPostBody())
        .then(() => getCommentsList())
    }, [])

    const renderWholePage = () => {
        getPostBody();
        getCommentsList();
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="md">
            <Grid 
                    container
                    direction="row"
                    justifyContent="center"
                >
            {post ? 
                <Grid item xs={12}>
                <Card>
                    <CardHeader
                    avatar={
                        <Avatar alt={post.author_full_name} src={process.env.REACT_APP_API_URL + '/media/' + post.user_profile} />
                    }
                    title={post.author_full_name}
                    subheader={new Date(post.published_on).toDateString()}
                    action={
                        isAuthenticated &&
                        post.author === profileData.id &&
                        <Fragment>
                            <Button href={"/forum/" + post.slug + "/edit/"} color="inherit" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                                YENİLƏ
                            </Button>
                            <Button href={"/forum/"} onClick={deletePost(post.slug)} color="inherit" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                                SİL
                            </Button>
                        </Fragment>
                    }
                    >
                    {/* {post.author == profileData.id ? 
                    console.log("HELLO")
                    : null} */}
                    </CardHeader>
                    <Divider />
                    <CardContent>
                        <Typography variant="h5" paragraph sx={{fontWeight: 'bold'}}>
                            {post.title}
                        </Typography>
                        <Typography variant="subtitle1" paragraph>
                        {post.content}
                        </Typography>
                        <Typography variant="caption" paragraph>
                        {post.total_comments} Rəy
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
                : <></> }
                {isAuthenticated && profileData && 
                <CreateComment slug={slug} refresh={renderWholePage} profileData={profileData}/>}
                { isAuthenticated && comments.length !== 0 &&
                <Comments commentsList={comments} />}
                </Grid>
            </Container>
        </ThemeProvider>
    )
};
const mapStateToProps = state => ({
    profileData: state.auth.profileData,
    isAuthenticated: state.auth.isAuthenticated,
})
  
  
export default connect(mapStateToProps, { fetchUserProfile, deletePost})(PostDetail);