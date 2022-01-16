import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import GoogleLogin from 'react-google-login';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { postData, authentication } from '../../configs/request';
import Loading from '../Common/Loading';
import { toast } from 'react-toastify';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link to="/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const googleSuccess = async (response) => {
    try {
      const access_token = response.accessToken;
      setIsLoading(true);
      const isSuccess = await authentication('google', { access_token });
      if (isSuccess) {
        navigate('/');
      } else {
        setErrorMessage('Try again!');
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setErrorMessage('Try again!');
      setIsLoading(false);
    }
  }

  const handleSubmit = async () => {
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!regexEmail.test(email)) {
      setErrorMessage('Email not valid!');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must have at least 6 characters')
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Confirm password not match Password');
      return;
    }

    setIsLoading(true);
    const response = await postData(`api/sign-up`, {
      email,
      password,
      confirm_password: confirmPassword
    })
    if (response?.isSuccess) {
      toast.success('Create account successfully!');
      navigate('/sign-in');
    } else {
      setErrorMessage(response?.message);
      setIsLoading(false);
    }
  };

  return (
    <Grid container component="main">
      {isLoading && <Loading />}
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
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Typography className="error-message">
                {errorMessage}
              </Typography>
              <Grid container spacing={2}>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={email}
                    onChange={
                      (event) => {
                        setEmail(event.target.value.trim());
                      }
                    }
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={
                      (event) => {
                        setPassword(event.target.value);
                      }
                    }
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirm-password"
                    label="Confirm password"
                    type="password"
                    id="confirm-password"
                    value={confirmPassword}
                    onChange={
                      (event) => {
                        setConfirmPassword(event.target.value);
                      }
                    }
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}
                  align="left"
                >
                </Grid>
              </Grid>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/sign-in">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
              <Typography className="title-method" component="h1">
                Or sign in by
              </Typography>
              <GoogleLogin
                clientId="441485853042-l9gu5u9jikiqaisk8ue8tno06jcss4jc.apps.googleusercontent.com"
                render={renderProps => (
                  <Box
                    fullwidth
                    variant="contained"
                    className="btn-login login-gg"
                    onClick={renderProps.onClick} disabled={renderProps.disabled}
                  >
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 48 48" className="abcRioButtonSvg">
                      <g><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z">
                      </path>
                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z">
                        </path>
                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z">
                        </path>
                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z">
                        </path>
                        <path fill="none" d="M0 0h48v48H0z">
                        </path></g>
                    </svg>
                    Google
                  </Box>
                )}
                buttonText="Login"
                onSuccess={googleSuccess}
                cookiePolicy={'single_host_origin'}
              />
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </Grid>
  );
}