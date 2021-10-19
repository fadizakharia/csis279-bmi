const getBmi = (weight: number, height: number) => {
  const bmi = weight / Math.pow(height, 2);
  if (bmi >= 30) {
    return { bmi, result: "Obese" };
  } else if (bmi >= 25 && bmi <= 29.9) {
    return { bmi, result: "overweight" };
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return { bmi, result: "normal" };
  } else {
    return { bmi, result: "underweight" };
  }
};
export default getBmi;
