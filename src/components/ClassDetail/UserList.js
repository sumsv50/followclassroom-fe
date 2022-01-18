import * as React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useParams } from 'react-router-dom';
import Header from '../Common/Header';
import CircularIndeterminate from '../Common/Progress'
import { getData } from '../../configs/request';

export default function ResponsiveGrid() {
    const [userList, setUserList] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const params = useParams();

    const getUserList = async () => {
        setIsLoading(true);
        const data = await getData(`userclass/${params.id}`);
        setIsLoading(false);
        setUserList(Array.isArray(data) ? data : []);
        console.log(data);
    }

    React.useEffect(async () => {
        await getUserList();
    }, []);

    return (
        <>
            <Header val={1} classId={params.id} />
            <Container maxWidth="md">
                {
                    isLoading ?
                        <Box sx={{
                            display: 'flex',
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
                                                    primary={userclass.User.name}
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
                                                    primary={userclass.User.name}
                                                />
                                            </ListItem>
                                            <Divider component="li" />
                                        </>
                                        : <> </>
                                ))}
                            </List>
                        </Box>
                }
            </Container >
        </>
    );
}

