import React, { createContext, useContext, useReducer } from "react";
import { Diagnosis, Patient } from "../types";

import { Action } from "./reducer";

export type State = {
  patients: { [id: string]: Patient };
  visitedPatients: { [id: string]: Patient };
  diagnosis: Diagnosis["code"][];
};

const initialState: State = {
  patients: {},
  visitedPatients: {},
  diagnosis: [],
};

const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState,
]);
console.log(StateContext);
type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider = ({ reducer, children }: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);
