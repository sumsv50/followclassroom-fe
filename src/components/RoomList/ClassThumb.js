import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export default function ClassThumb({ id, name, description }) {
  return (
    <Link to={`/classes/${id}`} style={{ textDecoration: 'none' }}>
      <Card sx={{
        height: 280,
        maxWidth: 345
      }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image="https://res.cloudinary.com/dzhnjuvzt/image/upload/v1637768355/class_ayj0mh.jpg"
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
    </Link>
  );
}
