import { createContext, ReactNode, useContext, useState } from 'react';

// import local interface
import { InterfaceCommonContext } from './interface/common.interface';

const CommonContext = createContext<InterfaceCommonContext | null>(null);

const CommonProvider = ({ children }: { children: ReactNode }) => {
  const [moviePath, setMoviePath] = useState<string | null>(null);
  return (
    <CommonContext.Provider value={{ moviePath, setMoviePath }}>
      {children}
    </CommonContext.Provider>
  );
};

const useCommonContext = () => useContext(CommonContext);

export { useCommonContext, CommonProvider };
