import { FormEvent, MouseEvent, useState } from 'react';

// import Next
import { useRouter } from 'next/router';

// import local services
import userServ from '../../services/userServ';
import localServ from '../../services/localServ';

// import local library
import { mutate } from 'swr';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

// import types and interfaces
import { InterfaceLoginPageComponent } from '../../interface/components/index.interface';

// import local components
import StyledTextField, { inputStyle } from '../Styled/StyledTextField';

// import local utils
import { axiosErrorHandling } from '../../utilities';

// import MUI components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import LockPerson from '@mui/icons-material/LockPerson';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const LoginPage = ({ setLoading }: InterfaceLoginPageComponent) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSummit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get('email') as string;
    const matKhau = formData.get('matKhau') as string;
    try {
      const { Authorization } = await userServ.login({ email, matKhau });
      localServ.setToken(Authorization);

      const userInfo = await mutate('user');
      if (userInfo?.loaiNguoiDung === 'ADMIN') {
        toast('Đăng nhập thành công', {
          type: 'success',
          toastId: 'login-transition',
        });
        router.replace('/');
      } else {
        localServ.removeToken();
        toast(
          'Người dùng không đủ quyền truy cập. Vui lòng chọn tài khoản khác.',
          { type: 'error', autoClose: 3000 }
        );
      }
    } catch (err) {
      axiosErrorHandling(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LockPerson fontSize="large" sx={{ mb: '0.5rem' }} />
      <Typography component="h1" variant="h4">
        Login In
      </Typography>
      <Box component="form" onSubmit={handleSummit}>
        <StyledTextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          type="email"
          defaultValue=""
          autoComplete="email"
          autoFocus
          sx={{ mb: '1rem' }}
        />
        <FormControl
          sx={{ ...inputStyle, width: '100%' }}
          variant="outlined"
          required
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Mật khẩu
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  sx={{
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    },
                  }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Mật khẩu"
            name="matKhau"
            defaultValue=""
            autoComplete="password"
          />
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: '1.5rem' }}
        >
          Log In
        </Button>
      </Box>
    </>
  );
};

export default LoginPage;
