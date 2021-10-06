import patientArray from "../../data/patients";
import { PatientObject, PatientSSNOmitted } from "../types";

const getPatients = () : PatientObject[] => {
  return patientArray;
};

const getPatientsSafe = () : PatientSSNOmitted[] => {
  return patientArray
    .map(patient => ({
      id: patient.id,
      name: patient.name,
      dateOfBirth: patient.dateOfBirth,
      gender: patient.gender,
      occupation: patient.occupation,
    }));
};


export default {
  getPatients,
  getPatientsSafe
};