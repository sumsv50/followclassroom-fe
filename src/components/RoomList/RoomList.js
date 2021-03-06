import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ClassThumb from './ClassThumb';
import CircularIndeterminate from '../Common/Progress'
import { getData } from '../../configs/request';

export default function ResponsiveGrid({ reRender }) {
  const [roomList, setRoomList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // console.log("RoomList re-render");
  const getRoomList = async () => {
    setIsLoading(true);
    const data = await getData(`classes`);
    setIsLoading(false);
    setRoomList(Array.isArray(data) ? data : []);
    // console.log(data);
  }

  React.useEffect(async () => {
    await getRoomList();
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
            padding="15px"
          >
            {roomList.map((room, index) => (
              <Grid item xs={2} sm={3} md={3} key={index}>
                <ClassThumb id={room.Class.id} name={room.Class.name} description={room.Class.description}>
                  xs=2
                </ClassThumb>
              </Grid>
            ))}
          </Grid>
      }
    </Box>
  );
}

