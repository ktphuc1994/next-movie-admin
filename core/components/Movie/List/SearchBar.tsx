import { memo } from 'react';

// import types and interfaces
import { Moment } from 'moment';
import { InterfaceSearchBar } from 'core/interface/components/index.interface';

// import local library
import { mutate } from 'swr';

// import MUI components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
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
        sx={{ display: 'flex', alignItems: 'center', mb: '1rem' }}
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
        <DatePicker
          label="Từ ngày"
          format="DD/MM/YYYY"
          sx={{ mx: { xs: 0, md: '1rem' } }}
          slotProps={{
            textField: { size: 'small' },
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
            textField: { size: 'small' },
            actionBar: { actions: ['clear'] },
          }}
          onChange={(newValue: Moment | null) => {
            toDateRef.current = newValue;
          }}
        />
        <Button variant="contained" onClick={handleSearch} sx={{ ml: '1rem' }}>
          Search
        </Button>
      </Box>
    );
  }
);

export default SearchBar;
