import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import { getData, postData } from '../../configs/request';



const theme = createTheme();

export default function RestPassword() {
  const { token } = useParams();
  const [specificUser, setSpecificUser] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');  
  const navigate = useNavigate();

  React.useEffect(async () => {
    setIsLoading(true);
    const resData = await getData(`api/reset-password/${token}`);
    if (!resData.isSuccess) {
      toast.error(resData.message);
      setTimeout(() => {
        navigate('/sign-in')
      }, 1500)
      return;
    }
    setIsLoading(false);
    setSpecificUser(resData.user);
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password.length < 6) {
      setErrorMessage('Password must have at least 6 characters')
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Confirm password not match Password');
      return;
    }

    setIsLoading(true);
    const dataRes = await postData(`api/reset-password/${token}`, { password, confirmPassword });
    if (!dataRes.isSuccess) {
      toast.error(dataRes.message);
      return;
    }

    toast.success('Update password successfully!');
    setTimeout(() => {
      navigate('../sign-in');
    }, 1000)
  };

  return (
    <>
      {isLoading ? (
        <Grid container component="main">
          <Loading />
        </Grid>
      ) : (
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            {isLoading ? (
              <Loading />
            ) : (
              <Box
                sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} src={specificUser?.avatar} />
                <Typography component="h1" variant="h6">
                  {specificUser?.email}
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <Typography className="error-message">
                  {errorMessage}
                </Typography>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={
                      (event) => {
                        setErrorMessage('');
                        setPassword(event.target.value);
                      }
                    }
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="confirm-password"
                    label="Confirm password"
                    name="confirm-password"
                    autoComplete="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={
                      (event) => {
                        setErrorMessage('');
                        setConfirmPassword(event.target.value);
                      }
                    }
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Change
                  </Button>
                </Box>
              </Box>
            )}
          </Container>
        </ThemeProvider>
      )}
    </>
  );
}