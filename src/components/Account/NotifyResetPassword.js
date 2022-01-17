import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';

export default function NotifyResetPassword() {
  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      {/* Hero unit */}
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h5"
          variant="h5"
          align="left"
          color="text.primary"
          gutterBottom
        >
          Check your email!
        </Typography>
        <Typography align="left" color="text.secondary" component="p">
          A password reset message was sent to your email address. Please click
          the link in that message to reset your password
          <br />
          If you have not received it within a few moments, please check your spam
          folder or try again.
        </Typography>
      </Container>
      {/* End hero unit */}
      {/* End footer */}
    </React.Fragment>
  );
}
