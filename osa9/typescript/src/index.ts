import express from 'express';
import { calculateBmi } from './bmiCalculator';
//const express = require('express');
const app = express();

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

  const valueA:number = Number(req.query.height);
  const valueB:number = Number(req.query.weight);

  if (!valueA || !valueB) {
    res.status(400).send({
      error: "malformatted parameters"
    });
    return;
  };
  
  const result:string = calculateBmi(valueA, valueB);

  res.send({
    weight:valueB,
    height:valueA,
    bmi:result
  });
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});