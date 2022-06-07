import React, {
  useMemo,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';

import 'firebase/auth';
import { useAuth, useUser } from 'reactfire';

import logOut from '../../../common/clearFirestoreCache';
import { getUserShortName } from '../../../common/utils';
import { UIContext } from '../UIContext';

const AuthenticatedLayout = ({
  children,
}: {
  children: React.ReactElement;
}): React.ReactElement => {
  const auth = useAuth();
  const { data: user, firstValuePromise } = useUser();
  const { setAlert } = useContext(UIContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [isUserLoaded, setIsUserLoaded] = useState(false);

  useEffect(() => {
    firstValuePromise.then(() => setIsUserLoaded(true));
  }, [firstValuePromise, isUserLoaded]);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = useCallback(async () => {
    try {
      await auth.signOut();
      logOut();
      handleClose();
    } catch (err) {
      setAlert({
        show: true,
        severity: 'error',
        message: 'Something went wrong. Try again',
      });
    }
  }, [auth, setAlert]);

  const getUserName = () => getUserShortName<typeof user>(user);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Voypost
          </Typography>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar>{getUserName()}</Avatar>
            </IconButton>
            <Menu
              id="profile-menu"
              aria-labelledby="demo-positioned-button"
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              keepMounted
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogOut}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      {children}
    </Box>
  );
};

export default AuthenticatedLayout;
