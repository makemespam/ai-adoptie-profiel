export type AnchorPoint = {
  key: 1 | 3 | 5 | 7 | 9;
  label: string;
  text: string;
};

export type Question = {
  id: string;
  title: string;
  prompt: string;
  quadrantId: QuadrantId;
  anchors: AnchorPoint[];
};

export type QuadrantId =
  | "lef"
  | "werkwijze"
  | "individu"
  | "doel";

export type Quadrant = {
  id: QuadrantId;
  name: string;
  subtitle: string;
  feedback: string;
};

export const quadrants: Quadrant[] = [
  {
    id: "lef",
    name: "Lef & Cultuur",
    subtitle: "Durf & Cultuur",
    feedback:
      "Jullie laten ruimte zien voor experimenten en open gesprekken over AI, ook als het nog schuurt.",
  },
  {
    id: "werkwijze",
    name: "Werkwijze & Proces",
    subtitle: "Aanpak & Proces",
    feedback:
      "Jullie werkprocessen en tooling bieden houvast om AI op een bruikbare manier in te zetten.",
  },
  {
    id: "individu",
    name: "Individu & Eigenaarschap",
    subtitle: "Mens & Eigenaarschap",
    feedback:
      "Er is persoonlijk eigenaarschap zichtbaar: mensen nemen initiatief en bouwen AI-vaardigheid op.",
  },
  {
    id: "doel",
    name: "Doel & Strategie",
    subtitle: "Organisatie & Strategie",
    feedback:
      "Jullie koppelen AI-keuzes aan strategische doelen en houden oog voor menselijke regie.",
  },
];

export const questions: Question[] = [
  {
    id: "V1",
    title: "Experimenteerruimte",
    prompt:
      "Denk aan de afgelopen maanden: als iemand een AI-tool uitprobeerde en het werkte niet — werd dat gedeeld als leermoment, of verdween het stil?",
    quadrantId: "lef",
    anchors: [
      { key: 1, label: "1–2", text: "Mislukkingen blijven verborgen, niemand deelt wat niet werkt" },
      { key: 3, label: "3–4", text: "Voorzichtigheid — je probeert iets, maar deelt het liever niet" },
      { key: 5, label: "5–6", text: "Wisselend — soms openheid, afhankelijk van wie het vraagt" },
      { key: 7, label: "7–8", text: "Experimenteren mag, ook als het mislukt" },
      { key: 9, label: "9–10", text: "Leren van AI-mislukkingen is normaal en waardevol hier" },
    ],
  },
  {
    id: "V2",
    title: "Bereidheid tot verandering",
    prompt:
      "Denk aan de afgelopen maanden: als een werkproces veranderde door een nieuwe tool — hoe reageerde het team doorgaans?",
    quadrantId: "lef",
    anchors: [
      { key: 1, label: "1–2", text: "Weerstand is de norm, verandering wordt vermeden" },
      { key: 3, label: "3–4", text: "Scepsis overheerst, mensen passen zich aan maar zonder enthousiasme" },
      { key: 5, label: "5–6", text: "Wisselend — sommigen open, anderen afwachtend" },
      { key: 7, label: "7–8", text: "Het team past zich goed aan, nieuwe tools worden serieus genomen" },
      { key: 9, label: "9–10", text: "Verandering wordt omarmd als kans, niet gevreesd als bedreiging" },
    ],
  },
  {
    id: "V3",
    title: "Psychologische veiligheid rond AI",
    prompt:
      "Denk aan de afgelopen maanden: voelden mensen de ruimte om te zeggen 'ik snap dit niet' of 'ik vind dit spannend' als het over AI ging?",
    quadrantId: "lef",
    anchors: [
      { key: 1, label: "1–2", text: "Onzekerheid over AI wordt niet uitgesproken" },
      { key: 3, label: "3–4", text: "Mensen doen alsof ze het snappen, ook als dat niet zo is" },
      { key: 5, label: "5–6", text: "Wisselend — in kleine kring wel, in het grote team niet" },
      { key: 7, label: "7–8", text: "Er is ruimte voor eerlijkheid over wat je wel en niet weet" },
      { key: 9, label: "9–10", text: "Onzekerheid over AI is normaal en wordt openlijk besproken" },
    ],
  },
  {
    id: "V4",
    title: "Procesduidelijkheid",
    prompt:
      "Denk aan jullie dagelijkse werkprocessen: zijn die voldoende gedocumenteerd en voorspelbaar om te bepalen waar AI zou kunnen helpen?",
    quadrantId: "werkwijze",
    anchors: [
      { key: 1, label: "1–2", text: "Processen leven in hoofden, niet op papier — AI heeft geen aanknopingspunt" },
      { key: 3, label: "3–4", text: "Sommige processen zijn helder, veel loopt op gevoel en ervaring" },
      { key: 5, label: "5–6", text: "Redelijk gedocumenteerd, maar inconsistent uitgevoerd" },
      { key: 7, label: "7–8", text: "Processen zijn helder genoeg om te analyseren waar AI waarde toevoegt" },
      { key: 9, label: "9–10", text: "Processen zijn transparant, meetbaar en klaar voor AI-integratie" },
    ],
  },
  {
    id: "V5",
    title: "Basiskennis & tooling",
    prompt:
      "Denk aan de afgelopen maanden: in hoeverre gebruiken mensen in het team al AI-tools in hun dagelijkse werk?",
    quadrantId: "werkwijze",
    anchors: [
      { key: 1, label: "1–2", text: "Nauwelijks — AI is een abstract begrip, geen praktijk" },
      { key: 3, label: "3–4", text: "Enkele mensen experimenteren, de meesten niet" },
      { key: 5, label: "5–6", text: "Een deel van het team gebruikt AI-tools, maar niet structureel" },
      { key: 7, label: "7–8", text: "AI-tools worden regelmatig en bewust ingezet door meerdere mensen" },
      { key: 9, label: "9–10", text: "AI is geintegreerd in de dagelijkse werkpraktijk van het hele team" },
    ],
  },
  {
    id: "V6",
    title: "Data & informatiehygiene",
    prompt:
      "Denk aan jullie informatie: is die voldoende gestructureerd, actueel en toegankelijk om er AI zinvol op los te laten?",
    quadrantId: "werkwijze",
    anchors: [
      { key: 1, label: "1–2", text: "Data zit verspreid, is verouderd of nauwelijks toegankelijk" },
      { key: 3, label: "3–4", text: "Sommige informatie is op orde, maar het is geen bewust beleid" },
      { key: 5, label: "5–6", text: "Redelijk — maar er zijn gaten die AI-gebruik bemoeilijken" },
      { key: 7, label: "7–8", text: "Informatie is grotendeels gestructureerd en bruikbaar als input voor AI" },
      { key: 9, label: "9–10", text: "Data is schoon, actueel en strategisch beheerd als organisatiekapitaal" },
    ],
  },
  {
    id: "V7",
    title: "Intrinsieke motivatie",
    prompt:
      "Denk aan de afgelopen maanden: onderzochten mensen uit zichzelf hoe AI hun werk makkelijker of beter kon maken — of wachtten ze tot het van bovenaf kwam?",
    quadrantId: "individu",
    anchors: [
      { key: 1, label: "1–2", text: "AI wordt als opdracht ervaren, niet als kans" },
      { key: 3, label: "3–4", text: "Een enkeling is nieuwsgierig, de meesten wachten af" },
      { key: 5, label: "5–6", text: "Wisselend — afhankelijk van de persoon en het moment" },
      { key: 7, label: "7–8", text: "Meerdere mensen verkennen actief wat AI voor hen kan betekenen" },
      { key: 9, label: "9–10", text: "Het team is van binnenuit gedreven om AI slim in te zetten" },
    ],
  },
  {
    id: "V8",
    title: "Eigenaarschap & trekkers",
    prompt:
      "Denk aan jullie organisatie: is er iemand — of een kleine groep — die AI actief trekt, kennis deelt en anderen meeneemt?",
    quadrantId: "individu",
    anchors: [
      { key: 1, label: "1–2", text: "Niemand pakt AI echt op — het zweeft" },
      { key: 3, label: "3–4", text: "Er is interesse maar geen duidelijke trekker" },
      { key: 5, label: "5–6", text: "Een persoon trekt, maar de rest volgt nauwelijks" },
      { key: 7, label: "7–8", text: "Er is een herkenbare AI-trekker die anderen actief betrekt" },
      { key: 9, label: "9–10", text: "Eigenaarschap over AI is breed verdeeld en zelforganiserend" },
    ],
  },
  {
    id: "V9",
    title: "Capaciteit & ruimte",
    prompt:
      "Denk aan de afgelopen maanden: was er in de praktijk tijd en mentale ruimte om te experimenteren met AI — of verdween het onder de dagelijkse drukte?",
    quadrantId: "individu",
    anchors: [
      { key: 1, label: "1–2", text: "Geen ruimte — overleven staat voorop" },
      { key: 3, label: "3–4", text: "Incidenteel een moment, maar het wordt steeds verdrongen" },
      { key: 5, label: "5–6", text: "Soms ruimte, maar niet structureel geborgd" },
      { key: 7, label: "7–8", text: "Er wordt bewust tijd vrijgemaakt voor AI-exploratie" },
      { key: 9, label: "9–10", text: "AI-ontwikkeling is structureel ingebouwd in de werkweek" },
    ],
  },
  {
    id: "V10",
    title: "Strategische visie",
    prompt:
      "Denk aan de koers van jullie organisatie: is er een helder beeld van wat AI moet bijdragen — of wordt er vooral gereageerd op wat anderen doen?",
    quadrantId: "doel",
    anchors: [
      { key: 1, label: "1–2", text: "Geen visie op AI — we zien wel wat er komt" },
      { key: 3, label: "3–4", text: "Er is een gevoel van urgentie maar geen richting" },
      { key: 5, label: "5–6", text: "Enkele ideeen, maar geen gedeeld beeld" },
      { key: 7, label: "7–8", text: "Er is een heldere richting voor AI die breed bekend is" },
      { key: 9, label: "9–10", text: "AI-strategie is concreet, gedragen en verbonden aan organisatiedoelen" },
    ],
  },
  {
    id: "V11",
    title: "Leiderschap & voorbeeldgedrag",
    prompt:
      "Denk aan de leiders in jullie organisatie: gebruiken zij zelf AI-tools en laten zij zien hoe ze daarmee omgaan — inclusief de twijfels?",
    quadrantId: "doel",
    anchors: [
      { key: 1, label: "1–2", text: "Leiders spreken over AI maar gebruiken het zelf niet" },
      { key: 3, label: "3–4", text: "Incidenteel voorbeeldgedrag, maar niet structureel" },
      { key: 5, label: "5–6", text: "Wisselend — sommige leiders wel, anderen niet" },
      { key: 7, label: "7–8", text: "Leiders laten regelmatig zien hoe zij AI inzetten" },
      { key: 9, label: "9–10", text: "Leiderschap en AI-gebruik zijn onlosmakelijk verbonden — inclusief openheid over onzekerheid" },
    ],
  },
  {
    id: "V12",
    title: "Ethiek & menselijke regie",
    prompt:
      "Denk aan jullie AI-gebruik: is er bewust nagedacht over waar AI wel en niet wordt ingezet, en wie de uiteindelijke beslissingen neemt?",
    quadrantId: "doel",
    anchors: [
      { key: 1, label: "1–2", text: "Geen bewuste keuzes — AI wordt gebruikt zonder kaders" },
      { key: 3, label: "3–4", text: "Incidenteel nagedacht, maar geen gedeeld beleid" },
      { key: 5, label: "5–6", text: "Er zijn enkele afspraken, maar niet iedereen kent ze" },
      { key: 7, label: "7–8", text: "Er zijn heldere kaders over verantwoord AI-gebruik" },
      { key: 9, label: "9–10", text: "Menselijke regie over AI is bewust georganiseerd en regelmatig herijkt" },
    ],
  },
];

export function getScoreLabel(value: number): string {
  if (value <= 2) return "1–2";
  if (value <= 4) return "3–4";
  if (value <= 6) return "5–6";
  if (value <= 8) return "7–8";
  return "9–10";
}

export const getAnchorForScore = (score: number, anchors: AnchorPoint[]) => {
  if (score <= 2) return anchors.find((anchor) => anchor.key === 1) ?? anchors[0];
  if (score <= 4) return anchors.find((anchor) => anchor.key === 3) ?? anchors[1];
  if (score <= 6) return anchors.find((anchor) => anchor.key === 5) ?? anchors[2];
  if (score <= 8) return anchors.find((anchor) => anchor.key === 7) ?? anchors[3];
  return anchors.find((anchor) => anchor.key === 9) ?? anchors[4];
};
