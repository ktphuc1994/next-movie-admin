import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { InterfaceInnerSpinner } from '../../interface/components/index.interface';

const InnerSpinner = ({
  size = '2rem',
  thickness = 3,
}: InterfaceInnerSpinner) => {
  return (
    <Box
      component="div"
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress size={size} thickness={thickness} />
    </Box>
  );
};

export default InnerSpinner;
