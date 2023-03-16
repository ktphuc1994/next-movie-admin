export type Order = 'asc' | 'desc';

export interface AxiosErrorData {
  statusCode?: number;
  message: string | string[];
  error: string;
}
