import * as React from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export default function GradeThumb({ id, name, weight }) {
  return (
    <Link to={`/classes/${id}`} style={{ textDecoration: 'none' }}>
      <Card sx={{
        height: 70,
        maxWidth: 700
      }}>
        <CardContent>
          {/* <Typography gutterBottom variant="h5">
            {name}
          </Typography>
          <Typography className="description" variant="body2" color="text.secondary" component="span">
            {weight}
          </Typography> */}
            <Grid container direction="row" alignItems="left">
                <Grid item xs={1} alignItems="left" >
                    Bài Tập Nhóm
                </Grid>
                <Grid item xs ={3} alignItems="right">
                    2
                </Grid>
            </Grid>
        </CardContent>
      </Card >
    </Link>


  );
}