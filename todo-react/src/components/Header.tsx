import vector from '../images/Vector.png';
import td from '../images/T•D•.png';
import { useAuth0 } from '@auth0/auth0-react';
import { IconButton } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import { useContext } from 'react';
import { Theme, ThemeContext } from '../context';

const Header = ({ setDrawerOpen, todos }: any) => {
  const { user } = useAuth0();
  const { theme, setTheme } = useContext(ThemeContext);

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
          <img src={user?.picture} alt="avatar" className="header_avatar" />
        </div>
      </header>
    </>
  );
};

export default Header;
