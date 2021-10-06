import patientArray from "../../data/patients";
import { PatientObject, PatientSSNOmitted, PatientIDOmitted } from "../types";
import {v1 as uuid} from 'uuid';

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

const addNewPatient = ( newData : PatientIDOmitted ) : PatientObject => {
  const newPatient = { ...newData, id: uuid()};
  patientArray.push(newPatient);
  return newPatient;
};


export default {
  getPatients,
  getPatientsSafe,
  addNewPatient
};