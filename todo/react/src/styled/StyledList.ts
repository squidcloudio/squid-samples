import { styled } from '@mui/material/styles';
import { ListItem } from '@mui/material';

export const StyledListWrapper = styled(ListItem)(({ theme }: any) => ({
  borderRadius: '12px',
  paddingBottom: '16px',

  '&:hover': {
    backgroundColor: theme === 'dark' ? '#23272F' : '#F8F9FC',
    cursor: 'pointer',
  },
}));

export default StyledListWrapper;
