import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import image from '../../assets/system.png'

export default function AlignItemsList({ notifyList }) {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {notifyList.length === 0 ? (
        <Typography sx={{ p: 2 }}> No notification </Typography>
      ) : (
        notifyList.map(notify => (
          <>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="System" src={image} />
              </ListItemAvatar>
              <ListItemText
                primary={notify.title}
                secondary={
                  <React.Fragment>
                    {notify.content}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </>
        ))
      )}
    </List>
  );
}