interface exerciseData {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number;
}

interface exerciseDataInput {
  target: number,
  days: number[]
}

const calculateExercises = ( inputArray: number[], inputTarget: number):exerciseData => {
  //const inputArray = [1];
  //const inputTarget = 1;
  const data: exerciseData = {
    periodLength: 0,
    trainingDays: 0,
    success: false,
    rating: 0,
    ratingDescription: 'n/a',
    target: 0,
    average: 0
  };
  
  data.periodLength = inputArray.length;

  if (data.periodLength > 0) {
    data.trainingDays = inputArray.filter(hours => hours > 0).length;
    data.target = inputTarget;
    data.average = inputArray.reduce((sum, value) => sum + value, 0)/data.periodLength;
    data.success = data.periodLength === inputArray.filter(hours => hours >= data.target).length;
    if (data.success) {
      data.rating = 3;
      data.ratingDescription = 'Excellent';
    } else if (data.trainingDays < 2) {
      data.rating = 1;
      data.ratingDescription = 'Could be improved';
    } else {
      data.rating = 2;
      data.ratingDescription = 'Good';
    }
  } else {
    data.target = inputTarget;
  }

  return data;
};

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