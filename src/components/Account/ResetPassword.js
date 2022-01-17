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
import { getData } from '../../configs/request';



const theme = createTheme();

export default function RestPassword() {
  const { token } = useParams();
  const [specificUser, setSpecificUser] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(async () => {
    const resData = await getData(`api/reset-password/${token}`) ?? { isSuccess: true };
    if (!resData.isSuccess) {
      toast.error(resData.message);
      setTimeout(() => {
        navigate('/sign-in')
      }, 1500)
    }

    setSpecificUser(resData.user);
  })

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
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
                  {specificUser?.name}
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="confirm-password"
                    label="Confirm password"
                    name="confirm-password"
                    autoComplete="confirm-password"
                    autoFocus
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