import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { toast } from 'react-toastify';

import Loading from '../Common/Loading';
import { getData } from '../../configs/request';

export default function ActiveAccount() {
  const { token } = useParams();
  const navigate = useNavigate();
  
  useEffect(async () => {
    const resData = await getData(`api/active-account/${token}`);
    if (!resData.isSuccess) {
      toast.error(resData.message);
    } else {
      toast.success('Active account successfully!');
    }
    setTimeout(() => {
      navigate('/sign-in')
    }, 1500 )
  }, [])

  return (
    <Grid container component="main">
      <Loading />
    </Grid>
  )
} 