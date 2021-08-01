import React, { createContext, useMemo } from "react";
import { AsyncStorageRepositoryFactoryImpl } from "../factories/repositories";
import { AsyncStorageServiceFactoryImpl } from "../factories/services";
import { CreateBoardService, ListBoardService } from "../services";

type ServicesContextData = {
  listBoardService: ListBoardService;
  createBoardService: CreateBoardService;
};

type ServicesProviderProps = {
  children: React.ReactElement;
};

export const ServicesContext = createContext({} as ServicesContextData);

export const ServicesProvider = ({
  children,
}: ServicesProviderProps): React.ReactElement => {
  const servicesContextData: ServicesContextData = useMemo(() => {
    const repositoryFactoryImpl = new AsyncStorageRepositoryFactoryImpl();
    const serviceFactoryImpl = new AsyncStorageServiceFactoryImpl(
      repositoryFactoryImpl
    );

    return {
      listBoardService: serviceFactoryImpl.makeListBoardService(),
      createBoardService: serviceFactoryImpl.makeCreateBoardService(),
    };
  }, []);

  return (
    <ServicesContext.Provider value={servicesContextData}>
      {children}
    </ServicesContext.Provider>
  );
};
