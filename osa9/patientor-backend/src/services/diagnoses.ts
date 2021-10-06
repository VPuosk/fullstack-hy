import diagnoseArray from '../../data/diagnoses';
import { DiagnoseObject } from '../types';

const getDiagnoses = (): DiagnoseObject[] => {
  return diagnoseArray;
};

export default {
  getDiagnoses,
};