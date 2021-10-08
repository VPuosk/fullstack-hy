import React from "react";
import axios from "axios";

import { useStateValue } from "../state";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useParams } from 'react-router-dom';
import { updatePatient } from "../state/reducer";

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

  
  //void fetchPatient();

  const renderEntries = () => {
    if (currentPatient.entries === undefined) {
      return (
        null
      );
    }
    return (
      <div>
        {currentPatient.entries.map(entry => (
          <div key={entry.id}>
            {entry.date} {entry.description}
            <div>
              {entry.diagnosisCodes?.map(diagcode => (
                <div key={diagcode}>{diagcode} {diagnoses[diagcode].name}</div>
              ))}
            </div>
          </div>
        )
        )}
      </div>
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