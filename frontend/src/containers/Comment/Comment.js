import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { makeStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
      flexGrow: 1,
      padding: theme.spacing(2),
      display: 'flex'
  }
}));

function Comment(props) {
  const classes = useStyles();
  return (
      <Grid item>
        <Card> 
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar alt={props.author_full_name} src={process.env.REACT_APP_API_URL + '/media/' + props.user_profile} />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: "left" }}>{props.author_full_name}</h4>
            <p style={{ textAlign: "left" }}>
              {props.body}
            </p>
            <p style={{ textAlign: "left", color: "gray" }}>
              {new Date(props.publishedOn).toDateString()}
            </p>
          </Grid>
        </Grid>
        </Card>
      </Grid>
  );
}

export default Comment;