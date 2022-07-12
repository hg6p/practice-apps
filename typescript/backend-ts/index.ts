import express from "express";
import cors from "cors";
import { getDiagnoses } from "./services/diagnosesService";
import {
  /* getPatients */ getPatientsWithout,
  addPatient,
  getPatientById,
  addPatientEntries,
} from "./services/patientService";
import toNewPatientEntry from "./utils/utilites";
const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

app.get("/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});
app.get("/diagnoses", (_req, res) => {
  res.json(getDiagnoses());
});

app.get("/patients", (_req, res) => {
  res.json(getPatientsWithout());
});

app.post("/patients", (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedEntry = addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) errorMessage += " Error: " + error.message;
    res.status(400).send(errorMessage);
  }
});
app.get("/patients/:id", (req, res) => {
  const { id } = req.params;
  res.send(getPatientById(id));
});
app.post("/patients/:id/entry", (req, res) => {
  try {
    const { id } = req.params;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const addedEntry = addPatientEntries(req.body, id);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) errorMessage += " Error: " + error.message;
    res.status(400).send(errorMessage);
  }
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
