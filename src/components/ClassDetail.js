// import '../App.css';
import Header from './Header';
import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CircularIndeterminate from './Progress'
import { useParams } from 'react-router-dom';
import { getData } from '../configs/request';
import GradeList from './GradeList'

export default function ClassDetail({reRender}) {

    const commonStyles = {
        bgcolor: 'background.paper',
        m: 1,
        border: 1,
    };
    const [isLoading, setIsLoading] = React.useState(true);

    const [info, setInfor] = React.useState('');
    const params = useParams();

    const getInformation = async () => {
        setIsLoading(true);
        console.log(`${process.env.REACT_APP_BASE_URL}/classes/${params.id}`);
        const data = await getData(`${process.env.REACT_APP_BASE_URL}/classes/${params.id}`);
        setIsLoading(false);
        setInfor(data);
        //console.log(info);
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
                                        image="../class.jpg"
                                        alt="Class_cover"
                                    />
                                </Box>

                                <GradeList grade_order = {info.grade_order}></GradeList>
                            </div>
                }
            </Container>
        </>
    );
}
