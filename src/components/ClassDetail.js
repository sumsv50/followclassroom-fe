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
function ClassDetail() {

    const commonStyles = {
        bgcolor: 'background.paper',
        m: 1,
        border: 1,
    };
    const [isLoading, setIsLoading] = React.useState(true);

    const [info, setInfo] = React.useState('');
    const params = useParams();
    // console.log(params.id);


    const getInformation = async () => {
        setIsLoading(true);
        const data = await getData(`${process.env.REACT_APP_BASE_URL}/classes/${params.id}`);
        setIsLoading(false);
        setInfo(data);
        // console.log(data);
    }

    React.useEffect(() => { getInformation(); }, []);

    return (
        <>
            <Header val={0} classId={params.id} />
            <Container maxWidth="md">
                {
                    isLoading ?
                        <Box sx={{ alignItems: 'center' }
                        } >
                            <CircularIndeterminate />
                        </Box > :
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
                }
            </Container>
        </>
    );
}

export default ClassDetail;
