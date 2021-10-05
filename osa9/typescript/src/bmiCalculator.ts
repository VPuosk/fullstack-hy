import { calculateBmi } from "./bmiCalc";

interface BmiValues {
  height: number;
  weight: number;
}

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
};


try {
  const inputValues:BmiValues = parseArguments(process.argv);
  console.log(calculateBmi(inputValues.height, inputValues.weight));
} catch (error) {
  if (error instanceof Error) {
    console.log(error.message);
  } else {
    console.log('error');
  }
}