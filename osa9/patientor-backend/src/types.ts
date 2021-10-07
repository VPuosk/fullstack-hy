export interface DiagnoseObject {
  code: string;
  name: string;
  latin?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export type PatientSSNOmitted = Omit<Patient, "ssn">;
export type PatientIDOmitted = Omit<Patient, "id">;
export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;