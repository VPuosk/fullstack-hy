import { calculateExercises } from './exerciseCalc';

interface exerciseDataInput {
  target: number,
  days: number[]
}

const parseValues = (args:string[]):exerciseDataInput => {
  if (args.length < 4) {
    throw new Error("Too few arguments");
  }

  const inputData :exerciseDataInput = {
    target: Number(args[2]),
    days: [...args].splice(3).map(a => Number(a)).map(a => a || 0)
  };

  inputData.target = inputData.target || 0;

  //console.log('iData:',inputData)

  return inputData;
};

try {
  const feedValues:exerciseDataInput = parseValues(process.argv);
  console.log(calculateExercises(feedValues.days,feedValues.target));
} catch (error) {
  if (error instanceof Error) {
    console.log(error.message);
  } else {
    console.log('error');
  }
}

//console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));