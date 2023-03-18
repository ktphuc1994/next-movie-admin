import { InterfaceFlattenSchedule } from '../models/schedule';
import { InterfaceBaseProps } from './index.interface';

export interface InterfaceScheduleTableComponent extends InterfaceBaseProps {
  lichChieuList: InterfaceFlattenSchedule[] | null;
}
