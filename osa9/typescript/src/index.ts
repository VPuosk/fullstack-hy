import express from 'express';
import { calculateBmi } from './bmiCalc';
import { calculateExercises } from './exerciseCalc';
import { Request } from 'express';
//const express = require('express');
const app = express();

app.use(express.json());

interface ExerciseRequest {
  daily_exercises: number[],
  target: number
}

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if (!req.query.height || !req.query.weight) {
    res.status(400).send({
      error: "malformatted parameters"
    });
    return;
  }

  const valueA = Number(req.query.height);
  const valueB = Number(req.query.weight);

  if (!valueA || !valueB) {
    res.status(400).send({
      error: "malformatted parameters"
    });
    return;
  }
  
  const result:string = calculateBmi(valueA, valueB);

  res.send({
    weight:valueB,
    height:valueA,
    bmi:result
  });
});

// fair bit of work & stackoverflow browsing to get the lint to go silent...
app.post('/exercises', (req: Request<Record<string, unknown>, unknown, ExerciseRequest>, res) => {
  const { daily_exercises, target } = req.body;

  // validating the existance of parameters
  if (!daily_exercises || !target) {
    res.status(400).send({
      error: "parameters missing"
    });
    return;
  }

  const inputTarget = Number(target);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inputArray:number[] = daily_exercises.map((a: any) => Number(a)); // deliberate use of any

  // validating the type of parameters
  if (!inputTarget || inputArray.some(isNaN)) {
    res.status(400).send({
      error: "malformatted parameters"
    });
    return;
  }

  res.send(calculateExercises(inputArray, inputTarget));
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});