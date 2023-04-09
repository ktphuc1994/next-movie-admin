import { Dispatch, ReactElement, SetStateAction } from 'react';

// import types and interfaces
import { CircularProgressProps } from '@mui/material/CircularProgress';

export interface InterfaceBaseProps {
  className?: string;
  children?: ReactElement;
}

// Spinner
export interface InterfaceInnerSpinner extends CircularProgressProps {
  disableAbsolute?: boolean;
  bgColor?: string;
}

// Login
export interface InterfaceLoginPageComponent extends InterfaceBaseProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
}

// Layout
export interface InterfaceSidebar extends InterfaceBaseProps {
  sideOpen: boolean;
  setSideOpen: Dispatch<SetStateAction<boolean>>;
}

export interface InterfaceHeader extends InterfaceSidebar {}

// utils
export interface InterfaceDropUpload extends InterfaceBaseProps {
  file: File | undefined;
  setFile: Dispatch<SetStateAction<File | undefined>>;
  fileURL: string | undefined;
  setFileURL: Dispatch<SetStateAction<string | undefined>>;
}
export interface InterfaceUploadZone extends InterfaceBaseProps {
  setImageURL: Dispatch<SetStateAction<string | null | undefined>>;
  setImageFile: Dispatch<SetStateAction<File | undefined>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
