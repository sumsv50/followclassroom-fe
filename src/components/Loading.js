import Box from '@mui/material/Box';
import CircularIndeterminate from './Progress'
import './Loading.css';

export default function Loading() {
    return (
        <Box className="full-loading"
        >
            <CircularIndeterminate/>
        </Box>
    )
}