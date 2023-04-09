import React, { useState } from 'react';

// import types and interfaces
import { InterfaceUploadZone } from 'core/interface/components/index.interface';

// import MUI components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import DropUpload from '../DropUpload';

const UploadZone = ({
  setImageURL,
  setImageFile,
  setOpen,
}: InterfaceUploadZone) => {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [fileURL, setFileURL] = useState<string | undefined>(undefined);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOK = () => {
    if (fileURL && fileURL !== 'https://i.imgur.com/EmPWFJU.png')
      setImageURL(fileURL);
    if (file) setImageFile(file);
    setOpen(false);
  };

  return (
    <Box
      className="upload-zone"
      component="div"
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        className="upload-zone__header"
        component="div"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          flexShrink: 0,
        }}
      >
        <Typography component="p" fontWeight={700}>
          CHỌN HÌNH ẢNH
        </Typography>
        <Box>
          <Button variant="outlined" sx={{ mr: 1 }} onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="contained" onClick={handleOK}>
            OK
          </Button>
        </Box>
      </Box>
      <Divider />
      <Box
        className="upload-zone__body"
        component="div"
        sx={{ height: '80%', p: 2, flexGrow: 1 }}
      >
        <DropUpload
          fileURL={fileURL}
          setFileURL={setFileURL}
          file={file}
          setFile={setFile}
        />
      </Box>
    </Box>
  );
};

export default UploadZone;
