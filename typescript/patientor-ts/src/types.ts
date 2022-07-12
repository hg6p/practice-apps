export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}
export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[];
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
  type: string;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}
export interface HealthCheckEntry extends BaseEntry {
  healthCheckRating: HealthCheckRating;
}
export interface HospitalEntry extends BaseEntry {
  discharge: {
    date: string;
    criteria: string;
  };
}
export interface OccupationalHealthcareEntry extends BaseEntry {
  employerName?: string;
  sickLeave?: sickLeave;
}
export type sickLeave = {
  startDate: string;
  endDate: string;
};
