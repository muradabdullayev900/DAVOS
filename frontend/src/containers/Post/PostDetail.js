import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import Divider from '@mui/material/Divider';



const theme = createTheme();


const PostDetail = () => {
    const {slug} = useParams();
    const [post, setPost] = useState(null)

    const getPostBody = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/view/` + slug)
        .then(response => {
            setPost(response.data)
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        getPostBody();
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="sm">
            {post ? 
            <Card>
                <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    {post.author_full_name}
                    </Avatar>
                }
                title={post.author_full_name}
                subheader={new Date(post.published_on).toDateString()}
                />
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
            : <></> }
            </Container>
        </ThemeProvider>
    )
};

export default PostDetail;