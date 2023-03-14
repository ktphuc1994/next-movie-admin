import {
  Dispatch,
  MutableRefObject,
  ReactElement,
  SetStateAction,
} from 'react';

// import types and interfaces
import { Moment } from 'moment';
import { InterfaceMovie } from '../models/movie';
import { Order } from '../common/index.interface';

export interface InterfaceBaseProps {
  className?: string;
  children?: ReactElement;
}

// Spinner
export interface InterfaceInnerSpinner extends InterfaceBaseProps {
  size?: string;
  thickness?: number;
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
}

export interface InterfaceMovieTableComponents extends InterfaceSearchBar {
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
}

export interface InterfaceMovieFormComponents extends InterfaceBaseProps {
  dialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  movieDetail?: InterfaceMovie;
}
