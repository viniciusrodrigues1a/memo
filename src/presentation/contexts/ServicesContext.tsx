import React, { createContext, useMemo } from "react";
import { AsyncStorageRepositoryFactoryImpl } from "../factories/repositories";
import { AsyncStorageServiceFactoryImpl } from "../factories/services";
import {
  CreateBoardService,
  CreateStoryService,
  ListBoardService,
  RemoveStoryService,
  ShowBoardService,
  UpdateStoryService,
} from "../services";

type ServicesContextData = {
  listBoardService: ListBoardService;
  createBoardService: CreateBoardService;
  showBoardService: ShowBoardService;
  createStoryService: CreateStoryService;
  updateStoryService: UpdateStoryService;
  removeStoryService: RemoveStoryService;
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
      showBoardService: serviceFactoryImpl.makeShowBoardService(),
      createStoryService: serviceFactoryImpl.makeCreateStoryService(),
      updateStoryService: serviceFactoryImpl.makeUpdateStoryService(),
      removeStoryService: serviceFactoryImpl.makeRemoveStoryService(),
    };
  }, []);

  return (
    <ServicesContext.Provider value={servicesContextData}>
      {children}
    </ServicesContext.Provider>
  );
};
