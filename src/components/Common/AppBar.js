import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useUserInfo } from '../../follHooks';
import { CreateClassFormDialog, JoinClassFormDialog } from '../RoomList/FormDialog';

export default function PrimarySearchAppBar({ toggleRerenderRoomList }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorClassEl, setAnchorClassEl] = React.useState(null);

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isClassMenuOpen = Boolean(anchorClassEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const { userInfo } = useUserInfo();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClassMenuOpen = (event) => {
    setAnchorClassEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleClassMenuClose = () => {
    setAnchorClassEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const [openDialog, setOpenDialog] = useState(false);
  const [openJoinClassDialog, setOpenJoinClassDialog] = useState(false);

  const handleOpenCreateClass = () => {
    setOpenDialog(true);
  };

  const handleCloseCreateClass = () => {
    setOpenDialog(false);
  };

  const handleOpenJoinClass = () => {
    setOpenJoinClassDialog(true);
  };

  const handleCloseJoinClass = () => {
    setOpenJoinClassDialog(false);
  };

  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    window.location.assign("/sign-in");
  }

  const navigate = useNavigate();
  const handleUser = () => {
    navigate('/user');
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
      disableAutoFocusItem
      PaperProps={{
        style: {
          left: '50%',
          transform: 'translateX(-10%) translateY(-5%)',
        }
      }}
      MenuListProps={{
        style: {
          padding: 0,
        }
      }}
    >
      {userInfo.email ? (
        <>
          <MenuItem style={{ opacity: '100%' }} disabled>
            {userInfo.name}
          </MenuItem>
          <hr
            style={{
              display: 'block',
              color: '#99979d',
              backgroundColor: '#99979d',
              height: 1
            }}
          />
        </>)
        : <></>}
      <MenuItem onClick={handleUser}>My Profile</MenuItem>
      <MenuItem onClick={handleLogOut}>Log out</MenuItem>
    </Menu >
  );

  const renderClassMenu = (
    <Menu
      open={isClassMenuOpen}
      anchorEl={anchorClassEl}
      onClose={handleClassMenuClose}
      disableAutoFocusItem
      PaperProps={{
        style: {
          left: '50%',
          transform: 'translateX(-40%) translateY(-15%)',
        }
      }}
      MenuListProps={{
        style: {
          padding: 0,
        },
      }}
    >
      <MenuItem onClick={handleOpenJoinClass}>Tham gia lớp học</MenuItem>
      <MenuItem onClick={handleOpenCreateClass}>Tạo lớp học</MenuItem>
    </Menu >
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleOpenCreateClass}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge color="error">
            <AddCircleIcon />
          </Badge>
        </IconButton>
        <p>Create Class</p>
      </MenuItem>
      <MenuItem onClick={handleOpenJoinClass}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge color="error">
            <AddCircleIcon />
          </Badge>
        </IconButton>
        <p>Join Class</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <Avatar src={userInfo.avatar} alt={userInfo.email} />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu >
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <CreateClassFormDialog open={openDialog} handleClose={handleCloseCreateClass} toggleRerenderRoomList={toggleRerenderRoomList} />
        <JoinClassFormDialog open={openJoinClassDialog} handleClose={handleCloseJoinClass} toggleRerenderRoomList={toggleRerenderRoomList} />
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              FOLL-CLASSROOM
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {/* <IconButton size="larg  e" aria-label="show 4 new mails" color="inherit" onClick={handleOpen}> */}
            {/* <Badge color="error">
              <AddCircleIcon />
            </Badge> */}
            {/* </IconButton> */}
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleClassMenuOpen}
              color="inherit"
            >
              <AddCircleIcon />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar src={userInfo.avatar} alt={userInfo.email} />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {renderClassMenu}
    </Box>
  );
}
