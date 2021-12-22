import Header from '../Common/Header';
import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import CircularIndeterminate from '../Common/Progress'
import { useParams, useNavigate } from 'react-router-dom';
import { getData, getGrade } from '../../configs/request';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

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
    const [gradeDetail, setGradeDetail] = React.useState([]);
    const params = useParams();

    const getGradeDetail = async (classId, gradeIdList) => {
        setGradeDetail(Array(gradeIdList.length).fill({}));

        gradeIdList.forEach(async (gradeId, index) => {
            const gradeDetail = await getGrade(classId, gradeId);
            setGradeDetail(current => {
                const newGradeDetail = current.slice();
                newGradeDetail[index] = gradeDetail;
                return newGradeDetail;
            })
        });
    }
    const getInformation = async () => {
        setIsLoading(true);
        console.log(`${process.env.REACT_APP_BASE_URL}/classes/${params.id}`);
        const data = await getData(`${process.env.REACT_APP_BASE_URL}/classes/${params.id}`);
        setIsLoading(false);
        setInfor(data);
        setGradeOrder(data.grade_order);
        await getGradeDetail(params.id, data.grade_order);
    }


    React.useEffect(() => { getInformation(); }, [reRender]);

    return (
        <>
            <Header val={0} classId={params.id} />
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
                                        {info?.name}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        {info?.description}
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
                            <Box
                                sx={{
                                    width: '100%',
                                    height: '140px',
                                    color: '#fff',
                                    '& > .MuiBox-root > .MuiBox-root': {
                                        p: 1,
                                        borderRadius: 1,
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(5, 3fr)',
                                        gap: 1,
                                        gridTemplateRows: 'auto',
                                        gridTemplateAreas: `"sidebar main main main main"`,
                                    }}
                                >
                                    <Box sx={{ gridArea: 'sidebar' }}>
                                        <Card sx={{ minWidth: 100 }}>
                                            <CardContent
                                                style={{ textAlign: 'left' }}
                                            >
                                                <Typography variant="h7" component="div">
                                                    <b>Grade Structure</b>
                                                </Typography>
                                                <br />
                                                {
                                                    gradeDetail.map(grade => {
                                                        return (<Typography variant="body2" key={grade.id}>
                                                            {bull}  {grade.name}: {grade.weight}
                                                        </Typography>)
                                                    })
                                                }

                                                <br />
                                            </CardContent>

                                            <CardActions>
                                                <Button size="small" onClick={() => { navigate(`/classes/${params.id}/grade`); }}>
                                                    Edit
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Box>
                                    <Box sx={{ gridArea: 'main', bgcolor: 'secondary.main' }}>Content</Box>
                                </Box>
                            </Box>
                        </div>
                }
            </Container>
        </>
    );
}
