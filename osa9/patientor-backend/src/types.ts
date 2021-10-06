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
  gender: string;
  occupation: string;
}

export type PatientSSNOmitted = Omit<PatientObject, "ssn">;