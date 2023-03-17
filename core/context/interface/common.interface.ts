import { Dispatch, SetStateAction } from 'react';
import { InterfaceUser } from 'core/interface/models/user';

export interface InterfaceCommonContext {
  moviePath: string | null;
  setMoviePath: Dispatch<SetStateAction<string | null>>;
  user: InterfaceUser | undefined;
  setUser: Dispatch<SetStateAction<InterfaceUser | undefined>>;
}
