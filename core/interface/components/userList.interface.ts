import { Dispatch, FormEvent, SetStateAction } from 'react';

// import types and interfaces
import { InterfaceBaseProps } from './index.interface';
import {
  InterfaceCreateUser,
  InterfaceUpdateUser,
  InterfaceUser,
} from '../models/user';

export interface InterfaceUserFilterComponent extends InterfaceBaseProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setFilterInfo: Dispatch<SetStateAction<Record<keyof InterfaceUser, string>>>;
}

export interface InterfaceUserListTableComponents extends InterfaceBaseProps {
  userList: InterfaceUser[] | undefined;
  handleClickSetting: (userInfo: InterfaceUser) => void;
}

export interface InterfaceUserFilterContentComponents
  extends Pick<InterfaceUserFilterComponent, 'setFilterInfo'> {
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

export interface InterfaceUserFormContentComponents extends InterfaceBaseProps {
  defaultUser: Partial<InterfaceUser>;
  handleOK: (
    method: 'createUser' | 'updateUser',
    userInfo: InterfaceCreateUser & InterfaceUpdateUser
  ) => Promise<void> | void;
  setButtonLoading: Dispatch<SetStateAction<boolean>>;
}

export interface InterfaceUserFormComponents
  extends Omit<InterfaceUserFormContentComponents, 'setButtonLoading'> {
  open: boolean;
  handleClose: () => void;
  handleDelete: (id: number) => Promise<void> | void;
}
