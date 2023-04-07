import { ChangeEvent, DragEvent, useEffect, useState } from 'react';

// import local libraray
import { toast } from 'react-toastify';

// import types and interfaces
import { InterfaceDropUpload } from 'core/interface/components/index.interface';

// import local constants
import { imageDataType } from 'core/constants/default.const';

// import local utils
import { downloadImageOutSide, downloadInSide } from 'core/utilities';

// import MUI Components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DownloadingIcon from '@mui/icons-material/Downloading';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const DropUpload = ({ defaultURL }: InterfaceDropUpload) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null | undefined>(undefined);
  const fileURL = file
    ? URL.createObjectURL(file)
    : file === null
    ? undefined
    : defaultURL
    ? defaultURL
    : undefined;

  useEffect(() => {
    return () => {
      if (fileURL) URL.revokeObjectURL(fileURL);
    };
  }, [fileURL]);

  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFile(e.target.files[0]);
  };

  const handleDeleteImage = () => {
    if (fileURL) URL.revokeObjectURL(fileURL);
    setFile(null);
  };

  const handleDownloadImage = () => {
    if (!fileURL) return;
    if (fileURL === defaultURL) {
      downloadInSide(fileURL, 'download');
      return;
    }
    if (!file) return;
    downloadInSide(fileURL, file.name);
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
      return;
    }
    if (e.type === 'dragleave') setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      if (e.dataTransfer.files.length > 1) {
        toast.error('Chỉ có thể upload 1 file');
        return;
      }

      const file = e.dataTransfer.files[0];
      if (!imageDataType.includes(file.type)) {
        toast.error(
          'Chỉ có thể upload file hình ảnh, định dạng JPG, JPEG, PNG, WEBP'
        );
        return;
      }

      setFile(file);
    }
  };

  if (!fileURL)
    return (
      <Box
        sx={{
          position: 'relative',
          border: '1px solid',
          borderStyle: 'dashed',
          borderRadius: '0.5rem',
          py: '1rem',
          ...(isDragging ? { backgroundColor: 'whitesmoke' } : null),
        }}
        component="div"
        onDragEnter={handleDrag}
      >
        <label htmlFor="input-movie-form-image">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <p
              style={{ marginTop: 0, marginBottom: '0.5rem', fontWeight: 700 }}
            >
              Drag and drop your file here or
            </p>
            <Button
              variant="contained"
              component="label"
              size="small"
              startIcon={<UploadFileIcon />}
            >
              Upload Image
              <input
                id="input-movie-form-image"
                hidden
                accept="image/png, image/jpeg, image/jpg, image/webp"
                type="file"
                onChange={handleUploadImage}
              />
            </Button>
          </Box>
        </label>
        {isDragging ? (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderRadius: '0.5rem',
            }}
            component="div"
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
          />
        ) : null}
      </Box>
    );

  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
      <img
        src={fileURL}
        alt="uploaded-image"
        style={{ width: '200px', height: '200px', objectFit: 'contain' }}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={handleDeleteImage}>
            <HighlightOffIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Download">
          <IconButton color="primary" onClick={handleDownloadImage}>
            <DownloadingIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default DropUpload;
