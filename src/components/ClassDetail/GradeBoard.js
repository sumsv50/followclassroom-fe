import Header from '../Common/Header';
import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import CircularIndeterminate from '../Common/Progress'
import { useParams, useNavigate } from 'react-router-dom';
import { getData, getGrade, postData } from '../../configs/request';
import fileTemplateForGrades from '../../assets/Template-for-grades.xlsx'


export default function GradeBoard({ reRender }) {

    const commonStyles = {
        bgcolor: 'background.paper',
        m: 1,
        border: 1,
    };
    const [isLoading, setIsLoading] = React.useState(true);
    const [gradeOrder, setGradeOrder] = React.useState([]);
    const [userList, setUserList] = React.useState([]);
    const navigate = useNavigate();

    const [info, setInfor] = React.useState('');
    const [gradeDetail, setGradeDetail] = React.useState([]);
    const params = useParams();

    const columns = [
        { field: 'student_id', headerName: 'StudentID'},
        // { field: 'User', headerName: 'Email', width: 200, renderCell: params => params.value.email },
        { field: 'fullname', headerName: 'Name', width: 200},
        ...gradeDetail.map(grade => ({
            field: `GD ${grade.id}`, headerName: grade.name, type: 'number', editable: true,
        })),
        { field: 'gpa', headerName: 'GPA', type: 'number'}
    ];

    const getUserList = async () => {
        setIsLoading(true);
        const data = await getData(`${process.env.REACT_APP_BASE_URL}/gradeboard/${params.id}`);
        setIsLoading(false);
        setUserList(Array.isArray(data) ? data : []);
    }

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
        const data = await getData(`${process.env.REACT_APP_BASE_URL}/classes/${params.id}`);
        setIsLoading(false);
        setInfor(data);
        setGradeOrder(data?.grade_order);
        await getGradeDetail(params.id, data.grade_order);
        await getUserList();
    }

    React.useEffect(() => { getInformation(); }, [reRender]);

    return (
        <>
            <Header val={4} classId={params.id} />
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
                                <CardContent
                                    style={{ textAlign: 'left' }}
                                >
                                    <Typography variant="h7" component="div" style={{ color: 'black' }}>
                                        Template for grades for an assignment:
                                        <a href={fileTemplateForGrades} download="Template-for-grades.xlsx">Download Here</a>
                                    </Typography>
                                    <br />
                                </CardContent>
                                <div style={{ height: 500, width: '100%' }}>
                                    <DataGrid
                                        rows={userList}
                                        columns={columns}
                                        pageSize={30}
                                        rowsPerPageOptions={[4]}
                                        onCellEditCommit={newSelection => {
                                            const studentId = userList.find(user => user.id == newSelection.id).student_id
                                            const gradeId = newSelection?.field?.split(' ')[1];
                                            const score = newSelection?.value;
                                            if(!studentId || !gradeId || !score) {
                                                return;
                                            }
                                            postData(`${process.env.REACT_APP_BASE_URL}/scores/${gradeId}`, {studentId, score});
                                        }}
                                    />
                                </div>
                            </Box>
                        </div>
                }
            </Container>
        </>
    );
}

