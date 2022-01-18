import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { toast } from 'react-toastify';
import { postData } from '../../configs/request';


export default function RequestReviewForm({ open, close, studentId, gradeId }) {
    const [expectedGrade, setExpectedGrade] = React.useState(null);
    const [explanation, setExplanation] = React.useState(null);
    const [openDialog, setOpenDialog] = React.useState(null)

    const handleSendRequest = async () => {

        const request = {
            grade_id: gradeId,
            expected_score: expectedGrade,
            explain: explanation,
        }

        try {
            const response = await postData(`review/create`, request);
            if (response?.isSuccess) {
                toast.success('Request sucessfully!');
            }
            else {
                toast.error('Request unsucessfully!');
            }
        } catch (err) {
            console.error(err);
        }
        close()
    }
    return (
        <div>
            <Dialog open={open} onClose={close}>
                <DialogTitle>Request Review</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="expectedGrade"
                        label="Expected Grade"
                        type="number"
                        fullWidth
                        required
                        variant="standard"
                        onChange={(e) => {
                            setExpectedGrade(e.target.value);
                        }}
                    />
                    <TextField
                        margin="dense"
                        id="name"
                        label="Your explanation"
                        type="text"
                        fullWidth
                        required
                        variant="standard"
                        onChange={(e) => {
                            setExplanation(e.target.value);
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={close}>Cancel</Button>
                    <Button onClick={handleSendRequest}>Send</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
