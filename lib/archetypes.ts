// lib/archetypes.ts
// AI Adoptie Profiel — Bureautje Aap
// Archetype classificatie op basis van het WILD-model

export type Scores = {
  lef: number;
  werkwijze: number;
  individu: number;
  doel: number;
};

export type Archetype = {
  id: string;
  naam: string;
  tagline: string;           // één zin, waarderend + scherp
  omschrijving: string;      // vier zinnen, waarderend met verbeterpunten
  risico: string;            // één zin, concreet risico
  herkenbaar: string;        // contexten/sectoren waar dit veel voorkomt
  ideaal: { s: number; p: number; st: number; m: number };
  dominantKwadrant: "s" | "p" | "st" | "m" | "geen";
  speciaal?: boolean;        // voor het 5555-archetype
};

export const archetypen: Archetype[] = [
  {
    id: "ai_native",
    naam: "De AI-Native Organisatie",
    tagline: "AI is hier geen project, maar een vanzelfsprekend onderdeel van het werk.",
    omschrijving:
      "Jullie combineren lef, proceskracht, eigenaarschap en strategische richting op hoog niveau. " +
      "Experimenteren en opschalen gaan hand in hand, zonder de menselijke maat te verliezen. " +
      "Het team leert continu en vertaalt inzichten snel naar betere werkwijzen. " +
      "De volgende stap is verfijnen: focus houden op impact in plaats van op meer tooling.",
    risico: "Overbelasting door te veel parallelle initiatieven kan focus en kwaliteit onder druk zetten.",
    herkenbaar: "Digitale koplopers, productgedreven scale-ups, innovatieve dienstverleners.",
    ideaal: { s: 8.5, p: 8.5, st: 8.5, m: 8.5 },
    dominantKwadrant: "geen",
  },
  {
    id: "strategische_koploper",
    naam: "De Strategische Koploper",
    tagline: "Jullie weten waar AI heen moet, maar de cultuur blijft nog achter.",
    omschrijving:
      "Visie, proces en eigenaarschap staan stevig en dat geeft snelheid in besluitvorming. " +
      "Toch remt beperkte psychologische veiligheid de brede adoptie in het team. " +
      "Mensen volgen de koers, maar experimenteren nog niet met volle overtuiging. " +
      "Winst ligt in het normaliseren van leren, twijfel en gedeelde fouten.",
    risico: "Top-down adoptie zonder draagvlak kan leiden tot schijnvooruitgang.",
    herkenbaar: "Sterk bestuurde organisaties met duidelijke roadmap en strakke sturing.",
    ideaal: { s: 3.5, p: 8.5, st: 8.5, m: 8.5 },
    dominantKwadrant: "p",
  },
  {
    id: "vliegende_start",
    naam: "De Vliegende Start",
    tagline: "De energie is hoog; nu de basis nog om het duurzaam te maken.",
    omschrijving:
      "Er is veel enthousiasme en eigenaarschap rond AI in jullie team. " +
      "Ook strategisch is de richting voldoende helder om meters te maken. " +
      "Wat nog ontbreekt is procesduidelijkheid en informatiehygiene voor consistente uitvoering. " +
      "Met een sterkere operationele basis kan deze energie echt renderen.",
    risico: "Veel experimenten zonder borging zorgen voor versnippering en dubbel werk.",
    herkenbaar: "Snelgroeiende teams met pioniersmentaliteit en hoge veranderbereidheid.",
    ideaal: { s: 8.5, p: 3.5, st: 8.5, m: 8.5 },
    dominantKwadrant: "s",
  },
  {
    id: "afwachtende_massa",
    naam: "De Afwachtende Massa",
    tagline: "Het potentieel is groot, maar eigenaarschap blijft nog te smal.",
    omschrijving:
      "Jullie hebben cultuur, proces en strategische richting redelijk op orde. " +
      "Toch blijft AI-adoptie hangen omdat individueel initiatief en trekkerschap ontbreken. " +
      "Mensen wachten op elkaar of op expliciete opdracht voordat ze stappen zetten. " +
      "Zodra eigenaarschap breder wordt, kan het tempo snel omhoog.",
    risico: "Goede voorwaarden zonder persoonlijk initiatief leiden tot stilstand.",
    herkenbaar: "Grotere teams waar veel mogelijk is, maar weinig expliciet belegd.",
    ideaal: { s: 8.5, p: 8.5, st: 3.5, m: 8.5 },
    dominantKwadrant: "s",
  },
  {
    id: "koplopers_zonder_kompas",
    naam: "Koplopers Zonder Kompas",
    tagline: "Jullie kunnen veel, maar missen een gedeeld strategisch anker.",
    omschrijving:
      "Lef, proces en individueel eigenaarschap zijn sterk aanwezig in het team. " +
      "Daardoor gebeurt er veel, vaak met indrukwekkende snelheid. " +
      "Zonder duidelijke strategische kaders blijft impact echter versnipperd en lastig schaalbaar. " +
      "Een heldere koers maakt van losse successen een duurzaam voordeel.",
    risico: "Lokale optimalisatie zonder richting veroorzaakt strategische ruis.",
    herkenbaar: "Innovatieve teams met veel initiatief maar beperkte governance.",
    ideaal: { s: 8.5, p: 8.5, st: 8.5, m: 3.5 },
    dominantKwadrant: "st",
  },
  {
    id: "ai_oase",
    naam: "De AI-Oase",
    tagline: "Een prettige AI-cultuur, maar nog weinig scherpte op koers en eigenaarschap.",
    omschrijving:
      "De samenwerking en werkwijze bieden een veilige basis om met AI te werken. " +
      "Toch ontbreken duidelijke trekkers en strategische prioriteiten. " +
      "Daardoor voelt AI bruikbaar, maar blijft de doorontwikkeling beperkt. " +
      "Gerichte keuzes in eigenaarschap en doel maken het verschil.",
    risico: "Comfort zonder richting houdt de organisatie in pilotstand.",
    herkenbaar: "Teams met gezonde cultuur die nog zoeken naar strategische focus.",
    ideaal: { s: 8.5, p: 8.5, st: 3.5, m: 3.5 },
    dominantKwadrant: "s",
  },
  {
    id: "bevlogen_hobbyist",
    naam: "De Bevlogen Hobbyist",
    tagline: "Enthousiasme genoeg, maar de basis voor opschaling ontbreekt nog.",
    omschrijving:
      "Mensen in jullie team zijn nieuwsgierig en pakken AI proactief op. " +
      "Dat levert waardevolle initiatieven en veel leerervaringen op. " +
      "Zonder stabiele processen en strategische kaders blijft het echter afhankelijk van individuen. " +
      "Met meer structuur wordt dit enthousiasme direct effectiever.",
    risico: "Persoonlijke experimenten zonder borging blijven los zand.",
    herkenbaar: "Kleine teams met veel initiatief en beperkte procesvolwassenheid.",
    ideaal: { s: 8.5, p: 3.5, st: 8.5, m: 3.5 },
    dominantKwadrant: "s",
  },
  {
    id: "veilige_verkenner",
    naam: "De Veilige Verkenner",
    tagline: "Jullie verkennen AI zorgvuldig, met richting maar nog weinig uitvoering.",
    omschrijving:
      "Er is een veilige cultuur en een duidelijke strategische intentie rond AI. " +
      "Tegelijk blijven werkwijze en individueel eigenaarschap achter in het dagelijks werk. " +
      "Dat maakt de ambitie geloofwaardig, maar de impact nog beperkt. " +
      "Door concrete routines en trekkers te organiseren ontstaat momentum.",
    risico: "Lang verkennen zonder implementatie verlaagt geloofwaardigheid intern.",
    herkenbaar: "Organisaties met duidelijke visie die operationeel nog opstarten.",
    ideaal: { s: 8.5, p: 3.5, st: 3.5, m: 8.5 },
    dominantKwadrant: "m",
  },
  {
    id: "gereedschapskist",
    naam: "De Gereedschapskist",
    tagline: "Jullie hebben de tools en routines, maar AI leeft nog te weinig in de cultuur.",
    omschrijving:
      "Processen, tooling en eigenaarschap staan sterk en geven houvast. " +
      "Toch blijft adoptie soms technisch in plaats van menselijk gedragen. " +
      "Als onzekerheid of weerstand weinig ruimte krijgt, blijft gebruik oppervlakkig. " +
      "Meer aandacht voor lef en leerveiligheid vergroot blijvende adoptie.",
    risico: "Technische implementatie zonder cultuurverandering blijft fragiel.",
    herkenbaar: "Operationeel sterke organisaties met volwassen procesinrichting.",
    ideaal: { s: 3.5, p: 8.5, st: 8.5, m: 3.5 },
    dominantKwadrant: "p",
  },
  {
    id: "we_zien_een_kans",
    naam: "We Zien een Kans, Wat Nu",
    tagline: "De wil en de richting zijn er, maar de uitvoer en borging nog niet.",
    omschrijving:
      "Strategische ambitie en persoonlijke motivatie zijn aanwezig in jullie team. " +
      "Daardoor is er potentie voor snelle groei in AI-gereedheid. " +
      "Wat nu ontbreekt is proceshouvast en een cultuur die experimenteren ondersteunt. " +
      "Eerst basisafspraken, dan versnellen: dat voorkomt terugval.",
    risico: "Ambitie zonder structuur leidt tot teleurstelling en energieverlies.",
    herkenbaar: "Teams met duidelijke intentie die nog geen werkende routine hebben.",
    ideaal: { s: 3.5, p: 3.5, st: 8.5, m: 8.5 },
    dominantKwadrant: "st",
  },
  {
    id: "plan_in_de_la",
    naam: "Het Plan in de La",
    tagline: "Er is structuur, maar AI mist nog eigenaarschap en strategische urgentie.",
    omschrijving:
      "Jullie processen zijn redelijk op orde en dat is een belangrijk fundament. " +
      "Toch ontbreekt persoonlijke drive en een heldere organisatiebrede AI-koers. " +
      "Daardoor blijven plannen vaak hangen in documenten en losse initiatieven. " +
      "Een duidelijke keuze met zichtbare trekkers brengt het plan in beweging.",
    risico: "Goede voorbereidingen zonder uitvoering zorgen voor verandermoeheid.",
    herkenbaar: "Procesgerichte organisaties met veel plannen en beperkte implementatiekracht.",
    ideaal: { s: 3.5, p: 8.5, st: 3.5, m: 3.5 },
    dominantKwadrant: "p",
  },
  {
    id: "de_zin_is_er",
    naam: "De Zin is er",
    tagline: "De cultuur wil vooruit, maar de rest van het systeem haakt nog niet aan.",
    omschrijving:
      "Er is zichtbaar lef en bereidheid om te leren in jullie team. " +
      "Dat is een sterke start voor duurzame AI-adoptie. " +
      "Tegelijk ontbreken heldere processen, eigenaarschap en strategische verankering. " +
      "Met meer structuur en richting kan de energie echt gaan renderen.",
    risico: "Enthousiasme zonder systeem leidt tot losse pieken zonder doorbraak.",
    herkenbaar: "Betrokken teams met pioniersenergie en weinig organisatorische steun.",
    ideaal: { s: 8.5, p: 3.5, st: 3.5, m: 3.5 },
    dominantKwadrant: "s",
  },
  {
    id: "slapende_reus",
    naam: "De Slapende Reus",
    tagline: "De basis is aanwezig, maar het eigenaarschap en doelgevoel blijven te laag.",
    omschrijving:
      "Procesmatig is er voldoende kracht om AI volwassen toe te passen. " +
      "Toch blijft de organisatie traag doordat initiatief en strategisch verhaal ontbreken. " +
      "Mensen weten vaak hoe het zou kunnen, maar voelen niet dat het nu moet. " +
      "Met expliciet leiderschap en heldere prioriteit komt deze reus in beweging.",
    risico: "Onderbenutting van potentieel terwijl concurrenten versnellen.",
    herkenbaar: "Grotere organisaties met veel capaciteit maar weinig urgentiegevoel.",
    ideaal: { s: 3.5, p: 8.5, st: 3.5, m: 3.5 },
    dominantKwadrant: "p",
  },
  {
    id: "eenzame_strateeg",
    naam: "De Eenzame Strateeg",
    tagline: "Er is een duidelijke denklijn, maar het team beweegt nog niet mee.",
    omschrijving:
      "Iemand of een kleine groep heeft een scherp beeld van AI-richting. " +
      "De rest van de organisatie mist echter de context, ruimte of ondersteuning om aan te haken. " +
      "Daardoor blijft vooruitgang afhankelijk van enkele kartrekkers. " +
      "Breder eigenaarschap en praktische vertaling zijn hier cruciaal.",
    risico: "Afhankelijkheid van een paar voortrekkers maakt de koers kwetsbaar.",
    herkenbaar: "Organisaties met sterk strategisch leiderschap en beperkte adoptie op de vloer.",
    ideaal: { s: 3.5, p: 3.5, st: 8.5, m: 3.5 },
    dominantKwadrant: "st",
  },
  {
    id: "papieren_visie",
    naam: "De Papieren Visie",
    tagline: "De AI-ambitie staat op papier, maar leeft nog nauwelijks in de praktijk.",
    omschrijving:
      "Strategisch is er aandacht voor AI en dat geeft richting op hoofdlijnen. " +
      "Toch ontbreken de cultuur, processen en eigenaarschap om het uit te voeren. " +
      "Daardoor blijft AI vooral een beleidsverhaal zonder zichtbaar effect. " +
      "Kleine, concrete pilots met duidelijke rollen kunnen dit doorbreken.",
    risico: "Visiedocumenten zonder praktijkresultaat ondermijnen vertrouwen.",
    herkenbaar: "Organisaties met sterke beleidsfunctie en beperkte implementatiestructuur.",
    ideaal: { s: 3.5, p: 3.5, st: 3.5, m: 8.5 },
    dominantKwadrant: "m",
  },
  {
    id: "digitale_woestijn",
    naam: "De Digitale Woestijn",
    tagline: "AI-adoptie staat nog vrijwel stil; dit vraagt om een heldere herstart.",
    omschrijving:
      "Lef, werkwijze, eigenaarschap en strategie scoren allemaal laag. " +
      "Dat wijst op een organisatie die vooral reactief bezig is met dagelijkse drukte. " +
      "Zonder gerichte interventie blijft AI iets van later, terwijl de omgeving versnelt. " +
      "Begin klein en concreet, met een haalbaar doel en een zichtbaar eerste succes.",
    risico: "Langdurige stilstand vergroot de afstand tot markt en medewerkers.",
    herkenbaar: "Teams onder hoge operationele druk zonder duidelijke AI-koers.",
    ideaal: { s: 3.5, p: 3.5, st: 3.5, m: 3.5 },
    dominantKwadrant: "geen",
  },
  {
    id: "zoekende_organisatie",
    naam: "De Zoekende Organisatie",
    tagline: "Jullie zitten in het midden: er gebeurt iets, maar nog zonder duidelijke lijn.",
    omschrijving:
      "Dit profiel past bij teams die AI serieus nemen, maar nog zoekend zijn in ritme en richting. " +
      "Er zijn signalen van potentie in alle domeinen, zonder uitgesproken koploperschap. " +
      "Dat is geen zwakte: het is vaak de natuurlijke fase voor de doorbraak. " +
      "De sleutel is kiezen waar je als eerste bewust op wilt versnellen.",
    risico: "Te lang in de verkenfase blijven houdt de opbrengst laag.",
    herkenbaar: "Organisaties in transitie die stappen zetten maar nog geen vaste vorm hebben.",
    ideaal: { s: 5.0, p: 5.0, st: 5.0, m: 5.0 },
    dominantKwadrant: "geen",
    speciaal: true,
  },
];

// ─── GEWICHTEN ────────────────────────────────────────────────────────────────
// Strategie weegt zwaarder: zonder basis op orde ondermijnt het alles
const gewichten = { s: 1.0, p: 1.0, st: 1.2, m: 1.0 };

// ─── CLASSIFICATIE FUNCTIE ────────────────────────────────────────────────────
// rawScores: optioneel — de 12 individuele antwoorden vóór middeling.
// Als alle 12 exact 5 zijn, is de scan waarschijnlijk niet serieus ingevuld.
// Het Solide Middenveld-archetype wint gewoon op afstand als gemiddelden ~5 zijn;
// isDefaultIngevuld is puur een UI-signaal, geen archetype-override.
export function bepaalArchetype(
  scores: Scores,
  rawScores?: number[]
): {
  beste: Archetype;
  runner1: Archetype;
  runner2: Archetype;
  zekerheid: number;
  isDefaultIngevuld: boolean;
} {
  // Detecteer of élke individuele vraag op exact 5 is blijven staan
  const isDefaultIngevuld = rawScores
    ? rawScores.every(s => s === 5)
    : false;

  const invoer = {
    s:  scores.lef,
    p:  scores.werkwijze,
    st: scores.individu,
    m:  scores.doel,
  };

  // Alle archetypen doen mee — Solide Middenveld wint vanzelf bij ~5 scores
  const resultaten = archetypen.map(archetype => {
    const afstand = Math.sqrt(
      gewichten.s  * Math.pow(invoer.s  - archetype.ideaal.s,  2) +
      gewichten.p  * Math.pow(invoer.p  - archetype.ideaal.p,  2) +
      gewichten.st * Math.pow(invoer.st - archetype.ideaal.st, 2) +
      gewichten.m  * Math.pow(invoer.m  - archetype.ideaal.m,  2)
    );
    return { ...archetype, afstand };
  });

  // Sorteer op afstand — kleinste = beste match
  resultaten.sort((a, b) => a.afstand - b.afstand);

  // Zekerheidspercentage: hoe groter het verschil tussen #1 en #2, hoe zekerder
  const zekerheid = Math.min(100, Math.round(
    ((resultaten[1].afstand - resultaten[0].afstand) / resultaten[1].afstand) * 200
  ));

  return {
    beste:    resultaten[0],
    runner1:  resultaten[1],
    runner2:  resultaten[2],
    zekerheid,
    isDefaultIngevuld,
  };
}