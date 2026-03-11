import { kwadrantLabels } from "@/lib/copy";

export const QUESTION_COUNT = 12;

export type IntakeAnswer = "ja" | "nee" | "deels";

export type ScorePayload = {
  lef: { label: string; score: number; vragen: number[] };
  werkwijze: { label: string; score: number; vragen: number[] };
  individu: { label: string; score: number; vragen: number[] };
  doel: { label: string; score: number; vragen: number[] };
};

export function encodeAnswersToV(answers: number[]): string {
  if (answers.length !== QUESTION_COUNT) return "";
  return answers
    .map((score) => {
      if (score < 1 || score > 10) return "5";
      return score === 10 ? "0" : String(score);
    })
    .join("");
}

export function decodeVToAnswers(v: string): number[] | null {
  if (!v || v.length !== QUESTION_COUNT || !/^[0-9]{12}$/.test(v)) return null;
  return v.split("").map((char) => (char === "0" ? 10 : Number(char)));
}

export function encodeIntakeAnswer(answer: IntakeAnswer | null): string {
  if (!answer) return "";
  if (answer === "ja") return "j";
  if (answer === "nee") return "n";
  if (answer === "deels") return "d";
  return "";
}

export function decodeIntakeAnswer(i: string | undefined): IntakeAnswer | null {
  if (!i) return null;
  if (i === "j") return "ja";
  if (i === "n") return "nee";
  if (i === "d") return "deels";
  return null;
}

export function buildScoresFromAnswers(answers: number[]): ScorePayload {
  const lef = answers.slice(0, 3);
  const werkwijze = answers.slice(3, 6);
  const individu = answers.slice(6, 9);
  const doel = answers.slice(9, 12);

  const avg = (values: number[]) =>
    values.length ? Number((values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(1)) : 0;

  return {
    lef: { label: kwadrantLabels.lef, score: avg(lef), vragen: lef },
    werkwijze: { label: kwadrantLabels.werkwijze, score: avg(werkwijze), vragen: werkwijze },
    individu: { label: kwadrantLabels.individu, score: avg(individu), vragen: individu },
    doel: { label: kwadrantLabels.doel, score: avg(doel), vragen: doel },
  };
}
