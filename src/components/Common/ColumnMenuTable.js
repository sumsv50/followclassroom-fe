import './ColumnMenuTable.css'
import * as React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import {
  GridColumnMenuContainer,
} from '@mui/x-data-grid';
import { postData } from '../../configs/request';
import { toast } from 'react-toastify'

const StyledGridColumnMenuContainer = styled(GridColumnMenuContainer)();

const createNotify = async (gradeId, handleReturn, render) => {
  const dataRes = await postData(`noti/create/gradenoti/${gradeId}`);
  await postData(`grades/complete/${gradeId}`);
  if (dataRes?.isSuccess) {
    toast.success("Return grade successfully!");
    handleReturn(render)
  }
}

function CustomColumnMenuComponent(props) {
  const { hideMenu, currentColumn, color, ...other } = props;

  if (!isNaN(Number(currentColumn.field))) {
    const handleImport = currentColumn.handleImport;
    const gradeId = currentColumn.field;
    const gradeName = currentColumn.headerName;
    const handleReturn = currentColumn.handleReturn;
    const render = currentColumn.render;

    return (
      <StyledGridColumnMenuContainer
        hideMenu={hideMenu}
        currentColumn={currentColumn}
        ownerState={{ color }}
        {...other}
      >
        <Box className='item' onClick={() => { handleImport(gradeId, gradeName) }}
          sx={{
            paddingX: 2,
            paddingY: 1
          }}
        >
          Import
        </Box>
        <Box className='item' onClick={() => createNotify(gradeId, handleReturn, render)} sx={{
          paddingX: 2,
          paddingY: 1
        }}>
          Return grade
        </Box>
      </StyledGridColumnMenuContainer>
    );
  }

  if (currentColumn.field == 'gpa') {
    return (
      <StyledGridColumnMenuContainer
        hideMenu={hideMenu}
        currentColumn={currentColumn}
        ownerState={{ color }}
        {...other}
      >
        <Box className='item' onClick={(e) => { console.log(e) }} sx={{
          paddingX: 2,
          paddingY: 1
        }}>
          Return all
        </Box>
      </StyledGridColumnMenuContainer>
    );
  }

  return (
    <StyledGridColumnMenuContainer
      hideMenu={hideMenu}
      currentColumn={currentColumn}
      ownerState={{ color }}
      {...other}
    >
    </StyledGridColumnMenuContainer>
  );

}

function CustomStudentColumnMenuComponent(props) {
  const { hideMenu, currentColumn, color, ...other } = props;
  if (!isNaN(Number(currentColumn.field))) {

    const handleRequestReview = currentColumn.handleRequestReview;
    const gradeId = currentColumn.field;
    const gradeName = currentColumn.headerName;

    return (
      <StyledGridColumnMenuContainer
        hideMenu={hideMenu}
        currentColumn={currentColumn}
        ownerState={{ color }}
        {...other}
      >
        <Box className='item' onClick={() => { handleRequestReview(gradeId) }}
          sx={{
            paddingX: 2,
            paddingY: 1
          }}
        >
          Request Review
        </Box>
      </StyledGridColumnMenuContainer>
    );
  }
  return (
    <StyledGridColumnMenuContainer
      hideMenu={hideMenu}
      currentColumn={currentColumn}
      ownerState={{ color }}
      {...other}
    >
    </StyledGridColumnMenuContainer>
  );

}

export { CustomColumnMenuComponent, CustomStudentColumnMenuComponent };