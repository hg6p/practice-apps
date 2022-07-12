import { Entry, HealthCheckRating, sickLeave } from "./../types";
import { NewPatientsEntry } from "../types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name");
  }

  return name;
};
const parseDiagnosisCodes = (codes: unknown): string[] => {
  if (codes === undefined) return [] as string[];

  if (Array.isArray(codes) === false) {
    throw new Error("Diagnosis codes should be either undefined or an array");
  }

  if (!(codes as string[]).every((code) => isString(code))) {
    throw new Error("All codes must be strings");
  }

  return codes as string[];
};
const parseId = (id: unknown): string => {
  if (!isString(id)) throw new Error("Incorrect or missing id");

  return id;
};
const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error("Incorrect or missing description");
  }

  return description;
};

const parseCriteria = (criteria: unknown): string => {
  console.log(criteria);
  if (!criteria || !isString(criteria)) {
    throw new Error("Incorrect or missing criteria");
  }

  return criteria;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date)) {
    throw new Error("Incorrect or missing date");
  }

  return date;
};
const isHealthCheckRating = (param: unknown): HealthCheckRating => {
  if (typeof param !== "number") throw new Error("invalid");
  return param;
};

const parseDischarge = (
  discharge: unknown
): { date: string; criteria: string } => {
  if (!(typeof discharge === "object" && discharge !== null)) {
    throw new Error("Incorrect or missing discharge");
  }

  if (!("date" in discharge && "criteria" in discharge)) {
    throw new Error("Discharge object doesn't include the required fields");
  }

  const dischargeObject = discharge as { date: unknown; criteria: unknown };

  return {
    criteria: parseCriteria(dischargeObject.criteria),
    date: parseDate(dischargeObject.date),
  };
};
const parseSickLeave = (sickLeave: unknown): sickLeave | undefined => {
  console.log(sickLeave);
  if (!sickLeave) return undefined;
  if (!(typeof sickLeave === "object" && sickLeave !== null)) {
    throw new Error("Incorrect or missing sick leave property");
  }
  if (!("startDate" in sickLeave && "endDate" in sickLeave)) {
    throw new Error("sick leave object doesn't include the required fields");
  }

  const sickLeaveObject = sickLeave as { startDate: unknown; endDate: unknown };

  return {
    startDate: parseName(sickLeaveObject.startDate),
    endDate: parseName(sickLeaveObject.endDate),
  };
};
type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
  entries: unknown;
};
export type Entries = {
  id?: unknown;
  description: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes: unknown;
  type: unknown;
  employerName?: unknown;
  sickLeave?: unknown;
  discharge?: unknown;
  healthCheckRating?: unknown;
};

const checkEntry = (entry: Entries): Entry => {
  const commonProperties = {
    id: parseId(entry.id),
    description: parseDescription(entry.description),
    date: parseName(entry.date),
    specialist: parseName(entry.specialist),
    diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes),
    type: parseName(entry.type),
  };
  console.log(entry.type);
  switch (entry.type) {
    case "Hospital":
      return {
        ...commonProperties,
        discharge: parseDischarge(entry?.discharge),
      };
    case "OccupationalHealthcare":
      console.log("okupacija,", entry?.sickLeave);
      return {
        ...commonProperties,
        employerName: parseName(entry?.employerName),
        sickLeave: parseSickLeave(entry?.sickLeave),
      };
    case "HealthCheck":
      return {
        ...commonProperties,
        healthCheckRating: isHealthCheckRating(entry.healthCheckRating),
      };
    default:
      throw new Error("Invalid entries");
  }
};
const parseEntry = (entries: unknown): Entry[] => {
  if (!entries || (!Array.isArray(entries) && !(entries instanceof Array)))
    throw new Error("invalid entries");
  if (entries instanceof Array)
    return entries.map((entry: Entries) => checkEntry(entry));
  else throw new Error("error");
};
const toNewPatientEntry = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
  entries,
}: Fields): NewPatientsEntry => {
  console.log(name, entries);
  const newEntry: NewPatientsEntry = {
    name: parseName(name),
    dateOfBirth: parseName(dateOfBirth),
    ssn: parseName(ssn),
    gender: parseName(gender),
    occupation: parseName(occupation),
    entries: parseEntry(entries),
  };

  return newEntry;
};
export const toPatientEntry = (entry: Entry): Entry => {
  console.log("toPatientEntry", entry);

  return checkEntry(entry as Entries);
};

export default toNewPatientEntry;
