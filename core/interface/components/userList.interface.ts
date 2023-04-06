import { Dispatch, SetStateAction } from 'react';

// import types and interfaces
import { InterfaceBaseProps } from './index.interface';
import { InterfaceUser } from '../models/user';

export interface InterfaceUserFilterComponent extends InterfaceBaseProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setFilterInfo: Dispatch<SetStateAction<Record<keyof InterfaceUser, string>>>;
}

export interface InterfaceUserListTableComponents extends InterfaceBaseProps {
  userList: InterfaceUser[] | undefined;
}

export interface InterfaceUserFilterContentComponents
  extends Pick<InterfaceUserFilterComponent, 'setFilterInfo'> {
  setOpen?: Dispatch<SetStateAction<boolean>>;
}
