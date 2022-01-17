import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';

export default function RequiredActive() {
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
          Your account has been created!
        </Typography>
        <Typography align="left" color="text.secondary" component="p">
          Thank you for registering with FollMe Classroom! <br />
          An activation email sent to your provided email, you need to activate your from
          your email.<br />
          If you have not received it within the hour, please contact us
        </Typography>
      </Container>
      {/* End hero unit */}
      {/* End footer */}
    </React.Fragment>
  );
}
