import { DiagnoseObject, Entry, HospitalDischarge, PatientIDOmitted } from "./types";
import { Gender, HealthCheckRating, SickLeave } from "./types";

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCode = ( data : any): data is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(data);
};

const parseHealthCode = ( data : unknown) : HealthCheckRating => {
  if (!data || !isHealthCode(data)) {
    throw new Error("Invalid or missing data for Health Check Rating");
  }
  return data;
};

const parseDiagnosisCodes = ( data : unknown ) : Array<DiagnoseObject['code']> => {
  const diagnoseCodes : Array<DiagnoseObject['code']> = [];
  if (!data || !(data instanceof Array)) {
    return diagnoseCodes;    
  }
  data.map(diagnose => diagnoseCodes.push(parseString('diagnose code', diagnose)));
  return diagnoseCodes;
};

type HospitalEntryFields = { date: unknown, criteria: unknown };

const parseHospital = ({date, criteria} : HospitalEntryFields) : HospitalDischarge => {
  return {
    date: parseDate(date),
    criteria: parseString('discharge criteria', criteria)
  };
};

const parseHospitalEntry = ( data: unknown ) : HospitalDischarge => {
  if (!data) {
    throw new Error("missing hospital discharge information");
  }

  if (data instanceof Object && ('date' in data) && ('criteria' in data)) {
    return parseHospital(data);
  } else {
    throw new Error("error in hospital discharge fields");
  }
};

type SickLeaveFields = { startDate: unknown, endDate: unknown };

const parseSickLeave = ({ startDate, endDate} : SickLeaveFields) : SickLeave => {
  return {
    startDate: parseDate(startDate),
    endDate: parseDate(endDate)
  };
};

const maybeParseSickLeave = ( data: unknown) : SickLeave | undefined => {
  if (!data) {
    return undefined;
  }

  if ((data instanceof Object) && ('startDate' in data) && ('endDate' in data)) {
    return parseSickLeave(data);
  }
  return undefined;
};

type PatientInputFields = { name: unknown, ssn: unknown, dateOfBirth: unknown, occupation: unknown, gender: unknown };

export const verifyNewPatient = ({name, ssn, dateOfBirth, occupation, gender} : PatientInputFields) : PatientIDOmitted => {
  
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

type EntryInputFields = {
  type: unknown,
  id: unknown,
  description: unknown,
  date: unknown,
  specialist: unknown,
  diagnosisCodes: unknown,
  healthCheckRating: unknown,
  employerName: unknown,
  sickLeave: unknown,
  discharge: unknown,
};

export const verifyNewEntry = ( {
  type,
  id,
  description,
  date,
  specialist,
  diagnosisCodes,
  healthCheckRating,
  employerName,
  sickLeave,
  discharge,
} : EntryInputFields ) : Entry => {
  console.log(type);
  const entryType = parseString('type', type);
  const baseEntries = {
    id: parseString('id', id),
    description: parseString('description', description),
    date: parseDate(date),
    specialist: parseString('specialis', specialist),
    diagnosisCodes: parseDiagnosisCodes(diagnosisCodes)
  };

  console.log(entryType);

  switch (entryType) {
    case "Hospital":
      return {
        ...baseEntries,
        type: entryType,
        discharge: parseHospitalEntry(discharge)
      };
      case "OccupationalHealthcare":
      return {
        ...baseEntries,
        type: entryType,
        employerName: parseString('employer', employerName),
        sickLeave: maybeParseSickLeave(sickLeave),
      };
      case "HealthCheck":
      return {
        ...baseEntries,
        type: entryType,
        healthCheckRating: parseHealthCode(healthCheckRating)
      };
    default:
      throw new Error("Undefined entry");
      break;
  }
};

//export default verifyNewEntry;