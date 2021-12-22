import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useNavigate, Link } from 'react-router-dom';

export default function PrimarySearchAppBar({ val, currentTab, classId }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const navigate = useNavigate();
  const handleUser = () => {
    navigate('/user');
  }

  const navigateToInfoTab = () => {
    navigate(`/classes/${classId}`);
  }

  const navigateToMemberTab = () => {
    navigate(`/classes/${classId}/userclass`);
  }

  const navigateToGradeTab = () => {
    navigate(`/classes/${classId}/grade`);
  }

  const navigateToInviteTab = () => {
    navigate(`/classes/${classId}/getlink`);
  }

  const navigateToBoardTab = () => {
    navigate(`/classes/${classId}/gradeboard`);
  }

  const handleLogOut = () => {
    localStorage.removeItem('token');
    window.location.assign("/sign-in");
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleUser}>My Profile</MenuItem>
      <MenuItem onClick={handleLogOut}>Log out</MenuItem>
    </Menu>
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
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ display: 'flex', flexGrow: 1 }}>
      {/* <BrowserRouter> */}
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

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

          <Box sx={{ display: 'flex', flexGrow: 5, justifyContent: 'center' }}>
            <Tabs
              value={val}
              TabIndicatorProps={{
                style: {
                  background: 'black',
                },
              }}
              textColor="white"
              aria-label="secondary tabs example">
              <Tab onClick={navigateToInfoTab} value={0}
                label={<span>Info</span>}
              />
              <Tab onClick={navigateToMemberTab} value={1}
                label={<span>Member</span>}
              />
              <Tab onClick={navigateToGradeTab} value={2}
                label={<span>Grade</span>}
              />
              <Tab onClick={navigateToInviteTab} value={3}
                label={<span>Invite</span>}
              />
              <Tab onClick={navigateToBoardTab} value={4}
                label={<span>Grade Board</span>}
              />
            </Tabs>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
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
      {/* <Routes>
          <Route path="/class" />
        </Routes>
      </BrowserRouter> */}
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
