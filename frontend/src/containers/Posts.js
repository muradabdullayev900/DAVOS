import React, { useContext } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { PostContext } from '../contexts/ForumContext';
import Post from './Post';

const theme = createTheme();

export default function Posts() {
    const { postList } = useContext(PostContext)
    return (
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg">
            <main>
            <Grid container direction="column" justifyContent="center" spacing={{ xs: 2, md: 3 }}>
                {postList.length !== 0 &&
                    postList.map((post) => (
                    <Post key={post.title} post={post} />
                ))
                }
            </Grid>
            </main>
        </Container>
        </ThemeProvider>
    );
}