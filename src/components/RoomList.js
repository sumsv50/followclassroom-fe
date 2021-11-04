import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Room from './Room';
import CircularIndeterminate from './Progress'
import { getData } from '../configs/request';

export default function ResponsiveGrid({reRender}) {
  const [roomList, setRoomList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  console.log("RoomList re-render");
  const getRoomList = async () => {
    setIsLoading(true);
    const data = await getData(`${process.env.REACT_APP_BASE_URL}`);
    setIsLoading(false);
    setRoomList(Array.isArray(data) ? data : []);
  }

  React.useEffect(() => {
    (async () => await getRoomList())();
  }, [reRender]);

  return (
    <Box sx={{ flexGrow: 1}}
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {
        isLoading ?
        <Box sx={{ marginTop: '35vh'}}> 
          <CircularIndeterminate/>
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
              <Room name={room.name} section={room.section}
                urlBackground={backgroundImgList[index % backgroundImgList.length]}
              >
                xs=2
              </Room>
            </Grid>
          ))}
        </Grid>
      }
    </Box>
  );
}

const backgroundImgList = [
  "https://scontent.fdad1-2.fna.fbcdn.net/v/t1.6435-9/245036229_2058873870936722_1913979410115749818_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=b9115d&_nc_ohc=aQ3hdnLtqZ0AX-9L_fW&_nc_oc=AQlpptTmuJCAlK5k3jN_qZkT79pc0t90AzNXNJaywRfZ877lZCE2u2-KphlN3h8Oqy8&_nc_ht=scontent.fdad1-2.fna&oh=3d2dac7c21e0238cf35c9f10da52dbf5&oe=6199A5B5",
  "https://scontent.fdad1-3.fna.fbcdn.net/v/t1.6435-9/244492930_2058873504270092_1456254515552374153_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=b9115d&_nc_ohc=hJR_QRlzDmIAX-sk6nb&_nc_ht=scontent.fdad1-3.fna&oh=c3b1cf94a05a5aff2cb8c7205fb29463&oe=619AC26C",
  "https://scontent.fdad1-2.fna.fbcdn.net/v/t1.6435-9/244540852_2058874070936702_5524250869292089387_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=b9115d&_nc_ohc=kfdFDjHWpEUAX-OvE-w&tn=r7aGHORrzMTcIjRY&_nc_ht=scontent.fdad1-2.fna&oh=34ba942f181d806525fa5b2c737eb108&oe=619BDDD6",
  "https://scontent.fdad2-1.fna.fbcdn.net/v/t1.6435-9/245408200_2058874010936708_2554846906534333452_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=b9115d&_nc_ohc=YD9Wrp6BEzUAX-Q1UZ5&_nc_ht=scontent.fdad2-1.fna&oh=7a49f9f9baa44a585beceea0f40bac4f&oe=619A4604",
  "https://scontent.fdad1-3.fna.fbcdn.net/v/t1.6435-9/244700483_2058873807603395_221860841917346349_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=b9115d&_nc_ohc=wSPLHSGwAXwAX_z0wlU&_nc_ht=scontent.fdad1-3.fna&oh=ac3f0b13f603469adc0d1e62bf9dca87&oe=619A8EEF",
  "https://anhdep123.com/wp-content/uploads/2021/01/hinh-gai-cute-1.jpg",
  "https://anhdep123.com/mot-van-hinh-anh-con-gai-cute-de-thuong-nhin-la-muon-yeu-ngay/hinh-anh-girl-cute-2/",
  "https://anhdep123.com/wp-content/uploads/2021/02/anh-gai-cute.jpg",
  "https://anhdep123.com/wp-content/uploads/2021/02/Tong-hop-nhung-hinh-anh-hot-girl-toc-ngan-de-thuong-dang-yeu-nhat-16.jpg",
]
