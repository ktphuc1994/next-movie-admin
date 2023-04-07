import { memo } from 'react';

// import types and interfaces
import { Moment } from 'moment';
import { InterfaceSearchBar } from 'core/interface/components/movieList.interface';

// import local library
import { mutate } from 'swr';

// import MUI components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import { DatePicker } from '@mui/x-date-pickers/DatePicker/';

const SearchBar = memo(
  ({ tenPhimRef, fromDateRef, toDateRef }: InterfaceSearchBar) => {
    const handleResetTenPhim = () => {
      tenPhimRef.current ? (tenPhimRef.current.value = '') : null;
    };
    const handleSearch = () => {
      mutate('moviePagi');
    };

    return (
      <Box
        component="div"
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'stretch', md: 'center' },
          mb: '1rem',
          flexShrink: 0,
        }}
      >
        <TextField
          size="small"
          margin="none"
          id="tenPhimInput"
          label="Tên phim"
          name="tenPhim"
          type="text"
          defaultValue=""
          inputRef={tenPhimRef}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="tenPhim-reset"
                  onClick={handleResetTenPhim}
                  edge="end"
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          sx={{ mx: { md: 1 }, my: { xs: 1, md: 0 } }}
          spacing={1}
        >
          <DatePicker
            label="Từ ngày"
            format="DD/MM/YYYY"
            slotProps={{
              textField: { size: 'small', fullWidth: true },
              actionBar: { actions: ['clear'] },
            }}
            onChange={(newValue: Moment | null) => {
              fromDateRef.current = newValue;
            }}
          />
          <DatePicker
            label="Đến ngày"
            format="DD/MM/YYYY"
            slotProps={{
              textField: { size: 'small', fullWidth: true },
              actionBar: { actions: ['clear'] },
            }}
            onChange={(newValue: Moment | null) => {
              toDateRef.current = newValue;
            }}
          />
        </Stack>
        <Button variant="contained" onClick={handleSearch}>
          Tìm
        </Button>
      </Box>
    );
  }
);

export default SearchBar;
