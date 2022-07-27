import { Button } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { useStateValue, visitPatient } from "../state";
import {
  Diagnosis,
  Entry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  Patient,
} from "../types";
import AddEntryModal from "./AddPatientEntryModal/AddEntryModal";
import { EntryFormValue } from "./AddPatientEntryModal/AddPatientEntry";
import HealthCheckUpCard from "./HealthCheckUpCard";
import HospitalCard from "./HospitalCard";
import OccupationCard from "./OccupationCard";
const border = { border: "1px solid black" };
const PatientView = () => {
  const [{ visitedPatients }, dispatch] = useStateValue();
  const id = useParams().id || "";
  const [patientData, setPatientData] = useState<Patient | undefined>();
  const [diagnoses, setDiagnosis] = useState<Diagnosis[]>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    void (async () => {
      try {
        const { data: diagnosisArray } = await axios.get<Diagnosis[]>(
          `http://localhost:3000/diagnoses/`
        );
        setDiagnosis(diagnosisArray);
        console.log(id in visitedPatients, id);
        /*  if (id in visitedPatients) setPatientData(visitedPatients[id]);
        else { */
        const { data: patient } = await axios.get<Patient>(
          `http://localhost:3000/patients/${id}`
        );
        console.log(patient);
        setPatientData(patient);
        dispatch(visitPatient(patient));
        console.log(diagnoses);
        //}
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };
  const submitNewEntry = async (values: EntryFormValue) => {
    console.log("submitnewenty", values);
    try {
      const { data: newEntry } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entry`,
        values
      );
      console.log(newEntry);
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(
          String(e?.response?.data?.error) || "Unrecognized axios error"
        );
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };
  return (
    <div>
      {patientData && (
        <>
          <p> {patientData.name}</p>
          <p> {patientData.occupation}</p>
          <p> {patientData.ssn}</p>
          {patientData.entries.map((value: Entry) => {
            <p>Hello</p>;
            switch (value.type) {
              case "OccupationalHealthcare":
                return (
                  <div style={border}>
                    <OccupationCard
                      entry={value as OccupationalHealthcareEntry}
                    />
                  </div>
                );
              case "Hospital":
                return (
                  <div style={border}>
                    <HospitalCard entry={value as HospitalEntry} />;
                  </div>
                );
              case "HealthCheck":
                return (
                  <div style={border}>
                    <HealthCheckUpCard entry={value as HealthCheckEntry} />{" "}
                  </div>
                );
            }
          })}
        </>
      )}
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </div>
  );
};

export default PatientView;
