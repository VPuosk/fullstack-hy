export interface DiagnoseObject {
  code: string;
  name: string;
  latin?: string;
}

export interface PatientObject {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export type PatientSSNOmitted = Omit<PatientObject, "ssn">;
export type PatientIDOmitted = Omit<PatientObject, "id">;