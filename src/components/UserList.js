import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';

import ClassThumb from './ClassThumb';
import Header from './Header';
import CircularIndeterminate from './Progress'
import { getData } from '../configs/request';

export default function ResponsiveGrid({ reRender }) {
    const [userList, setUserList] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const getUserList = async () => {
        setIsLoading(true);
        const data = await getData(`${process.env.REACT_APP_BASE_URL}/userclass`);
        setIsLoading(false);
        setUserList(Array.isArray(data) ? data : []);
        console.log(data);
    }

    React.useEffect(async () => {
        await getUserList();
    }, [reRender]);

    const commonStyles = {
        bgcolor: 'background.paper',
        m: 1,
        borderColor: 'text.primary',
        width: '5rem',
        height: '2rem',
    };

    return (
        <>
            <Header />
            <Container maxWidth="lg">
                <Box sx={{ flexGrow: 1 }}
                    style={{
                        display: 'flex',
                        // justifyContent: 'center',
                    }}
                >
                    {
                        isLoading ?
                            <Box sx={{ marginTop: '35vh' }}>
                                <CircularIndeterminate />
                            </Box> :
                            <Container maxWidth="md">
                                <Box sx={{
                                    width: 300,
                                    height: 300,
                                }}>
                                    <Typography variant="h4">
                                        Giáo viên
                                    </Typography>
                                    <Divider />
                                    {
                                        userList.map((userclass, index) => (
                                            userclass.role === 'student' ?
                                                <>
                                                    <Box sx={{ ...commonStyles }}>
                                                        <Typography>
                                                            {userclass.User.email}
                                                        </Typography>
                                                    </Box>
                                                    <Divider light />
                                                </>
                                                : <> </>))
                                    }
                                </Box>
                            </Container>
                    }
                </Box>
            </Container>


        </>
    );
}

