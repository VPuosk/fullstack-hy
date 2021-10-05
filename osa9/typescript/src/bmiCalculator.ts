/*
interface BmiValues {
  height: number;
  weight: number;
}
*/

export const calculateBmi = (height:number, weight:number):string => {
  //console.log('h',height)
  //console.log('w',weight)
  const bmi:number = 100 * 100 * weight / height / height;
  //console.log('bmi',bmi)
  if (bmi < 16) {
    return 'Underweight (Severe thinness)';
  } else if (bmi < 17) {
    return 'Underweight (Moderate thinness)';
  } else if (bmi < 18.5) {
    return 'Underweight (Mild thinness)';
  } else if (bmi < 25) {
    return 'Normal range';
  } else if (bmi < 30) {
    return 'Overweight (Pre-obese)';
  } else if (bmi < 35) {
    return 'Obese (Class I)';
  } else if (bmi < 40) {
    return 'Obese (Class II)';
  } else {
    return 'Obese (Class III)';
  }
}

/*
const parseArguments = (args: string[]): BmiValues => {
  // lets only case of the required arguments
  if (args.length < 4) {
    throw new Error("Too few arguments");    
  }

  const values: BmiValues = {
    height: Number(args[2]),
    weight: Number(args[3])
  };

  values.height = values.height || 0;

  if (values.height <= 0) {
    throw new Error("Invalid argument given for: height");
  }

  return values;
}


try {
  const inputValues:BmiValues = parseArguments(process.argv);
  console.log(calculateBmi(inputValues.height, inputValues.weight));
} catch (error) {
  console.log(error.message);
}
*/