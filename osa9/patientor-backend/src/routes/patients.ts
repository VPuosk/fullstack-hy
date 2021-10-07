import express from 'express';
import patientService from '../services/patients';
import verifyNewEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatientsSafe());
});

router.post('/', (req, res) => {
  try {
    const parsedData = verifyNewEntry(req.body);
    const newEntry = patientService.addNewPatient(parsedData);
    res.json(newEntry);
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    } else {
      res.status(400).send();
    }
  }
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatientByID(req.params.id);
  if (!patient) {
    res.status(400).send("unknown patient ID");
  }
  res.send(patient);
});

export default router;