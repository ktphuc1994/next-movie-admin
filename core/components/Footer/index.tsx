import { Box, Typography } from '@mui/material';

// import MUI components
import { memo } from 'react';

const Footer = memo(() => {
  return (
    <Box sx={{ flexShrink: 0, my: '0.5rem' }}>
      <Typography component="p" sx={{ fontWeight: 700 }}>
        ADMIN
        <Typography
          component="span"
          sx={{ fontWeight: 700, color: 'primary.main' }}
        >
          MOVIE
        </Typography>
        <Typography component="span" sx={{ fontWeight: 400 }}>
          . Designed and Coded by{' '}
        </Typography>
        Khuc Thien Phuc
      </Typography>
    </Box>
  );
});

export default Footer;
