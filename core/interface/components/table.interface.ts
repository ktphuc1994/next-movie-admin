import { Order } from '../common/index.interface';
import { InterfaceBaseProps } from './index.interface';

export interface HeadCell<T> {
  id: keyof T;
  label: string;
  cellAlign: 'center' | 'left' | 'right' | 'inherit' | 'justify';
}

export interface InterfaceEnhancedTableHead<T> extends InterfaceBaseProps {
  headCells: readonly HeadCell<T>[];
  order: Order;
  orderBy: string;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void;
}
