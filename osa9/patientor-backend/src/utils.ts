import { PatientIDOmitted } from "./types";
import { Gender } from "./types";

const isString = (data: unknown): data is string => {
  return typeof data === 'string' || data instanceof String;
};

const parseString = (type : string, data : unknown) : string => {
  if (!data || !isString(data)) {
    throw new Error(`Invalid of missing data for ${type}`);
  }
  return data;
};

const isDate = (date: string) : boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown) : string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Invalid of missing data for date");
  }
  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = ( data: any): data is Gender => {
  return Object.values(Gender).includes(data);
};

const parseGender = ( data: unknown) : Gender => {
  if (!data || !isGender(data)) {
    throw new Error("Invalid of missing data for Gender");
  }
  return data;
};

type InputFields = { name: unknown, ssn: unknown, dateOfBirth: unknown, occupation: unknown, gender: unknown };

const verifyNewEntry = ({name, ssn, dateOfBirth, occupation, gender} : InputFields) : PatientIDOmitted => {
  
  const newPatient = {
    name: parseString('name', name),
    ssn: parseString('ssn', ssn),
    dateOfBirth: parseDate(dateOfBirth),
    occupation: parseString('occupation', occupation),
    gender: parseGender(gender),
    entries: [],
  };

  return newPatient;
};

export default verifyNewEntry;