import { Field, Form, Formik } from "formik";
import { Entry } from "../../types";
import { Button, FormControl, Grid, RadioGroup } from "@material-ui/core";
import {
  DiagnosisSelection,
  RadioField,
  TextField,
} from "../../AddPatientModal/FormField";
import { useStateValue } from "../../state";
import { useEffect, useRef } from "react";

interface Props {
  onSubmit: (values: EntryFormValue) => void;
  onCancel: () => void;
}
const initialValues = {
  date: "2018-10-05",
  specialist: "MD House",
  type: "",
  diagnosisCodes: [],
  description: "Yearly control visit. Due to high cholesterol levels",
  healthCheckRating: 1,
};
export type EntryFormValue = Omit<Entry, "id">;

const AddPatientEntry = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnosis }] = useStateValue();
  console.log("diagnosis", diagnosis);
  const radioGroupRef = useRef();
  useEffect(() => {
    console.log(radioGroupRef);
  }, [radioGroupRef]);
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        switch (values.type) {
          case "HealthCheckup": {
            errors.healthCheckRating = requiredError;
          }
        }
        return errors;
      }}
    >
      {({ setFieldValue, setFieldTouched, isValid, values }) => {
        return (
          <Form className="form ui">
            <FormControl>
              <RadioGroup
                role="group"
                aria-labelledby="my-radio-group"
                innerRef={radioGroupRef}
              >
                <RadioField
                  value="HealthCheck"
                  label="Health Check"
                  name="type"
                  type="radio"
                />
                <RadioField
                  value="OccupationalHealthcare"
                  label="Occupational Healthcare"
                  name="type"
                  type="radio"
                />
                <RadioField
                  value="Hospital"
                  label="Hospital"
                  name="type"
                  type="radio"
                />
              </RadioGroup>
            </FormControl>
            <Field
              label="description"
              placeholder="description"
              name="description"
              component={TextField}
              style={{ display: "block" }}
            />
            <Field
              label="date"
              placeholder="date"
              name="date"
              component={TextField}
              style={{ display: "block" }}
            />
            <Field
              label="specialist"
              placeholder="specialist"
              name="specialist"
              component={TextField}
              style={{ display: "block" }}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosis)}
            />
            {values.type == "HealthCheck" && (
              <Field
                label="health check rating"
                placeholder="health check rating"
                name="healthCheckRating"
                component={TextField}
                style={{ display: "block" }}
              />
            )}
            {/*  {values.type == "OccupationalHealthcare" && (
              <>
                <Field
                  label="discharge date"
                  placeholder="discharge date"
                  name="discharge.date"
                  component={TextField}
                  style={{ display: "block" }}
                />
                <Field
                  label="discharge criteria "
                  name="discharge.criteria"
                  placeholder="discharge criteria"
                  component={TextField}
                  style={{ display: "block" }}
                ></Field>
                <Field
                  label="employer name"
                  name="employerName"
                  placeholder="employer name"
                  component={TextField}
                  style={{ display: "block" }}
                ></Field>
              </>
            )} */}
            {/*   <Field
              label=""
              name=""
              placeholder=""
              component={TextField}
            ></Field> */}
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddPatientEntry;
