import React from "react";
import { Dialog, DialogTitle, DialogContent, Divider } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import AddPateintEntry, { EntryFormValue } from "./AddPatientEntry";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValue) => void;
  error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {
  console.log("hej", onSubmit);
  return (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
      <DialogTitle>Add a new patient</DialogTitle>
      <Divider />
      <DialogContent>
        {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
        <AddPateintEntry onSubmit={onSubmit} onCancel={onClose} />
      </DialogContent>
    </Dialog>
  );
};
export default AddEntryModal;
