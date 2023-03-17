import {
  Dispatch,
  MutableRefObject,
  ReactElement,
  SetStateAction,
  ReactNode,
} from 'react';

// import types and interfaces
import { Moment } from 'moment';
import { InterfaceMovie } from '../models/movie';
import { Order } from '../common/index.interface';
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

// Movie List
export interface InterfaceSearchBar extends InterfaceBaseProps {
  tenPhimRef: MutableRefObject<HTMLInputElement | null>;
  fromDateRef: MutableRefObject<Moment | null>;
  toDateRef: MutableRefObject<Moment | null>;
}

export interface HeadCell {
  id: keyof InterfaceMovie;
  label: string;
  cellAlign: 'center' | 'left' | 'right' | 'inherit' | 'justify';
}

export interface InterfaceEnhancedTableHead extends InterfaceBaseProps {
  order: Order;
  orderBy: string;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof InterfaceMovie
  ) => void;
  headCells: readonly HeadCell[];
}

export interface InterfaceMovieTableComponents extends InterfaceSearchBar {
  setMovieFormOpen: Dispatch<SetStateAction<boolean>>;
  movieDetailRef: MutableRefObject<InterfaceMovie>;
}

export interface InterfaceMovieFormComponents extends InterfaceBaseProps {
  movieFormOpen: boolean;
  setMovieFormOpen: Dispatch<SetStateAction<boolean>>;
  movieDetail?: InterfaceMovie;
}

export interface InterfaceConfirmModalComponents extends InterfaceBaseProps {
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  confirmContent: ReactNode;
}
