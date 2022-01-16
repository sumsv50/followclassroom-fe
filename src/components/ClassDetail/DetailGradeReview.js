import Header from '../Common/Header';
import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CircularIndeterminate from '../Common/Progress'
import { getData } from '../../configs/request';
import { useParams, useNavigate } from 'react-router-dom';

export default function ClassDetail({ reRender }) {

    // const commonStyles = {
    //     bgcolor: 'background.paper',
    //     m: 1,
    //     border: 1,
    //     width: '5rem',
    //     height: '5rem',
    //   };

    const commonStyles = {
        bgcolor: 'background.paper',
        m: 1,
        border: 1,
    };
    const [isLoading, setIsLoading] = React.useState(true);
    const navigate = useNavigate();

    const [info, setInfor] = React.useState('');
    const [gradeOrder, setGradeOrder] = React.useState([]);
    const params = useParams();

    const handleCreate = () => {
        navigate(`/classes/${params.id}/create-grade`);
    };

    const getInformation = async () => {
        setIsLoading(true);
        const data = await getData(`classes/${params.id}`);
        setIsLoading(false);
        setInfor(data);
        setGradeOrder(data.grade_order);
    }

    const handleDragAndDrop = (gradeOrder) => {
        setGradeOrder(gradeOrder);
    }

    React.useEffect(() => { getInformation(); }, [reRender]);

    return (
        <>
            <Header val={5} classId={params.id} />
            <Container maxWidth="md">
                {
                    isLoading ?
                        <Box sx={{
                            display: 'flex',
                            marginTop: '35vh',
                            justifyContent: 'center'
                        }}>
                            <CircularIndeterminate />
                        </Box > :
                        <div>
                            <Box sx={{
                                ...commonStyles,
                                borderRadius: 2, borderColor: "grey.500", display: 'flex', justifyContent: 'space-between'
                            }}>
                                <CardContent>
                                    <Typography component="div" variant="h5">
                                        Grade Manage
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        {info?.name}
                                    </Typography>
                                </CardContent>

                                <CardMedia
                                    component="img"
                                    sx={{
                                        width: 151
                                    }}
                                    image="https://res.cloudinary.com/dzhnjuvzt/image/upload/v1637768355/class_ayj0mh.jpg"
                                    alt="Class_cover"
                                />


                            </Box>

                            {/* <Box sx={{ ...commonStyles, borderColor: 'grey.500' }}> */}

                            <Card sx={{ minWidth: 275, ...commonStyles, borderColor: 'grey.300' }}>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        18120365 - Nguyen Quang Hiep
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        1 gio truoc
                                    </Typography>
                                    <Typography variant="h6">TKGD: Giua ki</Typography>
                                    <Typography variant="body2">I want to higher score</Typography>
                                </CardContent>
                                {/* <CardActions>
                                    <Button size="small">View detail</Button>
                                </CardActions> */}
                                <Divider />
                                <List
                                    sx={{
                                        width: '100%',
                                        // maxWidth: 360,
                                        bgcolor: 'background.paper',
                                    }}
                                >
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <AccountCircleIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Photos" secondary="import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';" />
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                    <ListItem >
                                        <ListItemAvatar>
                                            <Avatar>
                                                <AccountCircleIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Photos" secondary="import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';" />
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <AccountCircleIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Photos" secondary="import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';" />
                                    </ListItem>
                                    <Divider variant="inset" component="li" />

                                </List>
                                <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '95%', m: 2 }}>
                                    {/* <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} /> */}
                                    <Avatar sx={{ color: 'action.active', mr: 2, my: 0.5 }}>
                                        <AccountCircleIcon />
                                    </Avatar>
                                    <TextField id="input-with-sx" variant="standard" fullWidth />

                                </Box>
                            </Card>
                            <Card sx={{ minWidth: 275, ...commonStyles, borderColor: 'grey.300', marginTop: 2 }}>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        Nguyen Quang Hiep
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        1 gio truoc
                                    </Typography>
                                    <Typography variant="h6">TKGD</Typography>
                                    <Typography variant="body2">I want to higher score</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">View detail</Button>
                                </CardActions>
                            </Card>
                            <Card sx={{ minWidth: 275, ...commonStyles, borderColor: 'grey.300' }}>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        Nguyen Quang Hiep
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        1 gio truoc
                                    </Typography>
                                    <Typography variant="h6">TKGD</Typography>
                                    <Typography variant="body2">I want to higher score</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">View detail</Button>
                                </CardActions>
                            </Card>
                            {/* </Box> */}

                        </div>
                }
            </Container>
        </>
    );
}
