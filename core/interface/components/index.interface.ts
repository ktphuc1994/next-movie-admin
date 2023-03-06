import { Dispatch, ReactElement, SetStateAction } from 'react';

export interface InterfaceBaseProps {
  className?: string;
  children?: ReactElement;
}

export interface InterfaceInnerSpinner extends InterfaceBaseProps {
  size?: string;
  thickness?: number;
}

export interface InterfaceLoginPageComponent extends InterfaceBaseProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
}
