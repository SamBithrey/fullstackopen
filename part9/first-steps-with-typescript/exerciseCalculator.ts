interface ExerciseValues {
    exerciseHours: number[];
    targetHours: number;
}
  
const exerciseArguments = (args: string[]): ExerciseValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    const targetHours = Number(args[2]);
    args.splice(0, 3);
    const exerciseHours: number[] = args.map((hours) => Number(hours));

    if (!isNaN(Number(args[2])) && !exerciseHours.includes(NaN)) {
        return {
            exerciseHours: exerciseHours,
            targetHours: targetHours
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};


interface exerciseResults {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

export const calculateExercises = (exerciseHours: number[], targetHours: number) : exerciseResults => {
    const result = {
        periodLength: 0,
        trainingDays: 0,
        success: false,
        rating: 0,
        ratingDescription: "",
        target: 0,
        average: 0
    };
    result.target = targetHours;
    result.periodLength = exerciseHours.length;
    result.trainingDays = exerciseHours.filter((hours) => hours > 0).length;
    result.average = (exerciseHours.reduce(function(a: number, b: number){return a + b;}))/exerciseHours.length;
    if(result.average > result.target) {result.success = true;}
    switch (true) {
        case (result.average === 0):
            result.rating = 1;
            result.ratingDescription = 'You didn\'t train at all!!!';
            break;
        case (result.success === false):
            result.rating = 2;
            result.ratingDescription = 'Not too bad but could be better';
            break;
        case (result.success === true):
            result.rating = 3;
            result.ratingDescription = 'You smashed it this time!';
            break;
    }
    return result;
};


try {
    const { exerciseHours, targetHours } = exerciseArguments(process.argv);
    console.log(calculateExercises(exerciseHours, targetHours));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
