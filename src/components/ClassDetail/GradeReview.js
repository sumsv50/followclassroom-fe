import Header from '../Common/Header';
import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CircularIndeterminate from '../Common/Progress'
import { getData } from '../../configs/request';
import { useParams, useNavigate } from 'react-router-dom';
import dateFormat from "dateformat";
import { Link } from 'react-router-dom';

import { useUserInfo } from '../../follHooks';

export default function ClassDetail({ reRender }) {
    const commonStyles = {
        bgcolor: 'background.paper',
        m: 1,
        border: 1,
    };
    const [isLoading, setIsLoading] = React.useState(true);
    const [reviewList, setReviewList] = React.useState(null);
    const params = useParams();
    const { userInfo } = useUserInfo();
    const userId = userInfo.id
    let [userRole, setUserRole] = React.useState(null);

    const getUserDetail = async () => {
        const userDetail = await getData(`userclass/${params.id}/${userId}`);
        setUserRole(userDetail[0].role)
    }

    const getInformation = async () => {
        setIsLoading(true);
        const data = await getData(`review/${params.id}`);
        setReviewList(data);
        setIsLoading(false);
    }

    React.useEffect(() => { getInformation(); }, [reRender]);

    React.useEffect(() => {
        getUserDetail();
    }, [userId])

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
                        (
                            // userRole === 'teacher' ?
                            (
                                <div>
                                    {
                                        reviewList.map((item, index) => {
                                            return (
                                                <Card key={index} sx={{ minWidth: 275, ...commonStyles, borderColor: 'grey.300' }}>
                                                    <CardContent>
                                                        <Typography variant="h5" component="div">
                                                            {item.Score.User.student_id} - {item.Score.User.name}
                                                        </Typography>
                                                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                            {dateFormat(item.createdAt, "dddd, mmmm dS, yyyy, h:MM:ss TT")}
                                                        </Typography>
                                                        <Typography variant="h6">{item.Score.Grade.name}</Typography>
                                                        <Typography variant="body2">{item.student_explanation}</Typography>
                                                    </CardContent>
                                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                                        <CardActions>
                                                            <Link to={`/classes/${params.id}/${item.id}/gradereview`} style={{ textDecoration: 'none' }}>
                                                                <Button size="small">View detail</Button>
                                                            </Link>
                                                        </CardActions>
                                                    </Box>
                                                </Card>
                                            )
                                        })
                                    }

                                </div>
                            )
                            // :
                            // (
                            //     <></>
                            // )
                        )

                }
            </Container>
        </>
    );
}
