import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from 'react-toastify';
import { postData, putData } from '../../configs/request';

export function CreateClassFormDialog({ open, handleClose, toggleRerenderRoomList }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleAddClass = async () => {
    try {
      const classItem = {
        name,
        description,
      }

      const response = await postData(`classes`, classItem);
      if (response?.isSuccess) {
        toast.success('Create Class successfully!');
        toggleRerenderRoomList();
      }
      else {
        toast.error("Create Class unsuccessfully");

      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Class</DialogTitle>
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
              label="Class Name"
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
              label="Description"
              required
              fullWidth
              variant="standard"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" onClick={handleClose}>Create</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export function JoinClassFormDialog({ open, handleClose, toggleRerenderRoomList }) {
  const [classCode, setClassCode] = React.useState("");

  const handleJoinClass = async () => {
    try {
      const code = {
        code: classCode
      }
      const response = await postData(`classes/code`, code);
      if (response?.isSuccess) {
        toast.success('Join Class successfully!');
        toggleRerenderRoomList();
      }
      else {
        toast.error("Class Code invalid");

      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Join Class</DialogTitle>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleJoinClass();
          }}
        >
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="code"
              label="Class Code"
              required
              fullWidth
              variant="standard"
              onChange={(e) => {
                setClassCode(e.target.value);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" onClick={handleClose}>Join</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export function UpdateScoreFormDialog({ open, handleClose, gradeId, review_id, classId, studentId }) {
  const [score, setScore] = React.useState("");

  const handleUpdateScore = async () => {
    try {
      const response = await postData(`scores/${gradeId}`, { score, studentId });
      await postData(`review/mark/${classId}`, { review_id })
      await putData(`review/mark/${classId}`, { review_id })
      if (response?.isSuccess) {
        toast.success('Update Score successfully!');
      }
      else {
        toast.error("Update Score unsuccessfully!");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Score</DialogTitle>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdateScore();
          }}
        >
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="score"
              label="New Score"
              required
              fullWidth
              variant="standard"
              onChange={(e) => {
                setScore(e.target.value);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" onClick={handleClose}>Update</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}


