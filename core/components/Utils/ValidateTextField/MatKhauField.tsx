import { useState, useRef, ChangeEvent } from 'react';

// import types and interfaces
import { InterfaceValidateMatKhau } from 'core/interface/components/index.interface';

// import local constants
import { validateRegEx } from 'core/constants/default.const';

// import MUI components
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const { regex, message } = validateRegEx.password;

const MatKhauField = ({
  required = false,
  validRegEx = regex,
  errMess = message,
  fieldRef,
}: InterfaceValidateMatKhau) => {
  const [matKhau, setMatKhau] = useState<string | undefined>();
  const [passErr, setPassErr] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // DEBOUNCE ref
  const dbPassRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // event handling
  const handlePassInput = (e: ChangeEvent<HTMLInputElement>) => {
    setMatKhau(e.target.value);
    if (validRegEx) {
      clearTimeout(dbPassRef.current);
      dbPassRef.current = setTimeout(() => {
        const isValid = validRegEx.test(e.target.value);
        if (!isValid) {
          setPassErr(true);
          return;
        }
        setPassErr(false);
      }, 200);
    }
  };

  return (
    <TextField
      name="matKhau"
      required={required}
      error={passErr}
      helperText={passErr ? errMess : undefined}
      fullWidth
      id="matKhau-user-form"
      label="Mật khẩu"
      value={matKhau}
      onChange={handlePassInput}
      inputRef={fieldRef}
      type={showPassword ? 'text' : 'password'}
      autoComplete="new-password"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="show-password"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default MatKhauField;
