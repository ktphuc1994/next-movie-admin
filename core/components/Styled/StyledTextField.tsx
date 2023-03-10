import { SxProps, TextField, Theme, TextFieldProps } from '@mui/material';

export const inputStyle: SxProps<Theme> = {
  '& label': { color: 'white', '&.Mui-focused': { color: 'white' } },
  '& .MuiInputBase-root': {
    '&:hover fieldset': { borderColor: 'white' },
    fieldset: {
      borderColor: 'rgba(255, 255, 255, 0.23)',
    },
    input: {
      color: 'white',
      '&:-webkit-autofill': {
        transition: 'background-color 600000s 0s, color 600000s 0s',
      },
    },
  },
  '&.MuiFormControl-root .Mui-focused fieldset': {
    borderColor: 'white',
  },
};

const StyledTextField = ({ sx, ...props }: TextFieldProps) => {
  return (
    <TextField {...props} sx={sx ? { ...inputStyle, ...sx } : inputStyle} />
  );
};

export default StyledTextField;
