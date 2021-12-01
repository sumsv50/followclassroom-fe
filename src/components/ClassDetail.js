import Header from './Header';
import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CircularIndeterminate from './Progress'
import Badge from '@mui/material/Badge';
import { useParams } from 'react-router-dom';
import { getData } from '../configs/request';
import GradeList from './GradeList'
import { useNavigate} from 'react-router-dom';

export default function ClassDetail({reRender}) {

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
        console.log(`${process.env.REACT_APP_BASE_URL}/classes/${params.id}`);
        const data = await getData(`${process.env.REACT_APP_BASE_URL}/classes/${params.id}`);
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
            <Header val={0} classId={params.id} />
            <Container maxWidth="md">
                {
                    isLoading ?
                        <Box sx={{ alignItems: 'center' }}>
                            <CircularIndeterminate />
                        </Box > :
                            <div>
                                <Box sx={{
                                    ...commonStyles,
                                    borderRadius: 2, borderColor: "grey.500", display: 'flex', justifyContent: 'space-between'
                                }}>
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
                                        image="https://res.cloudinary.com/dzhnjuvzt/image/upload/v1637768355/class_ayj0mh.jpg"
                                        alt="Class_cover"
                                    />
                                </Box>
                                <Box sx={{ display: { xs: 12, md: 'flex' }}}>
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
