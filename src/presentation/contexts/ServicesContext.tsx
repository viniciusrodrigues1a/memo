import React, { createContext, useMemo } from "react";
import { AsyncStorageServiceFactoryImpl } from "../factories/services";
import { ListBoardService } from "../services";

type ServicesContextData = {
  listBoardService: ListBoardService;
};

type ServicesProviderProps = {
  children: React.ReactElement;
};

export const ServicesContext = createContext({} as ServicesContextData);

export const ServicesProvider = ({
  children,
}: ServicesProviderProps): React.ReactElement => {
  const servicesContextData: ServicesContextData = useMemo(() => {
    const factoryImpl = new AsyncStorageServiceFactoryImpl();

    return {
      listBoardService: factoryImpl.makeListBoardService(),
    };
  }, []);

  return (
    <ServicesContext.Provider value={servicesContextData}>
      {children}
    </ServicesContext.Provider>
  );
};
