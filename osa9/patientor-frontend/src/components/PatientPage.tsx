import React from "react";
import axios from "axios";

import { useStateValue } from "../state";
import { Patient, Entry } from "../types";
import { apiBaseUrl } from "../constants";
import { useParams } from 'react-router-dom';
import { updatePatient } from "../state/reducer";
import HealthRatingBar from "./HealthRatingBar";
import { Table, Segment, Select, DropdownProps } from "semantic-ui-react";
import { OccupationalHCForm } from "../AddEntry/OccupationalHCForm";
import { HealthCheckForm } from "../AddEntry/HealthCheckForm";
import { HospitalForm } from "../AddEntry/HospitalForm";

const entryOptions = [
  {key : 'Hospital', value: 'Hospital', text: 'Hospital Visit'},
  {key : 'HealthCheck', value: 'HealthCheck', text: 'Health Check'},
  {key : 'OccupationalHealthcare', value: 'OccupationalHealthcare', text: 'Occupational Healthcare'},
];

const PatientPage = () => {
  const [{ patients, diagnoses }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [ error, setError] = React.useState<string|undefined>();
  const [ currentEntry, setEntryType ] = React.useState<string>('Hospital');

  const patient : Patient = patients[id];

  if (patient && (patient.ssn === undefined)) {
    const fetchPatient = async (id:string) => {
      //console.log(`fetching data for ${patients[id].name}`);
      const { data : newpatient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
      dispatch(updatePatient(newpatient));
    };

    void fetchPatient(id);
  }

  const submitNewEntry = async (values: Entry) => {
    //console.log('submit',values);
    if (patient) {
      try {
        const { data: newEntry } = await axios.post<Patient>(
          `${apiBaseUrl}/patients/${id}/entries`,
          values
        );
        dispatch(updatePatient(newEntry));
        //setCurrentPatient(patients[id]);
      } catch (e) {
        if(e.response) {
          setError(e.response.data);
        } else if (e instanceof  Error) {
          setError(e.message); 
        } else {
          setError('Unknown error'); 
        }
        setTimeout(() => setError(undefined), 4000);
      }
    }
  };

  if (!patient) {
    return (
      <div>
        False patient ID
      </div>
    );
  }

  const maybeRenderError = () => {
    if (error) {
      return (
        <Segment inverted color="red">{`Something went wrong: ${error}`}</Segment>
      );
    } else {
      return null;
    }
  };

  const renderDiagnosecode = ( code : string) => {
    return (
      <div key={code}>{code} {diagnoses[code].name}</div>
    );
  };

  const renderVisitType = (type : string) => {
    switch (type) {
      case "Hospital":
        return (
          <div>
            Hospital visit
          </div>
        );
      case "OccupationalHealthcare":
        return (
          <div>
            Occupational healthcare
          </div>
        );
      case "HealthCheck":
        return (
          <div>
            Health check
          </div>
        );
      default:
        break;
    }
  };

  const renderEntry = ( entry : Entry ) => {
    switch (entry.type) {
      case "Hospital":
        return (
          <div>
            Discharged: {entry.discharge.date} - {entry.discharge.criteria}
          </div>
        );
      case "OccupationalHealthcare":
        return (
          <div>
            <div>Employer: {entry.employerName}</div>
            <div>Sickleave: {entry.sickLeave?.startDate} - {entry.sickLeave?.endDate}</div>
          </div>
        );
      case "HealthCheck":
        return (
          <div>
            <HealthRatingBar showText={false} rating={entry.healthCheckRating} />
          </div>
        );
      default:
        break;
    }
  };

  const renderEntries = () => {
    //safety check
    if (patient.entries === undefined) {
      return (
        null
      );
    }
    return (
      <Table celled>
        <Table.Body>
          {patient.entries.map(entry => (
            <Table.Row key={entry.id}>
              <Table.Cell>
                <div>{renderVisitType(entry.type)}</div>
                <div>{entry.date} {entry.description}</div>
                <div>
                  {renderEntry(entry)}
                </div>
                <div>
                  {entry.diagnosisCodes?.map(diagcode => 
                    renderDiagnosecode(diagcode)  
                  )}
                </div>
              </Table.Cell>
            </Table.Row>
            )
          )}
        </Table.Body>
      </Table>
    );
  };

  const changeSelected = (_value:unknown, data: DropdownProps) => {
    const target = data.value as string;
    setEntryType(target);
  };

  const renderSelect = ( ) => {
    return (
      <Select
        defaultValue={currentEntry}
        onChange={changeSelected}
        options={entryOptions}
      />
    );
  };

  const renderSelected = () => {
    switch (currentEntry) {
      case "Hospital":
        return (
          <HospitalForm
            onSubmit={submitNewEntry}
          />
        );
      case "HealthCheck":
        return (
          <HealthCheckForm
            onSubmit={submitNewEntry}
          />
        );
      case "OccupationalHealthcare":
        return (
          <OccupationalHCForm
            onSubmit={submitNewEntry}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {maybeRenderError()}
      <h2>{patient.name}</h2>
      <div>{patient.ssn}</div>
      <div>{patient.occupation}</div>
      <h3>Entries</h3>
      {renderEntries()}
      {renderSelect()}
      {renderSelected()}
    </div>
  );
};

export default PatientPage;