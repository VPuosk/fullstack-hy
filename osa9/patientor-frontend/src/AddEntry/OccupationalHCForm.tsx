import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, DiagnosisSelection } from '../AddPatientModal/FormField';
import { Entry } from "../types";
import { useStateValue } from "../state";

interface Props {
  onSubmit: (values: Entry) => void;
}

export const OccupationalHCForm = ({ onSubmit } : Props ) => {
  const [ {diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: "OccupationalHealthcare",
        id: "dummy3",
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        employerName: "",

      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (values.type === "OccupationalHealthcare" && !values.employerName) {
          errors.employer = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Name"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Employer Name"
              placeholder="Employer"
              name="employerName"
              component={TextField}
            />
            <Field
              label="Sickleave Start"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="SickLeave End"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startEnd"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            /> 
            <Grid>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};