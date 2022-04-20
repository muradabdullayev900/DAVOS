import React, { useContext } from 'react';
import Grid from '@mui/material/Grid';
import Spinner from "../Spinner";
import Comment from './Comment';


export default function Comments(props) {
    return (
        <Grid container direction="column" justifyContent="center" spacing={{ xs: 2, md: 3 }}>
            {props.commentsList.length !== 0 ? 
                props.commentsList.map((comment) => (
                <Comment key={comment.published_on} name={comment.author_full_name} body={comment.body} userProfile={comment.user_profile} publishedOn={comment.published_on}/>
            )) : <></>
            }
        </Grid>
    );
}