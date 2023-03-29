import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

export const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#212121',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#E1E6EF',
      backgroundColor: '#F8F9FC',
      borderRadius: '12px',
      color: '#212121',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#212121',
      backgroundColor: 'transparent',
    },
  },
});
