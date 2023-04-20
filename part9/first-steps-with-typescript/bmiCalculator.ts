interface BMIValues {
    heightInCM: number;
    weightInKG: number;
}
  
const bmiArguments = (args: string[]): BMIValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            heightInCM: Number(args[2]),
            weightInKG: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
}

const calculateBmi = (heightInCM: number, weightInKG: number) : string => {
    const BMI = weightInKG/(Math.pow(heightInCM/100, 2))

    switch ( true ) {
        case ( BMI < 18.5 ):
            return "Underweight"
        case ( BMI >= 18.5 && BMI < 25):
            return "Normal Weight"
        case ( BMI >= 25 && BMI < 30):
            return "Overweight"
        case (BMI >= 30):
            return "Obese"
        default: return "Input variables"
    }
}

try {
    const { heightInCM, weightInKG } = bmiArguments(process.argv);
    console.log(calculateBmi(heightInCM, weightInKG));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}

export default calculateBmi