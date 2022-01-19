import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getData, updateGrade, deleteGrade } from '../../configs/request';

export default function EditGrade({ reRender }) {
  const [name, setName] = useState('');
  const [weight, setWeight] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const params = useParams();
  const navigate = useNavigate();
  const theme = createTheme();

  const getGradeDetail = async () => {
    const detail = await getData(`grades/${params.class_id}/${params.id}`);

    setName(detail?.name);
    setWeight(detail?.weight);
  }

  const submitForm = async () => {
    try {

      if (!name) {
        setErrorMessage('Name not valid!');
        return;
      }

      if (weight >= 10) {
        setErrorMessage('Right weight must under 10')
        return;
      }

      const isSuccess = await updateGrade(params.class_id, params.id, name, weight);

      if (isSuccess) {
        navigate(`/classes/${params.class_id}/grade`);
      } else {
        setErrorMessage("Incorrect value!");
      }
    } catch (err) {
      console.log(err);
      setErrorMessage('Try again!');
    }
  }

  const deleteForm = async () => {
    try {

      const isSuccess = await deleteGrade(params.class_id, params.id);

      if (isSuccess) {
        navigate(`/classes/${params.class_id}/grade`);
      } else {
        setErrorMessage("Fail Delete!");
      }
    } catch (err) {
      console.log(err);
      setErrorMessage('Try again!');
    }
  }

  const goBack = async () => {
    return navigate(`/classes/${params.class_id}/grade`);
  }

  useEffect(() => { getGradeDetail(); }, [reRender]);

  return (

    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <React.Fragment>
            <Typography variant="h6" gutterBottom>
              Create Grade
            </Typography>

            <Typography className="error-message">
              {errorMessage}
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="name"
                  label="Name"
                  value={name}
                  onChange={
                    (event) => {
                      setErrorMessage('');
                      setName(event.target.value.trim());
                    }
                  }
                  autoFocus
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  id="weight"
                  label="Weight"
                  value={weight}
                  onChange={
                    (event) => {
                      setErrorMessage('');
                      setWeight(event.target.value.trim());
                    }
                  }
                  autoFocus
                />
              </Grid>
            </Grid>

            <React.Fragment>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={goBack} sx={{ mt: 3, ml: 1 }}>
                  Back
                </Button>

                <Button
                  variant="outlined"
                  color="error"
                  onClick={deleteForm}
                  sx={{ mt: 3, ml: 1 }}

                >
                  Xóa
                </Button>

                <Button
                  variant="contained"
                  onClick={submitForm}
                  sx={{ mt: 3, ml: 1 }}
                >
                  Xác Nhận
                </Button>
              </Box>
            </React.Fragment>
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}