import * as React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import { useParams } from 'react-router-dom';
import Header from './Header';
import CircularIndeterminate from './Progress'
import { getData } from '../configs/request';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';


export default function ResponsiveGrid() {
    const [userList, setUserList] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const params = useParams();

    const getUserList = async () => {
        setIsLoading(true);
        const data = await getData(`${process.env.REACT_APP_BASE_URL}/userclass/${params.id}`);
        setIsLoading(false);
        setUserList(Array.isArray(data) ? data : []);
        console.log(data);
    }


    // React.useEffect(async () => {
    //     await getUserList();
    // }, [reRender]);
    React.useEffect(async () => {
        await getUserList();
    }, []);

    const commonStyles = {
        bgcolor: 'background.paper',
        m: 1,
        borderColor: 'text.primary',
        width: '5rem',
        height: '2rem',
    };

    return (
        <>
            <Header val={1} currentTab="member" classId={params.id} />
            <Container maxWidth="md">
                {/* <Box sx={{ flexGrow: 1 }}
                    style={{
                        display: 'flex',
                        // justifyContent: 'center',
                    }}
                > */}
                {
                    isLoading ?
                    <Box sx={{ display: 'flex',
                        marginTop: '35vh',
                        justifyContent: 'center'
                    }}>
                            <CircularIndeterminate />
                        </Box> :
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <List sx={{ width: '100%' }}>
                                <Typography variant="h4">
                                    Teacher
                                </Typography>
                                <Divider />
                                {userList.map((userclass, index) => (
                                    userclass.role === "teacher" ?
                                        <>
                                            <ListItem alignItems="flex-start">
                                                <ListItemText
                                                    primary={userclass.User.email}
                                                />
                                            </ListItem>
                                            <Divider component="li" />
                                        </>
                                        : <> </>
                                ))}
                            </List>
                            <List sx={{ mt: 4, width: '100%' }}>
                                <Typography variant="h4">
                                    Student
                                </Typography>
                                <Divider />
                                {userList.map((userclass, index) => (
                                    userclass.role === "student" ?
                                        <>
                                            <ListItem alignItems="flex-start">
                                                <ListItemText
                                                    primary={userclass.User.email}
                                                />
                                            </ListItem>
                                            <Divider component="li" />
                                        </>
                                        : <> </>
                                ))}
                            </List>
                            {/* <List sx={{ width: '100%', maxWidth: 360 }}>
                                    <Typography variant="h4">
                                        Giáo viên
                                    </Typography>
                                    <Divider />
                                    {userList.map((userclass, index) => (
                                        <>
                                            <ListItem alignItems="flex-start">
                                                <ListItemText
                                                    primary={userclass.User.email}
                                                />
                                            </ListItem>
                                            <Divider component="li" />
                                        </>
                                    ))}
                                </List> */}
                            {/* <Box sx={{
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
                                </Box> */}
                        </Box>
                }
                {/* </Box> */}
            </Container >


        </>
    );
}

