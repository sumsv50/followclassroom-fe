import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import CircularIndeterminate from '../Common/Progress';
import { getData } from '../../configs/request';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUser} from '../../configs/request';

export default function EditForm({reRender}) {
  const [isLoading, setIsLoading] = useState(true);
  const [userDetail, setUserDetail] = useState();
  const [email, setEmail] = useState('');
  const [student_id, setStudentID] = useState('');
  const [gg_account, setGgAccount] = useState('');
  const [fb_account, setFbAccount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const getuserDetail = async () => {
    const detail = await getData(`api/user-infor`);
    if (detail) { setIsLoading(false); }
    setUserDetail((detail) ? detail : null);
    setEmail(detail?.authorization.email);
    setStudentID(detail?.authorization.student_id);
    setGgAccount(detail?.authorization.gg_account);
    setFbAccount(detail?.authorization.fb_account);
  }

  const submitForm = async() => {
    try {
      const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

      console.log(`noi dung: ${email}`);
      if(!regexEmail.test(email)) {
        setErrorMessage('Email not valid!');
        return;
      }

      if(student_id < 6) {
        setErrorMessage('Right Student ID must have at least 6 characters')
        return;
      }

      if(!regexEmail.test(gg_account)) {
        setErrorMessage('Google Account not valid!');
        return;
      }
      
      setIsLoading(true); //test
      const isSuccess = await updateUser({email, student_id, gg_account, fb_account})
      
      if(isSuccess) {
        navigate('/user/success');
      } else {
        setErrorMessage("Incorrect value!");
        setIsLoading(false);
      }
    } catch(err) {
      console.log(err);
      setErrorMessage('Try again!');
      setIsLoading(false);
    }
  }

  const goBack = async() => {
    return navigate('/');
  }


  useEffect(() => { getuserDetail(); }, [reRender]);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Detail Edit
      </Typography>

      <Typography className="error-message">
        {errorMessage}
      </Typography>

      {isLoading ? (
        <Box sx={{ marginTop: '35vh'}}> 
          <CircularIndeterminate/>
        </Box>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
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
    
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="id"
              label="Student ID"
              name="id"
              autoComplete="id"
              value = {student_id}
              onChange={
                (event) => {
                  setErrorMessage('');
                  setStudentID(event.target.value.trim());
                }
              }
              autoFocus
            />
          </Grid>
    
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="gg_account"
              label="Google Account"
              name="gg_account"
              autoComplete="gg_account"
              value = {gg_account}
              onChange={
                (event) => {
                  setErrorMessage('');
                  setGgAccount(event.target.value.trim());
                }
              }
              autoFocus
            />
          </Grid>
    
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="fb_account"
              label="Facebook Account"
              name="fb_account"
              autoComplete="fb_account"
              value = {fb_account}
              onChange={
                (event) => {
                  setErrorMessage('');
                  setFbAccount(event.target.value.trim());
                }
              }
              autoFocus
            />
          </Grid>
    
          <Grid item xs={12} sm={6}>
            <TextField
              id="city"
              label="City"
              defaultValue= "Ho Chi Minh"
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
    
          <Grid item xs={12} sm={6}>
            <TextField
                id="country"
                label="Country"
                defaultValue= "Viet Nam"
                InputProps={{
                  readOnly: true,
                }}
            />
          </Grid>
        </Grid>  
      )}

      <React.Fragment>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={goBack} sx={{ mt: 3, ml: 1 }}>
            Back
          </Button>

          <Button
            variant="contained"
            onClick={submitForm}
            sx={{ mt: 3, ml: 1 }}
          >
            Confirm
          </Button>
        </Box>
      </React.Fragment>
    </React.Fragment>
  );
}