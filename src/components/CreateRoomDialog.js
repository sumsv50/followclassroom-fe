import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
// import { postData } from '../configs/request';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';


export default function FormDialog({ isOpen, handleClose, toggleRerenderRoomList }) {
  const [name, setName] = React.useState("");
  const [section, setSection] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [room, setRoom] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async () => {
    if (!name.trim()) return;
    setLoading(true);
    // await postData(`${process.env.REACT_APP_BASE_URL}`, {name, section, subject, room});
    setLoading(false);
    toggleRerenderRoomList();
    setName("");
    setSection("");
    setSubject("");
    setRoom("");
    handleClose();
  }

  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth={true}
        onKeyUp={e => e.key === "Enter" && handleSubmit()}
      >
        <DialogTitle>Create Room</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Room name (required)"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
          />
          <TextField
            margin="dense"
            style={{ margintop: "15px" }}
            id="name"
            label="Section"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setSection(e.target.value);
            }}
            value={section}
          />
          <TextField
            margin="dense"
            style={{ margintop: "15px" }}
            id="name"
            label="Subject"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setSubject(e.target.value);
            }}
            value={subject}
          />
          <TextField
            margin="dense"
            style={{ margintop: "15px" }}
            margintop="24px"
            id="name"
            label="Room"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setRoom(e.target.value);
            }}
            value={room}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Box sx={{ m: 1, position: 'relative' }}>
            <Button
              variant="contained"
              disabled={loading}
              onClick={handleSubmit}
            >
              Create
            </Button>
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  color: green[500],
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-12px',
                }}
              />
            )}
          </Box>
        </DialogActions>
      </Dialog>
    </div>
  );
}
