import { State } from "./state";
import { Diagnosis, Patient, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "UPDATE_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSE_LIST";
      payload: Diagnosis[];
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "SET_DIAGNOSE_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
            {}
          ),
          ...state.diagnoses
        }
      };
    case "UPDATE_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    default:
      return state;
  }
};

export const setPatientList = ( data : Patient[] ) : Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: data,
  };
};

export const updatePatient = ( data : Patient ) : Action => {
  return {
    type: "UPDATE_PATIENT",
    payload: data,
  };
};

export const addPatient = ( data : Patient ) : Action => {
  return {
    type: "ADD_PATIENT",
    payload: data,
  };
};

export const setDiagnoseList = ( data : Diagnosis[] ) : Action => {
  return {
    type: "SET_DIAGNOSE_LIST",
    payload: data,
  };
};

export const addEntry = ( data : Entry, patient: Patient ) : Action => {
  patient.entries?.push(data);
  return {
    type: "UPDATE_PATIENT",
    payload: patient,
  };
};