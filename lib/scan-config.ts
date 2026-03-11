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
  weetje: string;
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
    title: "Leren of vinkje?",
    prompt:
      "Denk aan hoe jullie team over AI leert: blijft het bij een eenmalige training, of is er een cultuur waarin mensen continu ontdekkingen én mislukkingen met elkaar delen?",
    quadrantId: "lef",
    anchors: [
      { key: 1, label: "1–2", text: "Er wordt niet over geleerd of gesproken. Als er al een training is geweest, was het een verplicht nummertje." },
      { key: 3, label: "3–4", text: "We hebben wel eens iets gedaan, maar in de praktijk deelt niemand ervaringen." },
      { key: 5, label: "5–6", text: "Een select groepje deelt wel eens wat, de rest kijkt toe." },
      { key: 7, label: "7–8", text: "Mensen delen proactief nieuwe toepassingen en leermomenten — ook de mislukkingen." },
      { key: 9, label: "9–10", text: "Continu experimenteren en samen leren is de standaard. Successen én blunders worden gevierd." },
    ],
    weetje: "75% van de Nederlandse MKB-ondernemers noemt gebrek aan ervaring als voornaamste reden om niet te starten met AI. Niet gebrek aan tools, niet gebrek aan budget — gebrek aan leerervaring. Één goede leercultuur is meer waard dan tien trainingen.",
  },
  {
    id: "V2",
    title: "Eerlijk durven zijn",
    prompt:
      "Denk aan de afgelopen maanden: voelden mensen de ruimte om te zeggen 'ik vind dit spannend' of 'ik ben bang dat ik achterblijf'?",
    quadrantId: "lef",
    anchors: [
      { key: 1, label: "1–2", text: "Onzekerheid over AI is een taboe. Niemand spreekt het uit." },
      { key: 3, label: "3–4", text: "Mensen doen stoer en doen alsof ze het snappen. Angst wordt weggelachen." },
      { key: 5, label: "5–6", text: "In kleine, vertrouwde groepjes wordt erover gesproken — maar nooit openlijk." },
      { key: 7, label: "7–8", text: "Er is duidelijke ruimte voor eerlijkheid over wat je wel en niet weet of aankan." },
      { key: 9, label: "9–10", text: "Twijfel en onzekerheid zijn volkomen genormaliseerd en vormen de start van goede gesprekken." },
    ],
    weetje: "In organisaties met een duidelijke AI-strategie én open communicatie ligt het gemiddelde werkgeluk op een 7,8. In organisaties zonder die veiligheid daalt dat naar een 6,2. Psychologische veiligheid is geen zachte waarde — het is een meetbaar productiviteitsverschil.",
  },
  {
    id: "V3",
    title: "Bedreiging of rugwind?",
    prompt:
      "Hoe kijken medewerkers bij jullie naar AI — als iets dat hen helpt groeien en beter worden in hun werk, of als iets dat hun positie bedreigt?",
    quadrantId: "lef",
    anchors: [
      { key: 1, label: "1–2", text: "Openlijke angst of actieve weerstand. AI voelt als een aankondiging van bezuinigingen." },
      { key: 3, label: "3–4", text: "Veel mensen zwijgen, maar de onderstroom is er: \"dit gaat uiteindelijk over onze banen.\"" },
      { key: 5, label: "5–6", text: "Wisselend beeld — enthousiaste koplopers naast mensen die liever wachten tot het overwaait." },
      { key: 7, label: "7–8", text: "De meeste mensen zien AI als iets dat hun werk interessanter of lichter maakt." },
      { key: 9, label: "9–10", text: "AI wordt breed ervaren als rugwind: mensen worden er nieuwsgieriger, scherper en vaardiger van." },
    ],
    weetje: "Een derde van de Nederlandse werknemers vreest dat AI hun baan overneemt. Opvallend: jongere medewerkers (Gen Z) zijn paradoxaal genoeg zowel de zwaarste gebruikers als de meest bezorgde groep. Angst en gebruik sluiten elkaar niet uit — ze bestaan vrolijk naast elkaar.",
  },
  {
    id: "V4",
    title: "Weten waar de winst zit",
    prompt:
      "Zijn er in jullie organisatie concrete werkprocessen aangewezen waar AI nu al — of binnenkort — echt tijd of kwaliteit verbetert?",
    quadrantId: "werkwijze",
    anchors: [
      { key: 1, label: "1–2", text: "Geen idee. We weten niet waar we zouden moeten beginnen." },
      { key: 3, label: "3–4", text: "We hebben een vaag gevoel, maar niemand heeft het ooit echt uitgezocht." },
      { key: 5, label: "5–6", text: "Er zijn ideeën, maar ze leven in hoofden — niet in een plan." },
      { key: 7, label: "7–8", text: "We hebben concrete processen benoemd én zijn al aan het uitproberen." },
      { key: 9, label: "9–10", text: "AI is al verweven in meerdere werkprocessen en we weten precies waar de volgende stap ligt." },
    ],
    weetje: "48% van de Nederlandse bedrijven heeft geen enkel AI-beleid én geen concrete use cases per team. De organisaties die wél beginnen met het benoemen van specifieke processen, komen significant sneller van experiment naar routine — het benoemen van de winst is al de helft van het werk.",
  },
  {
    id: "V5",
    title: "Routine of curiositeit?",
    prompt:
      "Denk aan een gewone werkweek: gebruiken mensen AI als vast onderdeel van hun werk, of is het nog iets wat je 'ook wel eens probeert' als je er toevallig aan denkt?",
    quadrantId: "werkwijze",
    anchors: [
      { key: 1, label: "1–2", text: "Niemand gebruikt het structureel. Hooguit één keer uitgeprobeerd en daarna vergeten." },
      { key: 3, label: "3–4", text: "Een handjevol mensen gebruikt het af en toe, maar het is geen onderdeel van hoe we werken." },
      { key: 5, label: "5–6", text: "Verspreid gebruik — sommige mensen dagelijks, de meesten sporadisch en onregelmatig." },
      { key: 7, label: "7–8", text: "Voor een groot deel van de mensen is AI een vast gereedschap geworden in hun dagelijkse werk." },
      { key: 9, label: "9–10", text: "Werken zonder AI voelt raar. Het zit in de routine zoals e-mail dat doet." },
    ],
    weetje: "Slechts 26% van de Nederlandse kenniswerkers gebruikt AI dagelijks. De andere 74% heeft het geprobeerd — maar routine is er nooit van gekomen. Het verschil zit zelden in motivatie of vaardigheid: het zit in of de omgeving het normaal maakt.",
  },
  {
    id: "V6",
    title: "Veilig en helder gebruik",
    prompt:
      "Is het voor medewerkers duidelijk wat ze wel en niet mogen doen met AI — welke tools zijn goedgekeurd, welke data veilig is, waar de grens ligt?",
    quadrantId: "werkwijze",
    anchors: [
      { key: 1, label: "1–2", text: "Het is het wilde westen. Niemand weet het en niemand vraagt ernaar." },
      { key: 3, label: "3–4", text: "Mensen maken zich zorgen, dus gebruiken ze het liever helemaal niet — uit angst voor fouten." },
      { key: 5, label: "5–6", text: "Er zijn wel wat regels, maar in de waan van de dag controleert niemand dit." },
      { key: 7, label: "7–8", text: "Er zijn heldere, werkbare richtlijnen die mensen helpen om veilig en zelfverzekerd te werken." },
      { key: 9, label: "9–10", text: "Veiligheid is geen rem maar een fundament — mensen weten precies wat kan, en waarom." },
    ],
    weetje: "52% van de Nederlandse werknemers gebruikt AI stiekem — uit angst dat het als \"valsspelen\" gezien wordt of dat ze zichzelf vervangbaar maken. Meer dan de helft. Stiekeme adoptie blokkeert het collectieve leerproces én maakt dataveiligheidsrisico's onbeheersbaar.",
  },
  {
    id: "V7",
    title: "Gefaciliteerd of scharrelend?",
    prompt:
      "Wordt het team daadwerkelijk gefaciliteerd met veilige, goedgekeurde AI-tools, of is het 'scharrel-AI': eigen gratis accounts, thuis uitproberen, officieel niks?",
    quadrantId: "individu",
    anchors: [
      { key: 1, label: "1–2", text: "Geen budget, geen licenties. Wie AI wil, regelt het privé." },
      { key: 3, label: "3–4", text: "Alleen een handjevol mensen bovenin heeft toegang tot iets goeds." },
      { key: 5, label: "5–6", text: "We vergoeden wel eens een tool als iemand erom vraagt, maar structureel beleid ontbreekt." },
      { key: 7, label: "7–8", text: "De organisatie faciliteert actief de juiste, veilige tools voor de teams die dit nodig hebben." },
      { key: 9, label: "9–10", text: "Iedereen heeft standaard toegang tot een krachtige, veilige AI-omgeving die past bij hun werk." },
    ],
    weetje: "Grote bedrijven (500+ medewerkers) gebruiken AI voor bijna 60% — bij kleine organisaties (10–20 medewerkers) is dat 18%. Het verschil zit niet in ambitie of intelligentie. Het zit grotendeels in of de organisatie actief faciliteert of het aan het individu overlaat.",
  },
  {
    id: "V8",
    title: "Trekkers op de werkvloer",
    prompt:
      "Is AI een top-down opdracht van de directie, of staan er op de werkvloer mensen op die zelf het eigenaarschap pakken en collega's meenemen?",
    quadrantId: "individu",
    anchors: [
      { key: 1, label: "1–2", text: "Niemand voelt zich verantwoordelijk. AI zweeft ergens rond zonder eigenaar." },
      { key: 3, label: "3–4", text: "Uitsluitend een push van bovenaf. De werkvloer wacht af." },
      { key: 5, label: "5–6", text: "Er is één eenzame pionier die alles probeert te trekken." },
      { key: 7, label: "7–8", text: "Op meerdere plekken in de organisatie zijn intrinsiek gemotiveerde mensen opgestaan." },
      { key: 9, label: "9–10", text: "Eigenaarschap is verspreid — elk team heeft zelf de regie over hun eigen AI-gebruik gepakt." },
    ],
    weetje: "Bijna de helft van de Nederlandse werknemers mist een AI-strategie op teamniveau — niet op directieniveau, maar op het niveau van hun eigen team. Top-down visie zonder bottom-up eigenaarschap is de meest voorkomende combinatie bij vastgelopen trajecten.",
  },
  {
    id: "V9",
    title: "De manager als brug of blokkade",
    prompt:
      "Denk aan de laag tussen directie en werkvloer: helpen teamleiders en afdelingshoofden actief mee om AI te landen, of laten ze het zweven — of erger, vriezen ze het stilletjes dood?",
    quadrantId: "individu",
    anchors: [
      { key: 1, label: "1–2", text: "Managers hebben er geen tijd voor en voelen zich er niet verantwoordelijk voor." },
      { key: 3, label: "3–4", text: "Ze sturen de e-mail van directie door en wonen de workshop bij — maar doen er privé niets mee." },
      { key: 5, label: "5–6", text: "Wisselend: een enkeling pakt het op, de rest wacht op meer duidelijkheid van boven." },
      { key: 7, label: "7–8", text: "De meeste managers begrijpen hun rol als verbinder en nemen die actief op." },
      { key: 9, label: "9–10", text: "Teamleiders zijn de drijvende kracht op de werkvloer — ze experimenteren zelf en nemen hun team mee." },
    ],
    weetje: "Het middenmanagement wordt in de onderzoeksliteratuur consequent aangewezen als de meest kritieke maar meest onderbelichte faalfactor bij AI-adoptie. Het fenomeen heet de \"frozen middle\": managers die in vergaderingen instemmen maar privé het initiatief stilletjes laten doodbloeden — niet uit sabotage, maar uit rationele zelfbescherming.",
  },
  {
    id: "V10",
    title: "Leiderschap met handen aan de knoppen",
    prompt:
      "Denk aan de leiders in jullie organisatie: praten ze alleen in theorie over AI, of zitten ze zelf ook letterlijk met hun handen aan de knoppen?",
    quadrantId: "doel",
    anchors: [
      { key: 1, label: "1–2", text: "Het management spreekt over AI op presentaties, maar heeft nog nooit zelf een prompt getypt." },
      { key: 3, label: "3–4", text: "Ze hebben het wel eens geprobeerd, maar besteden het in de praktijk toch uit aan het team." },
      { key: 5, label: "5–6", text: "Wisselend — een enkele manager pakt het echt vast, de rest blijft conceptueel praten." },
      { key: 7, label: "7–8", text: "Leiders gebruiken AI zichtbaar in hun eigen dagelijkse werk en praten er openlijk over." },
      { key: 9, label: "9–10", text: "Leiderschap toont doorlopend voorbeeldgedrag — inclusief de mislukkingen. Ze maken het normaal." },
    ],
    weetje: "Gebrek aan leiderschap en heldere communicatie over AI is de belangrijkste aanjager van angst op de werkvloer. Niet de technologie zelf, niet de snelheid van ontwikkeling — maar het uitblijven van zichtbaar voorbeeldgedrag van leidinggevenden. Mensen kijken omhoog om te bepalen of het veilig is.",
  },
  {
    id: "V11",
    title: "Van directiekamer naar werkvloer",
    prompt:
      "Als directie of MT een richting kiest voor AI, komt die keuze dan ook aan bij de mensen die het moeten uitvoeren — of is er een notitie geschreven die niemand heeft vertaald naar zijn dagelijkse werk?",
    quadrantId: "doel",
    anchors: [
      { key: 1, label: "1–2", text: "Wat directie besluit, bereikt de werkvloer nooit. Iedereen doet zijn eigen ding." },
      { key: 3, label: "3–4", text: "Er is een presentatie of notitie geweest, maar niemand weet wat die nu betekent voor morgen." },
      { key: 5, label: "5–6", text: "De richting is bekend, maar de vertaling naar concrete stappen ontbreekt." },
      { key: 7, label: "7–8", text: "Er is een duidelijke lijn van strategie naar praktijk — mensen weten wat er van hen verwacht wordt." },
      { key: 9, label: "9–10", text: "Strategie en werkvloer voeden elkaar: medewerkers voelen eigenaarschap over de richting." },
    ],
    weetje: "95% van de AI-pilots in Nederland leidt niet direct tot meetbare businessimpact — vaak niet omdat de technologie faalt, maar omdat de vertaling van visie naar operatie ontbreekt. Het plan bestaat. De brug naar de werkvloer niet.",
  },
  {
    id: "V12",
    title: "Kaders als versneller, niet als rem",
    prompt:
      "Hebben jullie richtlijnen rondom AI die mensen écht helpen, of zijn de regels zo streng en vaag dat ze leiden tot verlamming — of tot stiekem gebruik op de eigen telefoon?",
    quadrantId: "doel",
    anchors: [
      { key: 1, label: "1–2", text: "Totaal geen kaders. We doen maar wat — of we doen niks uit angst iets fout te doen." },
      { key: 3, label: "3–4", text: "IT of compliance heeft het dichtgetimmerd. Officieel mag bijna niets, dus gebeurt er niets — of alles stiekem." },
      { key: 5, label: "5–6", text: "Er is een beleidsstuk, maar niemand op de werkvloer weet wat het in de praktijk betekent." },
      { key: 7, label: "7–8", text: "Pragmatische kaders maken duidelijk waar de mens de eindbeslissing neemt — en waarom." },
      { key: 9, label: "9–10", text: "Ons beleid is een versneller: het biedt helderheid, vertrouwen en ruimte om te handelen." },
    ],
    weetje: "Een kwart van de Nederlandse scholen heeft geen enkel AI-beleid. In de zorg geldt het invoeren van patiëntdata in een publieke chatbot officieel als datalek — maar de meeste medewerkers weten dat niet. Geen kaders is geen vrijheid: het is ruis, verlamming en stiekem gedrag tegelijk.",
  },
];

export const intakeQuestion = {
  id: "intake",
  prompt: "Zijn er in jullie organisatie al AI-initiatieven geweest die veelbelovend begonnen maar nooit de dagelijkse praktijk bereikten?",
};

export const gespreksopenerQuestion = {
  id: "gespreksopener",
  prompt: "Zijn er dingen in jullie werk waarvan jullie zeggen: dat blijft van ons — dat willen we nooit aan AI overlaten, ook al zou het kunnen?",
};

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
