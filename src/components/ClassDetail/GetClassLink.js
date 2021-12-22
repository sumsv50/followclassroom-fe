import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../Common/Header';
import CircularIndeterminate from '../Common/Progress';
import { getData, inviteByEmail } from '../../configs/request';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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

export default function ClassLink({ reRender }) {
  const theme = createTheme();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [student_link, setStudentLink] = useState('');
  const [teacher_link, setTeacherLink] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isTeacher, setIsTeacher] = useState(false);
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();
  const params = useParams();

  const getclassDetail = async () => {
    const detail = await getData(`${process.env.REACT_APP_BASE_URL}/classes/${params.id}`);
    console.log(params.id);
    if (detail) { setIsLoading(false); }
    setStudentLink(`${process.env.REACT_APP__CALLBACK_URL}/classlink/sign-in/${detail?.student_link}`);
    setTeacherLink(`${process.env.REACT_APP__CALLBACK_URL}/classlink/sign-in/${detail?.teacher_link}`);
  };

  useEffect(() => { getclassDetail(); }, []);

  const submitForm = async () => {
    try {
      const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

      if (!regexEmail.test(email)) {
        setErrorMessage('Email not valid!');
        return;
      }

      let role = 'student';
      console.log(isTeacher);
      if (isTeacher) { role = 'teacher'; }

      setIsLoading(true);
      const issuccess = await inviteByEmail(params.id, email, role);

      if (issuccess) {
        setOpen(true);
        setEmail('');
        setIsTeacher(false);
        setIsLoading(false);
      } else {
        setErrorMessage(issuccess?.message);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setErrorMessage('Try again!');
      setIsLoading(false);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header val={3} classId={params.id} />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>

        <Paper variant="outlined" sx={{ my: { xs: 12, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h5" align="center">
            Class Link Detail
          </Typography>

          <Typography variant="h6" gutterBottom>
            <br></br>
          </Typography>

          <React.Fragment>
            {isLoading ?
              <Box sx={{ margin: '300px', marginLeft: '250px' }}>
                <CircularIndeterminate />
              </Box> : (
                <React.Fragment>
                  <Grid container spacing={3}>
                    <Grid item xs={12} >
                      <TextField
                        id="student_link"
                        label="Student Invite Link"
                        defaultValue={student_link}
                        value={student_link}
                        InputProps={{
                          readOnly: true,
                        }}
                        fullWidth
                        autoComplete="address-line2"
                        variant="standard"
                      />
                    </Grid>

                    <Grid item xs={12} >
                      <TextField
                        id="teacher_link"
                        label="Teacher Invite Link"
                        defaultValue={teacher_link}
                        value={teacher_link}
                        InputProps={{
                          readOnly: true,
                        }}
                        fullWidth
                        autoComplete="shipping address-line2"
                        variant="standard"
                      />
                    </Grid>

                  </Grid>

                  <Typography variant="h6" gutterBottom>
                    <br></br>
                  </Typography>

                  <Typography variant="h5" gutterBottom>
                    Invite By Email
                  </Typography>
                  <Typography className="error-message">
                    {errorMessage}
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={9} md={9}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={
                          (event) => {
                            setErrorMessage('');
                            setEmail(event.target.value.trim());
                          }
                        }
                        autoFocus
                      />
                    </Grid>

                    <Button variant="contained" color="primary" onClick={submitForm} sx={{ mt: 6, mb: 2, ml: 2 }}>
                      Send
                    </Button>

                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        This is a success message!
                      </Alert>
                    </Snackbar>

                    <Grid item xs={6}>
                      <FormControlLabel
                        control={<Checkbox color="secondary" name="saveCard" align="left" value="yes" checked={isTeacher} />}
                        label="Send to invite teacher"
                        onChange={(event) => { setIsTeacher(event.target.checked); }}
                        autoFocus
                      />
                    </Grid>
                  </Grid>
                </React.Fragment>
              )
            }
          </React.Fragment>

          <React.Fragment>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={handleGoHome} sx={{ mt: 3, ml: 1 }}>
                Go Back
              </Button>
            </Box>
          </React.Fragment>
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}