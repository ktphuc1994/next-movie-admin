import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export const ScreenSpinner = ({ bg = 'transparent' }: { bg?: string }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        backgroundColor: bg,
      }}
    >
      <CircularProgress size="4rem" thickness={5} />
    </Box>
  );
};
