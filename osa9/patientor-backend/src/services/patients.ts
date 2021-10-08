import patientArray from "../../data/patients";
import { Patient, PublicPatient, PatientIDOmitted, Entry } from "../types";
import {v1 as uuid} from 'uuid';

const getPatients = () : Patient[] => {
  return patientArray;
};

const getPatientsSafe = () : PublicPatient[] => {
  return patientArray
    .map(patient => ({
      id: patient.id,
      name: patient.name,
      dateOfBirth: patient.dateOfBirth,
      gender: patient.gender,
      occupation: patient.occupation,
    }));
};

const addNewPatient = ( newData : PatientIDOmitted ) : Patient => {
  const newPatient = { ...newData, id: uuid()};
  patientArray.push(newPatient);
  return newPatient;
};

const getPatientByID = ( id : string ) : Patient | null => {
  const patient = patientArray.find(patient => patient.id === id);
  if (!patient) {
    return null;
  }
  return patient;
};

const addNewEntry = ( newData : Entry, patient : Patient ) : Patient => {
  // replace the id...
  const entry = { ...newData, id: uuid()};
  patient.entries.push(entry);
  return patient;
};

export default {
  getPatients,
  getPatientsSafe,
  addNewPatient,
  getPatientByID,
  addNewEntry
};