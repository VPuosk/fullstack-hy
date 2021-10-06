import express from 'express';
import patientService from '../services/patients';
import verifyNewEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatientsSafe());
});

router.post('/', (req, res) => {
  try {
    const parsedDate = verifyNewEntry(req.body);
    const newEntry = patientService.addNewPatient(parsedDate);
    res.json(newEntry);
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    } else {
      res.status(400).send();
    }
  }
});

export default router;