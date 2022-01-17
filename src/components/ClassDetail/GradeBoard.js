import Header from '../Common/Header';
import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarExport,
    gridClasses,
} from '@mui/x-data-grid';
import DownloadIcon from '@mui/icons-material/Download';
import Button from '@mui/material/Button';
import CircularIndeterminate from '../Common/Progress'
import { useParams } from 'react-router-dom';
import { getData, getGrade, postFile, postData } from '../../configs/request';
import { CustomColumnMenuComponent, CustomStudentColumnMenuComponent } from '../Common/ColumnMenuTable';
import DialogConfirmImport from '../Common/DialogConfirmImport';
import CircularProgress from '@mui/material/CircularProgress';
import fileTemplateForGrades from '../../assets/Template-for-grades.xlsx';
import fileTemplateForStudentList from '../../assets/Template-for-student-list.xlsx';
import StyledDropzone from './Dropzone'
import RequestReviewForm from './RequestReviewForm'

function calculatorGPA(student, grades) {
    let totalGradeBaseWeight = 0;
    let totalWeight = 0;
    for (const grade of grades) {
        totalGradeBaseWeight += (student.row[grade.id] ?? 0) * grade.weight;
        totalWeight += grade.weight;
    }
    return (totalGradeBaseWeight / totalWeight).toFixed(2);
}

function CustomToolbar() {
    return (
        <GridToolbarContainer sx={{ display: 'flex', justifyContent: 'center' }} className={gridClasses.toolbarContainer} >
            <GridToolbarExport csvOptions={{
                utf8WithBom: true
            }} />
        </GridToolbarContainer >
    );
}

export default function GradeBoard({ reRender }) {
    const commonStyles = {
        bgcolor: 'background.paper',
        m: 1,
        border: 1,
    };
    const [isLoading, setIsLoading] = React.useState(true);
    const [userList, setUserList] = React.useState([]);
    const [info, setInfo] = React.useState('');
    const [gradeDetail, setGradeDetail] = React.useState([]);
    const params = useParams();
    const inputRef = React.useRef(null);
    const currentGradeId = React.useRef();
    const currentGradeName = React.useRef();
    const currentFileImport = React.useRef();
    const [isOpenDialogConfirmImport, setIsOpenDialogConfirmImport] = React.useState(false);
    const [finishGrade, setFinishGrade] = React.useState([]);

    const [openRequestReview, setOpenRequestReview] = React.useState(false);
    const [reviewGradeId, setReviewGradeId] = React.useState(null)
    const handleRequestReview = (gradeId) => {
        setOpenRequestReview(true);
        setReviewGradeId(gradeId);
    }

    const handleCloseRequestReview = () => {
        setOpenRequestReview(false);
    }


    function handleImport(gradeId, gradeName) {
        console.log(gradeDetail);
        inputRef.current.click();
        currentGradeId.current = gradeId;
        currentGradeName.current = gradeName;

    }

    function handleUploadFileImportScores(gradeId, file) {
        return async () => {
            const fd = new FormData();
            fd.append('file', file, file.name);
            for (const user of userList) {
                user.isLoading = {};
                user.isLoading[`${gradeId}`] = true
            };
            setUserList(prevUserList => {
                const newUserList = prevUserList.slice();
                for (const user of newUserList) {
                    user.isLoading = {};
                    user.isLoading[`${gradeId}`] = true;
                    user.isLoading["gpa"] = true;
                };
                return newUserList;
            });
            const res = await postFile(`scores/${gradeId}/import-scores`, fd);

            if (res?.isSuccess) {
                setUserList(prevUserList => {
                    const newUserList = prevUserList.slice();
                    for (const user of newUserList) {
                        const score = res.data[user.student_id];
                        if (score != undefined) {
                            user[`${gradeId}`] = score;
                        }
                        delete user["isLoading"];
                    };
                    return newUserList;
                })
                return;
            }
            setUserList(prevUserList => {
                const newUserList = prevUserList.slice();
                for (const user of newUserList) {
                    delete user["isLoading"];
                };
                return newUserList;
            })
        }
    }


    const columns = [
        { field: 'student_id', headerName: 'StudentID', flex: 1, headerAlign: 'center', align: 'center' },
        { field: 'fullname', headerName: 'Name', width: 200, flex: 1, headerAlign: 'center', align: 'center' },
        ...gradeDetail.map(grade => ({
            field: `${grade.id}`, headerName: `${grade.name} (${grade.weight})`, type: 'number',
            editable: true, hideSortIcons: true, flex: 1, headerAlign: 'center', align: 'center',
            renderCell: (cellValues) => {
                if (cellValues.row.isLoading?.[cellValues.field]) {
                    return <CircularProgress />
                }
                return cellValues.value
            },
            handleImport
        })),
        {
            field: 'gpa', headerName: 'GPA', type: 'number', flex: 1, headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => calculatorGPA(params, gradeDetail),
            renderCell: (cellValues) => {
                if (cellValues.row.isLoading?.["gpa"]) {
                    return <CircularProgress />
                }
                return cellValues.value
            },
        }
    ];

    const studentColumns = [
        { field: 'student_id', headerName: 'StudentID', flex: 1, align: 'center', headerAlign: 'center', hideSortIcons: true },
        { field: 'fullname', headerName: 'Name', width: 200, flex: 1, align: 'center', headerAlign: 'center', hideSortIcons: true },
        ...finishGrade.map(grade => ({
            field: `${grade.id}`, headerName: `${grade.name} (${grade.weight})`, type: 'number',
            editable: false, hideSortIcons: true, flex: 1, headerAlign: 'center', align: 'center',
            renderCell: (cellValues) => {
                if (cellValues.row.isLoading?.[cellValues.field]) {
                    return <CircularProgress />
                }
                return cellValues.value
            },
            handleRequestReview
        })),
        {
            field: 'gpa', headerName: 'GPA', type: 'number', flex: 1, headerAlign: 'center', hideSortIcons: true,
            align: 'center',
            valueGetter: (params) => calculatorGPA(params, finishGrade),
            renderCell: (cellValues) => {
                if (cellValues.row.isLoading?.["gpa"]) {
                    return <CircularProgress />
                }
                return cellValues.value
            },
        }
    ];

    const getUserList = async () => {
        setIsLoading(true);
        const data = await getData(`gradeboard/${params.id}`);
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

    const [file, setFile] = React.useState(null);

    const fileSelectedHandler = (e) => {
        setFile(e.target.files[0]);

    }

    const fileUploadHandler = async (e) => {
        const fd = new FormData();
        fd.append('file', file, file.name);
        const res = await postFile(`gradeboard/${params.id}/upload-studentlist`, fd);
        if (res?.isSuccess) {
            getInformation();
        }
    }

    const getInformation = async () => {
        setIsLoading(true);
        const data = await getData(`classes/${params.id}`);
        setIsLoading(false);
        setInfo(data);
        if (data?.grade_order) {
            await getGradeDetail(params.id, data.grade_order);
        }
        await getUserList();
    }

    const [userId, setUserId] = React.useState(null);
    const [studentId, setStudentId] = React.useState(null);
    const [userDetail, setUserDetail] = React.useState(null);

    const getUserId = async () => {
        const user = await getData(`api/user-infor`);
        if (user) {
            setIsLoading(false);
        }
        setUserId((user) ? user?.authorization?.id : null);
        setStudentId((user) ? user?.authorization?.student_id : null);
    }

    const getUserDetail = async () => {
        if (userId) {
            const userDetail = await getData(`userclass/${params.id}/${userId}`);
            console.log("user", userDetail);
            console.log(`userclass/${params.id}/${userId}`)
            setUserDetail(userDetail);
            setUserRole(userDetail[0].role)
        }
    }
    console.log(userId);
    console.log(userDetail);

    const getFinishGrade = async () => {
        setIsLoading(true);
        const data = await getData(`grades/${params.id}`);
        setIsLoading(false);
        const finishGrade = data.filter(grade => grade?.is_finish)
        setFinishGrade(finishGrade);
    }

    let [userRole, setUserRole] = React.useState(null);

    const currentUser = userList.filter(user => user.student_id === studentId)
    console.log(currentUser);
    React.useEffect(() => {
        getInformation();
        getUserId();
        getFinishGrade();
    }, [reRender]);
    console.log(finishGrade);
    console.log(userList)

    React.useEffect(() => {
        getUserDetail();
    }, [userId])
    console.log(userRole)


    return (
        <>
            <Header val={4} classId={params.id} />
            <Container>
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
                                <DialogConfirmImport isOpen={isOpenDialogConfirmImport}
                                    handleUpload={handleUploadFileImportScores(currentGradeId.current, currentFileImport.current)}
                                    handleClose={() => {
                                        setIsOpenDialogConfirmImport(false);
                                    }}
                                    gradeName={currentGradeName.current}
                                />
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
                            {
                                userRole === 'teacher' ?
                                    (<Box
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
                                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100 % ' }}>
                                                <Button variant='text' href={fileTemplateForGrades} startIcon={<DownloadIcon />}>
                                                    Grades for an assignment Template
                                                </Button>

                                                <Button variant='text' href={fileTemplateForStudentList} startIcon={<DownloadIcon />}>
                                                    Student List Template
                                                </Button>
                                            </Box>

                                            <StyledDropzone content='UPLOAD STUDENT LIST' getInformation={getInformation} />
                                        </CardContent>
                                        <div style={{ height: 500, width: '100%' }}>

                                            <DataGrid
                                                autoHeight={true}
                                                rows={userList}
                                                columns={columns}
                                                components={{
                                                    ColumnMenu: CustomColumnMenuComponent,
                                                    Toolbar: CustomToolbar,

                                                }}
                                                pageSize={30}
                                                rowsPerPageOptions={[4]}
                                                onCellEditCommit={newSelection => {
                                                    const studentId = userList.find(user => user.id == newSelection.id).student_id
                                                    const gradeId = newSelection?.field;
                                                    const score = newSelection?.value;
                                                    if (!studentId || !gradeId || score == undefined) {
                                                        return;
                                                    }
                                                    postData(`scores/${gradeId}`, { studentId, score });
                                                }}
                                            />
                                        </div>
                                    </Box>
                                    )
                                    :
                                    (
                                        <>
                                            <DataGrid
                                                autoHeight={true}
                                                rows={currentUser}
                                                columns={studentColumns}
                                                components={{
                                                    ColumnMenu: CustomStudentColumnMenuComponent,
                                                }}
                                                hideFooter
                                                cell--textCenter
                                            />

                                            <RequestReviewForm open={openRequestReview} close={handleCloseRequestReview} studentId={studentId} gradeId={reviewGradeId} />
                                        </>
                                    )
                            }
                        </div>
                }
            </Container >
        </>
    );
}





