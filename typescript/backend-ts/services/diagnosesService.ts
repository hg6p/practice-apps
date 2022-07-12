import { Diagnoses } from "../types";
import { diagnoses } from "../data/diagnoses";

const getDiagnoses = (): Array<Diagnoses> => {
  return diagnoses;
};

export { getDiagnoses };
