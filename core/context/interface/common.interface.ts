import { Dispatch, SetStateAction } from 'react';

export interface InterfaceCommonContext {
  moviePath: string | null;
  setMoviePath: Dispatch<SetStateAction<string | null>>;
}
