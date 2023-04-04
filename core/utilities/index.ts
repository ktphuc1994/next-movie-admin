import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { AxiosErrorData, Order } from '../interface/common/index.interface';

const collator = new Intl.Collator('en', { numeric: true });

type TypeEquals<X, Y> = (<T>() => T extends X ? 1 : 2) extends <
  T
>() => T extends Y ? 1 : 2
  ? true
  : false;

type IncludeMatchingProperties<T, V> = Pick<
  T,
  { [K in keyof T]-?: T[K] extends V ? K : never }[keyof T]
>;

const descendingComparator = <T>(a: T, b: T, orderBy: keyof T) => {
  const aIn = a[orderBy];
  const bIn = b[orderBy];
  if (typeof aIn === 'string' && typeof bIn === 'string') {
    return -collator.compare(aIn, bIn);
  }
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = <Key extends keyof any>(
  order: Order,
  orderBy: Key
): ((
  a: { [key in Key]?: number | string | boolean | null },
  b: { [key in Key]?: number | string | boolean | null }
) => number) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const axiosErrorHandling = (err: unknown | any) => {
  if (err instanceof AxiosError<AxiosErrorData>) {
    if (err.response) {
      const message = err.response.data.message;
      Array.isArray(message)
        ? message.forEach((mess) => {
            setTimeout(() => {
              toast.error(mess);
            }, 500);
          })
        : toast.error(message);
      return;
    }
    toast.error(err.message);
    return;
  }
  toast.error('Unknown Error. Please try again later.');
  console.log(err);
};

export { collator, getComparator, axiosErrorHandling };
export type { TypeEquals, IncludeMatchingProperties };
