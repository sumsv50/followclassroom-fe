import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { crtGrade } from '../../configs/request';
import { useParams } from 'react-router-dom';

export default function CreateGrade() {
  const [name, setName] = useState('');
  const [weight, setWeight] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const theme = createTheme();

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
      setIsSaving(true);
      const isSuccess = await crtGrade(params.id, name.trim(), weight);

      if (isSuccess) {
        navigate(`/classes/${params.id}/grade`);
      } else {
        setErrorMessage("Incorrect value!");
      }
    } catch (err) {
      console.log(err);
      setErrorMessage('Try again!');
    }
  }

  const goBack = async () => {
    return navigate(`/classes/${params.id}/grade`);
  }

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
                      setName(event.target.value);
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
                />
              </Grid>
            </Grid>

            <React.Fragment>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={goBack} sx={{ mt: 3, ml: 1 }}>
                  Back
                </Button>

                <LoadingButton
                  sx={{ mt: 3, ml: 1 }}
                  onClick={submitForm}
                  loading={isSaving}
                  startIcon={<SaveIcon />}
                  loadingPosition="start"
                  variant="contained"
                >
                  Confirm
                </LoadingButton>
              </Box>
            </React.Fragment>
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
