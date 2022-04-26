import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import TextTruncate from 'react-text-truncate';
import Divider from '@mui/material/Divider';


function Post(props) {
  const { post } = props;

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href={"/forum/view/" + post.slug}>
        <Card>
          <CardHeader
          avatar={
            <Avatar alt={post.author_full_name} src={process.env.REACT_APP_API_URL + '/media/' + post.user_profile} />
          }
          title={post.author_full_name}
          subheader={new Date(post.published_on).toDateString()}
          />
          <Divider />
          <CardContent>
            <Typography variant="h5" paragraph sx={{fontWeight: 'bold'}}>
              {post.title}
            </Typography>
            <TextTruncate
                line={2}
                element="span"
                truncateText="..."
                text={post.content}
            />
          </CardContent>
          {/* <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            image={post.image}
            alt={post.imageLabel}
          /> */}
        </Card>
      </CardActionArea>
    </Grid>
  );
}

export default Post;