import './ColumnMenuTable.css'
import * as React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import {
  GridColumnMenuContainer,
} from '@mui/x-data-grid';

const StyledGridColumnMenuContainer = styled(GridColumnMenuContainer)();

function CustomColumnMenuComponent(props) {
  const { hideMenu, currentColumn, color, ...other } = props;

  if (!isNaN(Number(currentColumn.field))) {
    const handleImport = currentColumn.handleImport;
    const gradeId = currentColumn.field;
    const gradeName = currentColumn.headerName;
    return (
      <StyledGridColumnMenuContainer
        hideMenu={hideMenu}
        currentColumn={currentColumn}
        ownerState={{ color }}
        {...other}
      >
        <Box className='item' onClick={() => {handleImport(gradeId, gradeName) }}
          sx={{
            paddingX: 2,
            paddingY: 1
          }}
        >
          Import
        </Box>
        <Box className='item' onClick={(e) => { console.log(e) }} sx={{
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

export { CustomColumnMenuComponent };