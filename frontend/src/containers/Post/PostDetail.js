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
import Box from '@mui/material/Box';


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
        }).catch(err => console.log(err))
    }

    const getCommentsList = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/comments/` + slug)
        .then(response => {
            setComments(response.data)
        }).catch(err => console.log(err))
    }

    useEffect(() => {
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
                {console.log(post)}
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
                                YEN??L??
                            </Button>
                            <Button href={"/forum/"} onClick={deletePost(post.slug)} color="inherit" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                                S??L
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
                        {post.image && 
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            component="img"
                            alt={post.title}
                            src={post.image}
                        />
                        }
                        <Typography variant="caption" paragraph>
                        {post.total_comments} R??y
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