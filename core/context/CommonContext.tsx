import { createContext, ReactNode, useContext, useState } from 'react';
import { InterfaceUserInfo } from '../interface/models/user';

// import local interface
import { InterfaceCommonContext } from './interface/common.interface';

const CommonContext = createContext<InterfaceCommonContext | null>(null);

const CommonProvider = ({ children }: { children: ReactNode }) => {
  const [moviePath, setMoviePath] = useState<string | null>(null);
  const [user, setUser] = useState<InterfaceUserInfo | undefined>(undefined);
  return (
    <CommonContext.Provider value={{ moviePath, setMoviePath, user, setUser }}>
      {children}
    </CommonContext.Provider>
  );
};

const useCommonContext = () => useContext(CommonContext);

export { useCommonContext, CommonProvider };
