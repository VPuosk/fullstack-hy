import React from "react";
import axios from "axios";

import { useStateValue } from "../state";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useParams } from 'react-router-dom';
import { updatePatient } from "../state/reducer";

const PatientPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const currentPatient = patients[id];

  if (!currentPatient) {
    return (
      <div>
        False patient ID
      </div>
    );
  }

  const fetchPatient = async () => {
    if (currentPatient.ssn === undefined ) {
      const { data : patient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
      dispatch(updatePatient(patient));
    }
  };
  void fetchPatient();

  return (
    <div>
      <div>{currentPatient.name}</div>
      <div>{currentPatient.ssn}</div>
      <div>{currentPatient.occupation}</div>
    </div>
  );
};

export default PatientPage;