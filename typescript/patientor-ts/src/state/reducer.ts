import { State } from "./state";
import { Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "VISITED_PATIENT";
      payload: Patient;
    };

export const reducer = (state: State, action: Action): State => {
  console.log("hellooosad");
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "VISITED_PATIENT":
      return {
        ...state,
        visitedPatients: {
          ...state.visitedPatients,
          [action.payload.id]: action.payload,
        },
      };
    default:
      return state;
  }
};

export const setPatientList = (data: Patient[]): Action => {
  return { type: "SET_PATIENT_LIST", payload: data };
};
export const addPatient = (data: Patient): Action => {
  return { type: "ADD_PATIENT", payload: data };
};

export const visitPatient = (data: Patient): Action => {
  return { type: "VISITED_PATIENT", payload: data };
};
