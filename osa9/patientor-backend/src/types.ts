export interface DiagnoseObject {
  code: string;
  name: string;
  latin?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export type Entry = HealthCheckEntry | HospitalEntry | OccupationalHealthCareEntry;

export type EntryType = "Hospital" | "HealthCheck" | "OccupationalHealthcare";

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}


///
export interface HospitalDischarge {
  date: string;
  criteria: string;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<DiagnoseObject['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthCareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave;
}

interface HospitalEntry  extends BaseEntry {
  type: "Hospital";
  discharge: HospitalDischarge;
}

///

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export type PatientSSNOmitted = Omit<Patient, "ssn">;
export type PatientIDOmitted = Omit<Patient, "id">;
export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;