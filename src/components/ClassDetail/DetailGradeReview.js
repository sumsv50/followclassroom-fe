import Header from '../Common/Header';
import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Card from "@mui/material/Card";
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CircularIndeterminate from '../Common/Progress'
import { useParams } from 'react-router-dom';
import dateFormat from "dateformat";
import { getData, postData } from '../../configs/request';
import { useUserInfo } from '../../follHooks';

export default function ClassDetail({ reRender }) {
    const commonStyles = {
        bgcolor: 'background.paper',
        m: 1,
        border: 1,
    };
    const [isLoading, setIsLoading] = React.useState(true);
    const [review, setReview] = React.useState([]);
    const [comments, setComments] = React.useState([]);
    const [comment, setComment] = React.useState('');
    const params = useParams();
    const { userInfo } = useUserInfo();
    const [render, setRender] = React.useState(false)

    const getInformation = async () => {
        setIsLoading(true);
        const data = await getData(`review/${params.class_id}`);
        const currentReview = data.find(r => r.id === +params.id);
        setReview(currentReview);
        setIsLoading(false);
    }

    const getComments = async () => {
        const commentList = await getData(`comment/${params.id}`);
        setComments(commentList);
    }

    React.useEffect(() => { getInformation(); }, [reRender]);

    React.useEffect(() => {
        getComments();
    }, [render])

    const handleSendComment = async (e) => {
        if (e.key === 'Enter') {
            setComment('');
            try {
                const data = {
                    content: comment
                }

                const response = await postData(`comment/${params.id}`, data);
                if (response?.isSuccess) {
                    const tmpComments = comments.slice();
                    setComments([...tmpComments, response.result.content]);
                    setRender((pre) => !pre)
                }
            } catch (err) {
                console.error(err);
            }
        }
    }

    console.log(comments)
    console.log(comment)

    return (
        <>
            <Header val={5} classId={params.class_id} />
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
                            <Card sx={{ minWidth: 275, ...commonStyles, borderColor: 'grey.300' }}>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {review.Score.User.student_id} - {review.Score.User.name}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        {dateFormat(review.createdAt, "dddd, mmmm dS, yyyy, h:MM:ss TT")}
                                    </Typography>
                                    <Typography variant="h6">{review.Score.Grade.name}</Typography>

                                    <Typography variant="body2">Current Grade: {review.Score.score}</Typography>
                                    <Typography variant="body2">Expected Grade: {review.expected_score}</Typography>
                                    <Typography variant="body2">Explaination: {review.student_explanation}</Typography>
                                </CardContent>
                                <Divider />
                                {
                                    comments.map((comment, index) => {
                                        return (
                                            <List
                                                sx={{
                                                    width: '100%',
                                                    bgcolor: 'background.paper',
                                                }}
                                            >
                                                <ListItem>
                                                    <ListItemAvatar>
                                                        <Avatar>
                                                            <AccountCircleIcon />
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        // primary={comment.User.name}
                                                        primary={comment?.User?.name ? comment.User.name : userInfo.name}
                                                        secondary={comment.content}
                                                    />
                                                </ListItem>
                                                <Divider variant="inset" component="li" />
                                            </List>
                                        )
                                    })
                                }
                                <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '95%', m: 2 }}>
                                    <Avatar sx={{ color: 'action.active', mr: 2, my: 0.5 }}>
                                        <AccountCircleIcon />
                                    </Avatar>
                                    <TextField value={comment} id="input-with-sx" variant="standard" fullWidth onChange={(e) => setComment(e.target.value)} onKeyDown={handleSendComment} />
                                </Box>
                            </Card>
                        </div>
                }
            </Container>
        </>
    );
}
