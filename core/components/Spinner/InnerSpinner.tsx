import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { InterfaceInnerSpinner } from '../../interface/components/index.interface';

const absoluteSetting = {
  position: 'absolute',
  top: 0,
  left: 0,
};

const InnerSpinner = ({
  disableAbsolute = true,
  bgColor = 'transparent',
  size = '2rem',
  thickness = 3,
  ...props
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
        backgroundColor: bgColor,
        zIndex: 2,
        ...(!disableAbsolute && absoluteSetting),
      }}
    >
      <CircularProgress size={size} thickness={thickness} {...props} />
    </Box>
  );
};

export default InnerSpinner;
