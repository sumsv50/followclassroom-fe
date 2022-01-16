import React, { useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useParams } from 'react-router-dom';
import { postFile } from '../../configs/request';

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#1976d2',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const focusedStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};


function StyledDropzone({ content, getInformation }) {
    const params = useParams();

    //Dropzone variable
    const [file, setFile] = React.useState(null)
    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject
    } = useDropzone({
        accept: '.xlsx', onDrop: (files) => {
            setFile(files[0])
            handleClickOpen()
        }
    });
    const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isFocused,
        isDragAccept,
        isDragReject
    ]);

    //Confirm Dialog variable
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleAgree = () => {
        fileUploadHandler()
    }
    const fileUploadHandler = async (e) => {
        const fd = new FormData();
        fd.append('file', file, file.name);
        const res = await postFile(`gradeboard/${params.id}/upload-studentlist`, fd);
        if (res?.isSuccess) {
            getInformation();
        }
    }

    return (
        <section>
            <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <FileUploadIcon />
                <span style={{ fontSize: '14px' }}>
                    {content}
                </span>
            </div>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'Confirm Upload'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {`Do you sure to upload this file: ${file?.name}`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAgree} autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </section >
    );
}

export default StyledDropzone