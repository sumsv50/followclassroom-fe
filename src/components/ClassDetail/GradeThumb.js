import * as React from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import { useParams } from 'react-router-dom';
import { getGrade } from '../../configs/request';
import { useNavigate} from 'react-router-dom';

export default function GradeThumb({ id }) {
  const params = useParams();
  const [grade, setGrade] = React.useState([]);
  const navigate = useNavigate();

  const handleProfileMenuOpen = () => {
    navigate(`/classes/${params.id}/${id}/edit`);
  };

  React.useEffect( () => {
    async function fetchData() {
      const result = await getGrade(params.id, id);
      setGrade(result);
    }
    fetchData();
  }, []);

  return (
      <Card sx={{
        height: 70,
        maxWidth: 700
      }}>
        <CardContent>
          <Grid container direction="row" alignItems="left">
            <Grid item xs={3} alignItems="left">
              {grade?.name}
            </Grid>

            <Grid item xs ={6} alignItems="right">
              {grade?.weight}
            </Grid>

            <Grid item xs ={3} alignItems="right">
              <IconButton
                size="small"
                edge="end"
                aria-label="account of current user"
                aria-controls='primary-search-account-menu'
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <ModeEditOutlineIcon />
              </IconButton>

              <IconButton
                size="small"
                edge="end"
                aria-label="show 4 new mails"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <DeleteForeverIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card >
  );
}