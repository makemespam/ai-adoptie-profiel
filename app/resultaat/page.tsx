import ResultaatPagina from "@/components/ResultaatPagina";
import { buildScoresFromAnswers, decodeVToAnswers } from "@/lib/report-url";

type ScorePayload = {
  lef: { label: string; score: number; vragen: number[] };
  werkwijze: { label: string; score: number; vragen: number[] };
  individu: { label: string; score: number; vragen: number[] };
  doel: { label: string; score: number; vragen: number[] };
};

type ResultaatRouteProps = {
  searchParams: Promise<{ data?: string; v?: string; n?: string; e?: string }>;
};

export default async function ResultaatRoute({ searchParams }: ResultaatRouteProps) {
  const params = await searchParams;
  const encoded = params?.data;
  let payload: { naam?: string; email?: string; scores?: ScorePayload; answers?: number[] } = {};

  if (params?.v) {
    const parsedAnswers = decodeVToAnswers(params.v);
    if (parsedAnswers) {
      payload = {
        naam: params.n ?? "",
        email: params.e ?? "",
        answers: parsedAnswers,
        scores: buildScoresFromAnswers(parsedAnswers),
      };
    }
  } else if (encoded) {
    try {
      payload = JSON.parse(decodeURIComponent(encoded));
    } catch {
      payload = {};
    }
  }
  return (
    <ResultaatPagina
      scores={payload.scores ?? null}
      naam={payload.naam ?? ""}
      email={payload.email ?? ""}
      answers={payload.answers ?? []}
    />
  );
}
