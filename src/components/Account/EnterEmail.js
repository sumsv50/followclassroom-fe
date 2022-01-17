import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast } from 'react-toastify';
import Loading from '../Common/Loading';
import NotifyResetPassword from './NotifyResetPassword';
import { postData } from '../../configs/request';



const theme = createTheme();

export default function EnterEmail() {
  const [email, setEmail] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isCorrectEmail, setIsCorrectEmail] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!regexEmail.test(email)) {
      setErrorMessage('Email not valid!');
      return;
    }
    setIsLoading(true);
    const dataRes = await postData('api/get-reset-password', { email });
    setIsLoading(false);

    if (!dataRes.isSuccess) {
      toast.error(dataRes.message);
      return;
    }

    setIsCorrectEmail(true);
  };

  return (
    <>
      {isCorrectEmail ? (
        <NotifyResetPassword />
      ) : (
        <>
          {isLoading ? (
            <Grid container component="main">
              <Loading />
            </Grid>
          ) : ('')}
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                  <Typography className="error-message">
                    {errorMessage}
                  </Typography>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="email"
                    label="Email"
                    type="email"
                    id="email"
                    autoComplete="email"
                    value={email}
                    onChange={
                      (event) => {
                        setErrorMessage('');
                        setEmail(event.target.value.trim());
                      }
                    }
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Request
                  </Button>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </>
      )
      }
    </>
  );
}