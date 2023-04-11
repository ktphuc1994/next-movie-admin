import { Dispatch, SetStateAction, MutableRefObject, ReactNode } from 'react';

// import types and interfaces
import { CircularProgressProps } from '@mui/material/CircularProgress';
import { Theme, SxProps } from '@mui/material/styles';

export interface InterfaceBaseProps {
  className?: string;
  children?: ReactNode;
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
  handleOK: (file: File | undefined, fileURL: string | undefined) => void;
  handleCancel: () => void;
}

export interface InterfaceValidateMatKhau extends InterfaceBaseProps {
  required?: boolean;
  validRegEx?: RegExp | false;
  errMess?: string;
  fieldRef?: MutableRefObject<HTMLInputElement | null>;
}

export interface InterfaceCustomCollapse extends InterfaceBaseProps {
  titleClassName?: string;
  titleSx?: SxProps<Theme>;
  title?: React.ReactNode;
}
