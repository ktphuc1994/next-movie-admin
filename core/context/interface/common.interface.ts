import { Dispatch, SetStateAction } from 'react';
import { InterfaceUserInfo } from 'core/interface/models/user';

export interface InterfaceCommonContext {
  moviePath: string | null;
  setMoviePath: Dispatch<SetStateAction<string | null>>;
  user: InterfaceUserInfo | undefined;
  setUser: Dispatch<SetStateAction<InterfaceUserInfo | undefined>>;
}
