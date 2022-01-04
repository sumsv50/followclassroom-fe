import Header from '../Common/Header';
import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import CircularIndeterminate from '../Common/Progress'
import GradeList from './GradeList'
import { getData } from '../../configs/request';
import { useParams, useNavigate } from 'react-router-dom';

export default function ClassDetail({ reRender }) {

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
            <Header val={2} classId={params.id} />
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
                            <Box sx={{ display: { xs: 12, md: 'flex' } }}>
                                <IconButton size="large" aria-label="show 4 new mails" color="inherit" onClick={handleCreate}>
                                    <Badge color="error">
                                        <AddCircleIcon />
                                    </Badge>
                                </IconButton>
                            </Box>

                            <GradeList onDragAndDrop={handleDragAndDrop} grade_order={gradeOrder}></GradeList>
                        </div>
                }
            </Container>
        </>
    );
}
