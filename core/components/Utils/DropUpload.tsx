import { ChangeEvent, DragEvent, KeyboardEvent, useRef, useState } from 'react';

// import local libraray
import { toast } from 'react-toastify';

// import types and interfaces
import { InterfaceDropUpload } from 'core/interface/components/index.interface';

// import local constants
import { imageDataType } from 'core/constants/default.const';

// import local utils
import { downloadInSide } from 'core/utilities';

// import MUI Components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DownloadingIcon from '@mui/icons-material/Downloading';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import UploadIcon from '@mui/icons-material/Upload';

const DropUpload = ({
  file,
  setFile,
  fileURL,
  setFileURL,
}: InterfaceDropUpload) => {
  const [isDragging, setIsDragging] = useState(false);
  const urlInputRef = useRef<HTMLInputElement | null>(null);

  const handleLoadImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const url = URL.createObjectURL(e.target.files[0]);
    setFile(e.target.files[0]);
    setFileURL(url);
  };

  const handleImageError = () => {
    setFileURL('https://i.imgur.com/EmPWFJU.png');
  };

  const handleDeleteImage = () => {
    if (fileURL) URL.revokeObjectURL(fileURL);
    setFile(undefined);
    setFileURL(undefined);
  };

  const handleDownloadImage = () => {
    if (!fileURL) return;
    const fileName = file ? file.name : 'movie-poster';
    downloadInSide(fileURL, fileName);
  };

  const handleLoadURL = () => {
    if (!urlInputRef.current) return;
    setFileURL(urlInputRef.current.value);
  };
  const handleInputEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') setFileURL(e.currentTarget.value);
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

      const url = URL.createObjectURL(file);
      setFile(file);
      setFileURL(url);
    }
  };

  if (!fileURL)
    return (
      <Box display="flex" flexDirection="column" height="100%">
        <TextField
          fullWidth
          size="small"
          placeholder="Điền URL tại đây hoặc"
          name="image-url"
          type="text"
          defaultValue=""
          inputRef={urlInputRef}
          sx={{ flexShrink: 0, mb: 1 }}
          inputProps={{ onKeyUp: handleInputEnter }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="tenPhim-reset"
                  onClick={handleLoadURL}
                  edge="end"
                >
                  <UploadIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Box
          sx={{
            width: '100%',
            p: '1.5rem',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexGrow: 1,
            border: '1px solid',
            borderStyle: 'dashed',
            borderRadius: '0.5rem',
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
                style={{
                  marginTop: 0,
                  marginBottom: '0.5rem',
                  fontWeight: 700,
                }}
              >
                Kẻo và thả hình ảnh tại đây hoặc
              </p>
              <Button
                variant="contained"
                component="label"
                size="small"
                startIcon={<UploadFileIcon />}
              >
                Tải hình
                <input
                  id="input-movie-form-image"
                  hidden
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  type="file"
                  onChange={handleLoadImage}
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
      </Box>
    );

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <Box sx={{ height: '100%' }}>
        <img
          src={fileURL}
          onError={handleImageError}
          alt="uploaded-image"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            flexGrow: 1,
          }}
        />
      </Box>

      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
        }}
      >
        <Tooltip title="Delete" placement="top">
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
