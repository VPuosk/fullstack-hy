import diagnoseArray from '../../data/diagnoses';
import { DiagnoseObject } from '../types';

const diagnoses: DiagnoseObject[] = diagnoseArray;

const getDiagnoses = (): DiagnoseObject[] => {
  return diagnoses;
};

export default {
  getDiagnoses,
};