import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { styled } from '@mui/material/styles';

export const StyledDatePicker = styled(DatePicker)(({ theme }) => ({
  '& .MuiInputBase-root': {
    borderRadius: '12px',
    backgroundColor: '#F8F9FC',
    '&.Mui-focused fieldset': {
      borderColor: '#212121',
    },
  },
  '& .MuiPickersBasePicker-pickerView': {
    backgroundColor: '#f7f7f7',
  },
  '& .MuiPickersDay-daySelected': {
    backgroundColor: '#f7f7f7',
  },
}));
