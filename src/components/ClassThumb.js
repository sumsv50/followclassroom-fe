import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function ClassThumb({ name, description }) {
  return (
    <Card sx={{
      maxWidth: 345
    }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="class.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography className="description" variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card >
  );
}
