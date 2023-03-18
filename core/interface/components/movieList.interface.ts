import { MutableRefObject, Dispatch, SetStateAction, ReactNode } from 'react';
import { InterfaceBaseProps } from './index.interface';
import { Moment } from 'moment';
import { InterfaceMovie } from '../models/movie';

// Movie List
export interface InterfaceSearchBar extends InterfaceBaseProps {
  tenPhimRef: MutableRefObject<HTMLInputElement | null>;
  fromDateRef: MutableRefObject<Moment | null>;
  toDateRef: MutableRefObject<Moment | null>;
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
