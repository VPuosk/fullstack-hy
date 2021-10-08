import React from "react";
import axios from "axios";

import { useStateValue } from "../state";
import { Patient, Entry } from "../types";
import { apiBaseUrl } from "../constants";
import { useParams } from 'react-router-dom';
import { updatePatient } from "../state/reducer";
import HealthRatingBar from "./HealthRatingBar";
import { Table } from "semantic-ui-react";

const PatientPage = () => {
  //const [ currentPatient, setCurrentPatient ] = useState<Patient>( );
  const [{ patients, diagnoses }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const currentPatient = patients[id];

  const fetchPatient = async () => {

    if (currentPatient && currentPatient.ssn === undefined ) {
      console.log(`fetching data for ${currentPatient.name}`);
      const { data : patient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
      dispatch(updatePatient(patient));
    }
  };

  if (currentPatient && !(currentPatient.ssn)) {
    void fetchPatient();
  }

  if (!currentPatient) {
    return (
      <div>
        False patient ID
      </div>
    );
  }

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
    if (currentPatient.entries === undefined) {
      return (
        null
      );
    }

    /*
    <Table celled>
        <Table.Header>
          <Table.Row>
    */
    return (
      <Table celled>
        <Table.Body>
          {currentPatient.entries.map(entry => (
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


  return (
    <div>
      <h2>{currentPatient.name}</h2>
      <div>{currentPatient.ssn}</div>
      <div>{currentPatient.occupation}</div>
      <h3>Entries</h3>
      {renderEntries()}
    </div>
  );
};

export default PatientPage;