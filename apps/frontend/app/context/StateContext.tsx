"use client"

import React, { useState, createContext, useEffect, useContext } from "react";
import { CeremonyDocumentReferenceAndData, CeremonyState, CeremonyTimeoutType, CeremonyType, CircuitContributionVerificationMechanism, CircuitDocumentReferenceAndData, Project, State, StateProviderProps, WaitingQueue } from "../helpers/interfaces";
import { getAllCollectionDocs, getCeremonyCircuitsWaitingQueue } from "../helpers/firebase";
import { DocumentData } from 'firebase/firestore'
import { commonTerms } from "../helpers/constants";

export const StateContext = createContext<State>({
  projects: [],
  setProjects: () => null,
  circuit: {} as CircuitDocumentReferenceAndData,
  setCircuit: () => null,
  search: "",
  setSearch: () => null,
  loading: false,
  setLoading: () => null,
  runTutorial: false,
  setRunTutorial: () => null,
  setUser: () => {},
  waitingQueue: [{} as WaitingQueue],
  isOpenLoginModal: false,
  setIsOpenLoginModal: () => null,
  attestationLink: "",
  setAttestationLink: () => null,
});

export const useInitialStateContext = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [circuit, setCircuit] = useState<CircuitDocumentReferenceAndData>();
  const [waitingQueue, setWaitingQueue] = useState<WaitingQueue[]>([])
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [runTutorial, setRunTutorial] = useState<boolean>(false);
  
  

  return { waitingQueue, projects, setProjects, circuit, setCircuit, search, setSearch, loading, setLoading, runTutorial, setRunTutorial };
};

export const StateProvider: React.FC<StateProviderProps> = ({ children }) => {
  const [isOpenLoginModal, setIsOpenLoginModal] = useState<boolean>(false);
  const [user, setUser] = useState<string | undefined>(
    localStorage.getItem("username") || undefined
  );

  useEffect(() => {
    const _user = localStorage.getItem("username")?.toString() || "";
    if (_user !== user) {
      setUser(_user);
    }
  }, [user]);


  const state = useInitialStateContext()

  return (
    // @ts-ignore
    <StateContext.Provider value={{...state, user, setUser, isOpenLoginModal, setIsOpenLoginModal }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);