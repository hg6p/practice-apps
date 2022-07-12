interface Diagnoses {
  code: string;
  name: string;
  latin?: string;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export enum Gender {
  "Male" = "Male",
  "Female" = "Female",
}
export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

interface Patients {
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
  diagnosisCodes?: Array<Diagnoses["code"]>;
  type: string;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}
interface HealthCheckEntry extends BaseEntry {
  healthCheckRating?: HealthCheckRating;
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
type NonSensitivePatientsEntry = Omit<Patients, "ssn">;

type NewPatientsEntry = Omit<Patients, "id">;

export type PublicPatient = Omit<Patients, "ssn" | "entries">;
export { Diagnoses, Patients, NonSensitivePatientsEntry, NewPatientsEntry };
