import vector from '../images/Vector.png';
import td from '../images/T•D•.png';
import { useAuth0 } from '@auth0/auth0-react';
import { IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import { useCallback, useContext, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';

import LogoutIcon from '@mui/icons-material/Logout';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';

const Header = ({ setDrawerOpen, todos }: any) => {
  const { user, logout } = useAuth0();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { theme, setTheme } = useContext(ThemeContext);

  const handleClick = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    console.log('theme', theme);
  }, [setTheme, theme]);

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <header style={{ backgroundColor: todos ? todos.data.color : '#14BE6E' }} className="header">
        <IconButton onClick={() => setDrawerOpen(true)} className="burger">
          <MenuIcon sx={{ display: { xs: 'block', md: 'none' } }} />
        </IconButton>
        <div className="logo">
          <img src={vector} alt="" />
          <img src={td} alt="" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} />
        </div>
        <div>
          <img
            src={user?.picture}
            alt="avatar"
            className="header_avatar"
            onClick={(e) => setAnchorEl(e.currentTarget)}
          />
        </div>
      </header>

      <Menu
        onClick={handleCloseMenu}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={handleClick}>
          <ListItemIcon>
            {theme === 'dark' ? <LightModeOutlinedIcon fontSize="small" /> : <DarkModeOutlinedIcon fontSize="small" />}
          </ListItemIcon>
          {theme === 'dark' ? 'Light' : 'Dark'} mode
        </MenuItem>
        <MenuItem onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Log out
        </MenuItem>
      </Menu>
    </>
  );
};

export default Header;
