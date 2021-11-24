import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import CircularIndeterminate from '../Progress';
import { getData } from '../../configs/request';
import { useState, useEffect } from 'react';

export default function DetailForm({reRender}) {
  const [isLoading, setIsLoading] = useState(true);
  const [userDetail, setUserDetail] = useState();

  const getuserDetail = async () => {
    const detail = await getData(`${process.env.REACT_APP_BASE_URL}/api/user-infor`);
    if (detail) { setIsLoading(false); }
    setUserDetail((detail) ? detail : null);
  }

  useEffect(() => { getuserDetail(); }, [reRender]);

  return(
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        User Detail
      </Typography>
  
      { isLoading ?
        <Box sx={{ marginTop: '35vh'}}> 
          <CircularIndeterminate/>
        </Box> :
          
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="email"
              label="Email"
              defaultValue = {userDetail?.authorization?.email}
              value = {userDetail?.authorization?.email}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
    
          <Grid item xs={12} sm={6}>
            <TextField
              id="id"
              label="Student ID"
              defaultValue= {userDetail?.authorization?.student_id}
              value= {userDetail?.authorization?.student_id}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
    
          <Grid item xs={12} sm={6}>
            <TextField
              id="gg_account"
              label="Google Account"
              defaultValue= {userDetail?.authorization?.gg_account}
              value= {userDetail?.authorization?.gg_account}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
    
          <Grid item xs={12} sm={6}>
            <TextField
              id="fb_account"
              label="Facebook Account"
              defaultValue= {userDetail?.authorization?.fb_account}
              value= {userDetail?.authorization?.fb_account}                
              InputProps={{
                readOnly: true,
              }}
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
      }   
    </React.Fragment>
  );
}

