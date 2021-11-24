import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { postData } from '../configs/request';

export default function FormDialog({ open, handleClose, toggleRerenderRoomList }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  // const [room, setRoom] = React.useState("");

  const handleAddClass = async () => {
    try {
      const classItem = {
        name,
        description,
        // room
      }

      const response = await postData(`${process.env.REACT_APP_BASE_URL}/classes`, classItem);
      if (response?.isSuccess) {
        toggleRerenderRoomList();
      }
      // axios.post('http://localhost:8080/classes', classItem)
      //   // axios.post('https://classroom2021-backend.herokuapp.com/classes', classItem)
      //   .then(function (response) {
      //     // onAddClass(response.data);
      //     toggleRerenderRoomList();
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });

    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Tạo lớp học</DialogTitle>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddClass();
          }}
        >
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Tên lớp học"
              required
              fullWidth
              variant="standard"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <TextField
              margin="dense"
              id="description"
              label="Mô tả"
              required
              fullWidth
              variant="standard"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            {/* <TextField
              margin="dense"
              id="room"
              label="Phòng"
              required
              fullWidth
              variant="standard"
              onChange={(e) => {
                setRoom(e.target.value);
              }}
            /> */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Huỷ</Button>
            <Button type="submit" onClick={handleClose}>Tạo</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
