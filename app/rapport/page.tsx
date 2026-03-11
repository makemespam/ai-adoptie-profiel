import ResultaatPagina from "@/components/ResultaatPagina";
import { buildScoresFromAnswers, decodeIntakeAnswer, decodeVToAnswers } from "@/lib/report-url";

type RapportRouteProps = {
  searchParams: Promise<{ v?: string; n?: string; e?: string; i?: string; g?: string; skip?: string }>;
};

export default async function RapportRoute({ searchParams }: RapportRouteProps) {
  const params = await searchParams;
  const answers = params?.v ? decodeVToAnswers(params.v) : null;
  const scores = answers ? buildScoresFromAnswers(answers) : null;
  const intakeAnswer = decodeIntakeAnswer(params?.i);
  const gespreksopener = params?.g ? decodeURIComponent(params.g) : "";

  return (
    <ResultaatPagina
      scores={scores}
      naam={params?.n ?? ""}
      email={params?.e ?? ""}
      answers={answers ?? []}
      intakeAnswer={intakeAnswer}
      gespreksopener={gespreksopener}
      skipLead={params?.skip === "1"}
    />
  );
}
