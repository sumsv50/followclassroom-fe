import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '../Common/AppBar';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['User Detail', 'Detail Edit', 'Successful'];

const theme = createTheme();

export default function Success() {
  const [activeStep, setActiveStep] = React.useState(3);
  const navigate = useNavigate();
  const [reRenderRoomList, setRerenderRoomList] = React.useState(false);

  const toggleRerenderRoomList = () => {
      setRerenderRoomList(curr => !curr);
  }

  const handleGoHome = () => {
    navigate('/');
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar toggleRerenderRoomList={toggleRerenderRoomList} />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            User Detail
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            <Typography variant="h5" gutterBottom>
              Congratulation!
            </Typography>
            <Typography variant="subtitle1">
              You have successfully 
              updated your personal information. Your 
              information has been saved in the database
            </Typography>
          </React.Fragment>

          <Button
            variant="contained"
            onClick={handleGoHome}
            sx={{ mt: 3, ml: 1 }}
          >
            Go Home
          </Button>
          
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}