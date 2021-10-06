import express from 'express';
import patientService from '../services/patients';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatientsSafe());
});

router.post('/', (req, res) => {
  const newEntry = patientService.addNewPatient(req.body);
  res.json(newEntry);
});

export default router;