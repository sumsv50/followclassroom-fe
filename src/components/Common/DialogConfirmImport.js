import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function ResponsiveDialog(params) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={params.isOpen}
        onClose={params.handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Confirm
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Are you sure want to update scores for grade "${params.gradeName}"?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={params.handleClose}>
            Cancel
          </Button>
          <Button onClick={() => {
            params.handleUpload();
            params.handleClose();
          }} autoFocus>
            Oke
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
