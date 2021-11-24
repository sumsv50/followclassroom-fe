import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CircularIndeterminate from './Progress'

import { getData } from '../configs/request';


export default function MediaControlCard() {
    const theme = useTheme();
    const commonStyles = {
        bgcolor: 'background.paper',
        m: 1,
        border: 1,
    };
    const [isLoading, setIsLoading] = React.useState(true);

    const [info, setInfo] = React.useState('');

    const getInformation = async () => {
        setIsLoading(true);
        const data = await getData(`${process.env.REACT_APP_BASE_URL}/classes/12`);
        setIsLoading(false);
        setInfo(data);
        console.log(data);
    }

    React.useEffect(() => { getInformation(); }, []);

    return (
        // <Box sx={{ maxWidth: '100%' }}
        //     style={{
        //         display: 'flex',
        //         justifyContent: 'center',
        //     }}
        // >
        <>
            {
                isLoading ?
                    <Box sx={{ alignItems: 'center' }
                    } >
                        <CircularIndeterminate />
                    </Box > :
                    <Box sx={{ ...commonStyles, borderRadius: 2, borderColor: "grey.500", display: 'flex', justifyContent: 'space-between' }}>
                        <CardContent>
                            <Typography component="div" variant="h5">
                                {info.name}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                {info.description}
                            </Typography>
                        </CardContent>

                        <CardMedia
                            component="img"
                            sx={{
                                width: 151
                            }}
                            image="class.jpg"
                            alt="Live from space album cover"
                        />
                    </Box>
            }
        </>
        // </Box>
    );
}
