import * as React from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getGrade } from '../configs/request';

export default function GradeThumb({ id }) {
  const params = useParams();
  // console.log(id);
  // console.log(params);
  const [grade, setGrade] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      const result = await getGrade(params.id, id);
      // console.log('result ', result);
      setGrade(result);
    }
    fetchData();
  }, []);

  return (
    <Link to={`/classes/${params.id}`} style={{ textDecoration: 'none' }}>
      <Card sx={{
        height: 70,
        maxWidth: 700
      }}>
        <CardContent>
          <Grid container direction="row" alignItems="left">
            <Grid item xs={1} alignItems="left">
              {grade?.name}
            </Grid>
            <Grid item xs={3} alignItems="right">
              {grade?.weight}
            </Grid>
          </Grid>
        </CardContent>
      </Card >
    </Link>
  );
}