import { Dispatch, SetStateAction, MutableRefObject } from 'react';

// import local types and interfaces
import { InterfaceFlattenSchedule } from '../models/schedule';
import { InterfaceBaseProps } from './index.interface';

export interface InterfaceScheduleTableComponent extends InterfaceBaseProps {
  lichChieuList: InterfaceFlattenSchedule[] | null;
  selectedScheduleRef: MutableRefObject<InterfaceFlattenSchedule>;
  setFormOpen: Dispatch<SetStateAction<boolean>>;
}

export interface InterfaceFormScheduleComponent extends InterfaceBaseProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  selectedSchedule: InterfaceFlattenSchedule;
}

export interface InterfaceFormContentComponent
  extends Omit<InterfaceFormScheduleComponent, 'open'> {
  setLoading: Dispatch<SetStateAction<boolean>>;
}
