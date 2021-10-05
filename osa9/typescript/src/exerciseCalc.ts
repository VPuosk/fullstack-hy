interface exerciseData {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number;
}

export const calculateExercises = ( inputArray: number[], inputTarget: number):exerciseData => {
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