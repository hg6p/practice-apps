import { Field, FieldArray, Form, Formik } from "formik";
import { HealthCheckEntry } from "../../types";
import { Button, Grid } from "@material-ui/core";
import { TextField } from "../../AddPatientModal/FormField";

interface Props {
  onSubmit: (values: EntryFormValue) => void;
  onCancel: () => void;
}
export type EntryFormValue = Omit<HealthCheckEntry, "id">;

const AddPatientEntry = ({ onSubmit, onCancel }: Props) => {
  return (
    <Formik
      initialValues={{
        date: "2018-10-05",
        specialist: "MD House",
        type: "HealthCheck",
        description:
          "Yearly control visit. Due to high cholesterol levels recommended to eat more vegetables.",
        healthCheckRating: 1,
        diagnosisCodes: [],
      }}
      onSubmit={(values) => {
        console.log(values);
        onSubmit(values);
      }}
    >
      {({ values }) => {
        return (
          <Form className="form ui">
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
            <FieldArray
              name="diagnosisCodes"
              render={(arrayHelpers: {
                remove: (arg0: number) => void;
                insert: (arg0: number, arg1: string) => void;
                push: (arg0: string) => void;
              }) => (
                <div>
                  {values.diagnosisCodes && values.diagnosisCodes.length > 0 ? (
                    values.diagnosisCodes.map((_, index) => (
                      <div key={index}>
                        <Field
                          name={`diagnosisCodes.${index}`}
                          label="diagnosisCodes"
                          placeholder="diagnosisCodes"
                          component={TextField}
                          style={{ display: "block" }}
                        />
                        <Button
                          type="button"
                          onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                        />
                        -
                        <button
                          type="button"
                          onClick={() => arrayHelpers.insert(index, "")} // insert an empty string at a position
                        >
                          +
                        </button>
                      </div>
                    ))
                  ) : (
                    <Button type="button" onClick={() => arrayHelpers.push("")}>
                      {/* show this when user has removed all friends from the list */}
                      Add Entry
                    </Button>
                  )}
                </div>
              )}
            />
            <Field
              label="type"
              placeholder="type"
              name="type"
              component={TextField}
            />
            <Field
              label="health check rating"
              placeholder="health check rating"
              name="healthCheckRating"
              component={TextField}
              style={{ display: "block" }}
            />

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
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddPatientEntry;
