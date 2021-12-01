import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import GradeThumb from './GradeThumb';

export default function ResponsiveGrid({ grade_order }) {

  return (
    <Box sx={{ flexGrow: 1 }}
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      
      <Grid container
        columnSpacing={{ xs: 1, md: 1 }}
        rowSpacing={4}
        columns={{ xs: 4, sm: 8, md: 12 }}
        align="center"
        padding="10px"
      >
        {grade_order?.map((id) => ( 
          <Grid item xs={12} key={id}>
            <GradeThumb id={id} >
              xs=2
            </GradeThumb>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
