import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import MoreIcon from '@mui/icons-material/MoreVert';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import Popover from '@mui/material/Popover';

import { useNavigate, Link, useParams } from 'react-router-dom';
import { useUserInfo } from '../../follHooks';
import { getData } from '../../configs/request';
import AlignItemsList from './NotificationList';

export default function PrimarySearchAppBar({ val, currentTab, classId }) {
  const params = useParams();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [notifyList, setNotifyList] = React.useState([]);
  const { userInfo } = useUserInfo();
  const userId = userInfo.id;
  let [userRole, setUserRole] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleClickNotify = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleCloseNotify = () => {
    setAnchorEl2(null);
  };

  const getUserDetail = async () => {
    const userDetail = await getData(`userclass/${params.id}/${userId}`);
    setUserRole(userDetail[0].role)
  }

  const getNotify = async () => {
    const notify = await getData('noti');
    if (!Array.isArray(notify)) {
      return;
    }
    setNotifyList(notify);
  }

  React.useEffect(() => {
    getUserDetail();
    getNotify();
  }, [])

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

  const navigateToGradeReviewTab = () => {
    navigate(`/classes/${classId}/gradereview`);
  }

  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    window.location.assign("/sign-in");
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
      PaperProps={{
        style: {
          left: '50%',
          transform: 'translateX(-10%) translateY(-8%)',
        }
      }}
      MenuListProps={{
        style: {
          padding: 0,
        },
      }}
    >
      {userInfo.email ? (
        <>
          <MenuItem style={{ opacity: '100%' }} disabled>
            {userInfo.email}
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
          <Avatar src={userInfo.avatar} alt={userInfo.email} />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ display: 'flex', flexGrow: 1 }}>
      <AppBar position="static">
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
              {/* 
              {
                userRole === 'teacher' ? (
                  <> */}

              <Tab onClick={navigateToGradeTab} value={2}
                label={<span>Grade</span>}
              />
              <Tab onClick={navigateToInviteTab} value={3}
                label={<span>Invite</span>}
              />
              {/* </>
                ) : (<></>)
              } */}


              <Tab onClick={navigateToBoardTab} value={4}
                label={<span>Grade Board</span>}
              />
              <Tab onClick={navigateToGradeReviewTab} value={5}
                label={<span>Grade Review</span>}
              />
            </Tabs>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <MenuItem>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                onClick={handleClickNotify}
              >
                <Badge badgeContent={0} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </MenuItem>
            <Popover
              id={anchorEl2 ? 'simple-popover' : undefined}
              open={!!anchorEl2}
              anchorEl={anchorEl2}
              onClose={handleCloseNotify}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <AlignItemsList notifyList={notifyList} />
            </Popover>
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
    </Box>
  );
}
