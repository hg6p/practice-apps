import { Entry } from "./../types";
import { patientEntries } from "../data/patients";
import {
  NewPatientsEntry,
  NonSensitivePatientsEntry,
  Patients,
} from "../types";
import { toPatientEntry } from "../utils/utilites";

const getPatients = (): Array<Patients> => {
  return patientEntries;
};

const getPatientsWithout = (): NonSensitivePatientsEntry[] => {
  return patientEntries.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const addPatient = (entry: NewPatientsEntry): Patients => {
  const newPatientEntry = {
    id: String(patientEntries.length + 1),
    ...entry,
  };

  patientEntries.push(newPatientEntry);
  return newPatientEntry;
};

const addPatientEntries = (entry: Entry, patientID: string): Entry => {
  const newPatientEntry = {
    ...entry,
    id: String(Math.floor(Math.random() * 1000 + 1)),
  };
  console.log("addPateintEntries", newPatientEntry);
  const newEntry = toPatientEntry(newPatientEntry);

  const patient = patientEntries.find((patient) => patient.id === patientID);
  patient?.entries.push(newEntry);
  return newEntry;
};
const getPatientById = (id: Patients["id"]): Patients =>
  patientEntries.filter((patient) => patient.id === id)[0];
export {
  getPatients,
  getPatientsWithout,
  addPatient,
  getPatientById,
  addPatientEntries,
};
