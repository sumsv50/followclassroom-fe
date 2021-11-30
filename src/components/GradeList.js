import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import GradeThumb from './GradeThumb';
import CircularIndeterminate from './Progress'
import { getData } from '../configs/request';

export default function ResponsiveGrid({ reRender, class_id }) {
  const [gradeList, setGradeList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // console.log("RoomList re-render");
  const getGradeList = async () => {
    setIsLoading(true);
    const data = await getData(`${process.env.REACT_APP_BASE_URL}/grades/${class_id}`);
    setIsLoading(false);
    setGradeList(Array.isArray(data) ? data : []);
    console.log(data);
  }

  React.useEffect(async () => {
    await getGradeList();
  }, [reRender]);

  return (
    <Box sx={{ flexGrow: 1 }}
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {
        isLoading ?
          <Box sx={{ marginTop: '35vh' }}>
            <CircularIndeterminate />
          </Box> :
          <Grid container
            columnSpacing={{ xs: 1, md: 1 }}
            rowSpacing={4}
            columns={{ xs: 4, sm: 8, md: 12 }}
            align="center"
            padding="10px"
          >
            {/* {gradeList.map(() => ( */}
              <Grid Grid item xs={12} key={1}>
                <GradeThumb id="1" name="nhhn" weight="3">
                  xs=2
                </GradeThumb>
              </Grid>
              <Grid item xs={12} key={2}>
                <GradeThumb id="2" name="nhn" weight="4">
                  xs=2
                </GradeThumb>
              </Grid>
              <Grid item xs={12} key={4}>
                <GradeThumb id="3" name="nn" weight="3">
                  xs=2
                </GradeThumb>
              </Grid>
            {/* ))} */}
          </Grid>
      }
    </Box>
  );
}
