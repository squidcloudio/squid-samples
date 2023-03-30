import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

export const CssTextField = styled(TextField)({
  '& input': {
    backgroundColor: '#f8f9fc',
    borderRadius: '12px',
  },
  '& label.Mui-focused': {
    color: '#212121',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#E1E6EF',
      borderRadius: '12px',
      color: '#212121',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#212121',
      backgroundColor: 'transparent !important',
    },
  },
});
