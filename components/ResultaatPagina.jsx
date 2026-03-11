"use client";

import Image from "next/image";
import Logo from "@/components/Logo";
import emailjs from "@emailjs/browser";
import { useState, useEffect, useRef } from "react";
import { bepaalArchetype } from "@/lib/archetypes";
import { encodeAnswersToV, encodeIntakeAnswer } from "@/lib/report-url";
import { kwadrantLabels, rapportCopy, vraagLabels } from "@/lib/copy";

const EMAILJS_SERVICE_ID = (process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "VERVANG_MET_BUREAUTJEAAP_EMAILJS_KEY").trim();
const EMAILJS_USER_TEMPLATE_ID = (process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_USER ?? "VERVANG_MET_BUREAUTJEAAP_EMAILJS_KEY").trim();
const EMAILJS_ADMIN_TEMPLATE_ID = (process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_ADMIN ?? "VERVANG_MET_BUREAUTJEAAP_EMAILJS_KEY").trim();
const EMAILJS_PUBLIC_KEY = (process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "VERVANG_MET_BUREAUTJEAAP_EMAILJS_KEY").trim();
const ADMIN_EMAIL = (process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? "VERVANG_MET_BUREAUTJEAAP_EMAILJS_KEY").trim();

/* Bureautje Aap huisstijl */
const accent = "#C8F5C8";
const kwadrantKleuren = {
  lef: "#2D7A3A",
  werkwijze: "#1A4D2E",
  individu: "#7BC47F",
  doel: "#111111",
};

const defaultScores = {
  lef: { label: kwadrantLabels.lef, score: 0, vragen: [0, 0, 0] },
  werkwijze: { label: kwadrantLabels.werkwijze, score: 0, vragen: [0, 0, 0] },
  individu: { label: kwadrantLabels.individu, score: 0, vragen: [0, 0, 0] },
  doel: { label: kwadrantLabels.doel, score: 0, vragen: [0, 0, 0] },
};
/**
 * @typedef {{
 * lef: { label: string, score: number, vragen: number[] },
 * werkwijze: { label: string, score: number, vragen: number[] },
 * individu: { label: string, score: number, vragen: number[] },
 * doel: { label: string, score: number, vragen: number[] },
 * }} ResultaatScores
 */

const kwadrantVraagStart = {
  lef: 1,
  werkwijze: 4,
  individu: 7,
  doel: 10,
};

const vraagTitels = [
  "Leren of vinkje?",
  "Eerlijk durven zijn",
  "Bedreiging of rugwind?",
  "Weten waar de winst zit",
  "Routine of curiositeit?",
  "Veilig en helder gebruik",
  "Gefaciliteerd of scharrelend?",
  "Trekkers op de werkvloer",
  "De manager als brug of blokkade",
  "Leiderschap met handen aan de knoppen",
  "Van directiekamer naar werkvloer",
  "Kaders als versneller, niet als rem",
];

const archetypeTips = {
  ai_native: { titel: "Schaal met kaders", tip: "Kies 1-2 bewezen AI-routines en maak ze organisatiebreed standaard met duidelijke kwaliteitseisen.", bron: "WILD-actie 1" },
  strategische_koploper: { titel: "Maak leren zichtbaar", tip: "Plan vaste demo-momenten waarin teams ook AI-mislukkingen delen als leermoment.", bron: "WILD-actie 2" },
  vliegende_start: { titel: "Borg je aanpak", tip: "Leg succesvolle experimenten meteen vast in werkafspraken zodat kennis niet bij personen blijft hangen.", bron: "WILD-actie 3" },
  afwachtende_massa: { titel: "Activeer eigenaarschap", tip: "Wijs per team een AI-trekker aan met mandaat, tijd en een heldere opdracht.", bron: "WILD-actie 4" },
  koplopers_zonder_kompas: { titel: "Scherp je koers", tip: "Vertaal de AI-visie naar 3 concrete organisatiedoelen en stop initiatieven die daar niet aan bijdragen.", bron: "WILD-actie 5" },
  ai_oase: { titel: "Van prettig naar productief", tip: "Kies een gezamenlijk AI-doel voor de komende 30 dagen en monitor wekelijks de voortgang.", bron: "WILD-actie 6" },
  bevlogen_hobbyist: { titel: "Van hobby naar routine", tip: "Maak een eenvoudige playbook met top-5 prompts, tools en afspraken voor dagelijks gebruik.", bron: "WILD-actie 7" },
  veilige_verkenner: { titel: "Van verkennen naar doen", tip: "Reserveer structureel tijd in de week voor AI-implementatie, niet alleen voor oriëntatie.", bron: "WILD-actie 8" },
  gereedschapskist: { titel: "Werk aan cultuur", tip: "Introduceer een maandelijkse AI-check-in: wat werkte, wat niet, en wat leren we als team?", bron: "WILD-actie 9" },
  we_zien_een_kans: { titel: "Maak het concreet", tip: "Kies één proces met hoge impact en ontwerp daar een eerste AI-workflow met duidelijke eigenaar.", bron: "WILD-actie 10" },
  plan_in_de_la: { titel: "Breng plan tot leven", tip: "Converteer je AI-plan naar 3 concrete sprintacties met deadline, eigenaar en meetpunt.", bron: "WILD-actie 11" },
  de_zin_is_er: { titel: "Geef richting", tip: "Koppel teamenergie aan een heldere AI-prioriteit en bewaak elke week wat wel en niet start.", bron: "WILD-actie 12" },
  slapende_reus: { titel: "Wek het momentum", tip: "Maak succes zichtbaar met een kort intern showcase-moment rond één werkend AI-resultaat.", bron: "WILD-actie 13" },
  eenzame_strateeg: { titel: "Verdeel leiderschap", tip: "Bouw een AI-kernteam met vertegenwoordigers uit meerdere teams in plaats van één kartrekker.", bron: "WILD-actie 14" },
  papieren_visie: { titel: "Van visie naar gedrag", tip: "Vraag leiders wekelijks één concreet voorbeeld te delen van hun eigen AI-gebruik.", bron: "WILD-actie 15" },
  digitale_woestijn: { titel: "Begin klein", tip: "Start met één laagdrempelige use case die binnen twee weken zichtbaar waarde oplevert.", bron: "WILD-actie 16" },
  zoekende_organisatie: { titel: "Kies focus", tip: "Bepaal welk WILD-domein nu het meest remt en zet daar 30 dagen lang gericht op in.", bron: "WILD-actie 17" },
};

function gemiddelde(scores) {
  return Object.values(scores).reduce((s, k) => s + k.score, 0) / Object.keys(scores).length;
}

function sterksteKwadrant(scores) {
  return Object.entries(scores).sort((a, b) => b[1].score - a[1].score)[0];
}

function zwaksteKwadrant(scores) {
  return Object.entries(scores).sort((a, b) => a[1].score - b[1].score)[0];
}

function verrassingKwadrant(scores) {
  const gem = gemiddelde(scores);
  return Object.entries(scores).sort((a, b) => Math.abs(b[1].score - gem) - Math.abs(a[1].score - gem))[1];
}

function scoreLabel(score) {
  if (score >= 8.5) return { label: "Sterk", color: "#2D7A3A", icon: "✓" };
  if (score >= 7) return { label: "Goed", color: "#2D7A3A" };
  if (score >= 5) return { label: "In ontwikkeling", color: "#C87F2A" };
  if (score >= 3) return { label: "Vraagt aandacht", color: "#B03A2E" };
  return { label: "Urgent", color: "#B03A2E" };
}

function scoreWoordKleur(label) {
  if (label === "Urgent" || label === "Vraagt aandacht") return "#E57373";
  if (label === "In ontwikkeling") return "#FFB74D";
  if (label === "Goed") return "#81C784";
  if (label === "Sterk") return "#2D7A3A";
  return "#888888";
}

const tips = {
  lef: {
    kort: "Lef en leerveiligheid versnellen AI-adoptie.",
    lang: "Teams die hoog scoren op Lef & Cultuur durven te experimenteren en delen openlijk wat niet werkt. Dat versnelt leren en verlaagt weerstand.",
    actie: "Plan elke week een kort AI-leermoment: wat werkte, wat niet, wat doen we anders?",
  },
  werkwijze: {
    kort: "AI wordt pas schaalbaar met heldere processen en informatie.",
    lang: "Bij lagere scores op Werkwijze & Proces zien we vaak veel losse pogingen, maar weinig herhaalbaarheid. Procesduidelijkheid en datahygiene maken het verschil.",
    actie: "Kies één kernproces en beschrijf expliciet waar AI wel en niet in zit.",
  },
  individu: {
    kort: "Eigenaarschap maakt AI van idee naar gedrag.",
    lang: "Hoge scores op Individu & Eigenaarschap betekenen dat mensen zelf initiatief nemen en anderen meenemen. Zonder trekkers blijft adoptie vaak abstract.",
    actie: "Wijs per team een AI-trekker aan met tijd, mandaat en heldere doelen.",
  },
  doel: {
    kort: "AI-impact groeit als koers, leiderschap en regie samenkomen.",
    lang: "Teams met sterke scores op Doel & Strategie koppelen AI aan organisatiedoelen en houden menselijke regie expliciet vast.",
    actie: "Formuleer drie AI-principes voor verantwoord gebruik en bespreek ze maandelijks.",
  },
};

const watSpeeltPerVraag = {
  1: {
    laag: "Experimenteerruimte is nog beperkt, maar juist dat maakt dit een kansrijk startpunt voor AI-adoptie.",
    midden: "Experimenteerruimte is aanwezig: AI wordt al geprobeerd, maar nog niet overal gedeeld.",
    hoog: "Experimenteerruimte is jullie sterkste punt: AI-leren door proberen zit duidelijk in de cultuur.",
  },
  2: {
    laag: "Bereidheid tot verandering vraagt aandacht, maar met kleine successen kan dit snel kantelen.",
    midden: "Bereidheid tot verandering is redelijk: het team beweegt mee, maar nog niet iedereen even snel.",
    hoog: "Bereidheid tot verandering is een duidelijk sterk punt: nieuwe AI-tools worden actief omarmd.",
  },
  3: {
    laag: "Psychologische veiligheid rond AI is nog fragiel, maar biedt een directe groeikans.",
    midden: "Psychologische veiligheid rond AI groeit: twijfel en vragen krijgen steeds vaker ruimte.",
    hoog: "Psychologische veiligheid rond AI is jullie sterkste punt: mensen durven open te leren.",
  },
  4: {
    laag: "Procesduidelijkheid is nog een uitdaging, maar dit is een kansrijk fundament voor AI.",
    midden: "Procesduidelijkheid is redelijk: er is basisstructuur, maar nog niet overal consistent.",
    hoog: "Procesduidelijkheid is jullie sterkste punt: jullie processen zijn klaar om AI op te schalen.",
  },
  5: {
    laag: "Basiskennis en tooling zijn nog beperkt, maar met gerichte training snel te versterken.",
    midden: "Basiskennis en tooling zijn aanwezig: AI-gebruik gebeurt al, nog niet structureel.",
    hoog: "Basiskennis en tooling zijn jullie sterkste punt: AI-gebruik is zichtbaar ingebed in de praktijk.",
  },
  6: {
    laag: "Data- en informatiehygiene is nog een knelpunt, maar een cruciale kans om AI bruikbaar te maken.",
    midden: "Data- en informatiehygiene is redelijk op orde, met nog enkele gaten in kwaliteit en toegankelijkheid.",
    hoog: "Data- en informatiehygiene is jullie sterkste punt: de informatiebasis ondersteunt slimme AI-toepassing.",
  },
  7: {
    laag: "Intrinsieke motivatie voor AI is nog laag, maar met concrete successen kan dit snel groeien.",
    midden: "Intrinsieke motivatie is aanwezig: een deel van het team pakt AI al vanuit eigen initiatief op.",
    hoog: "Intrinsieke motivatie is jullie sterkste punt: mensen verkennen AI proactief en met eigenaarschap.",
  },
  8: {
    laag: "Eigenaarschap en trekkers ontbreken nog, maar dit is een directe hefboom voor versnelling.",
    midden: "Eigenaarschap en trekkers zijn zichtbaar, maar nog afhankelijk van enkele personen.",
    hoog: "Eigenaarschap en trekkers zijn jullie sterkste punt: AI-initiatief is breed en zelforganiserend.",
  },
  9: {
    laag: "Capaciteit en ruimte zijn nog beperkt, maar met bewuste tijdsblokken ontstaat snel beweging.",
    midden: "Capaciteit en ruimte zijn aanwezig, alleen nog niet structureel genoeg geborgd.",
    hoog: "Capaciteit en ruimte zijn jullie sterkste punt: AI-ontwikkeling heeft een vaste plek in het werkritme.",
  },
  10: {
    laag: "Strategische visie op AI is nog vaag, maar dit is een kansrijk startpunt voor focus.",
    midden: "Strategische visie op AI is in ontwikkeling: richting is aanwezig, nog niet overal gedeeld.",
    hoog: "Strategische visie op AI is jullie sterkste punt: koers en organisatiedoelen zijn duidelijk verbonden.",
  },
  11: {
    laag: "Leiderschap en voorbeeldgedrag rond AI zijn nog beperkt, maar hebben veel hefboomwerking.",
    midden: "Leiderschap en voorbeeldgedrag zijn zichtbaar, nog niet overal consistent.",
    hoog: "Leiderschap en voorbeeldgedrag zijn jullie sterkste punt: het management zet de toon in AI-gebruik.",
  },
  12: {
    laag: "Ethiek en menselijke regie zijn nog onduidelijk, maar essentieel om AI verantwoord te schalen.",
    midden: "Ethiek en menselijke regie zijn in opbouw: er zijn afspraken, nog niet overal bekend.",
    hoog: "Ethiek en menselijke regie zijn jullie sterkste punt: verantwoord AI-gebruik is bewust georganiseerd.",
  },
};

function contextZin(varianten, kwadrantScore) {
  if (kwadrantScore <= 4) return varianten.laag;
  if (kwadrantScore <= 7) return varianten.midden;
  return varianten.hoog;
}

function vraagNummerMetHoogsteScore(kwadrant, vragen) {
  const start = kwadrantVraagStart[kwadrant];
  const hoogsteScore = Math.max(...vragen);
  const indexBinnenKwadrant = vragen.findIndex((v) => v === hoogsteScore);
  const vraagNummer = start + Math.max(indexBinnenKwadrant, 0);
  return { vraagNummer, hoogsteScore };
}

function watSpeeltHierVoorKwadrant(kwadrant, vragen, kwadrantScore) {
  const { vraagNummer, hoogsteScore } = vraagNummerMetHoogsteScore(kwadrant, vragen);
  const varianten = watSpeeltPerVraag[vraagNummer];
  if (!varianten) return "Dit thema is kansrijk om verder te versterken in jullie volgende teamweek.";
  return contextZin(varianten, hoogsteScore ?? kwadrantScore);
}

function WILDWiel({ scores, size = 280, animated = true }) {
  const [progress, setProgress] = useState(animated ? 0 : 1);
  useEffect(() => {
    if (!animated) return;
    let start = null;
    const duration = 1200;
    function step(ts) {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setProgress(p < 1 ? p * p * (3 - 2 * p) : 1);
      if (p < 1) requestAnimationFrame(step);
    }
    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [animated]);

  const cx = size / 2;
  const cy = size / 2;
  const maxR = size * 0.38;
  const gridRadii = [0.25, 0.5, 0.75, 1];

  const kwadranten = [
    { key: "doel", label: "Doel &\nStrategie", angle: -45 },
    { key: "individu", label: "Individu &\nEigenaarschap", angle: 45 },
    { key: "werkwijze", label: "Werkwijze &\nProces", angle: 135 },
    { key: "lef", label: "Lef &\nCultuur", angle: -135 },
  ];

  function polarToXY(angle, r) {
    const rad = ((angle - 90) * Math.PI) / 180;
    return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
  }

  const polygonPoints = kwadranten.map(({ key, angle }) => {
    const r = (scores[key].score / 10) * maxR * progress;
    return polarToXY(angle, r);
  });

  const polygonPath =
    polygonPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ") +
    " Z";

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={maxR} fill="rgba(45, 122, 58, 0.15)" />
      <circle cx={cx} cy={cy} r={maxR * 0.7} fill="rgba(26, 77, 46, 0.12)" />
      <circle cx={cx} cy={cy} r={maxR * 0.4} fill="rgba(200, 245, 200, 0.08)" />
      {gridRadii.map((f, i) => (
        <circle key={i} cx={cx} cy={cy} r={maxR * f} fill="none" stroke="#2A2A2A" strokeWidth={1.2} strokeDasharray="3 2" />
      ))}
      {kwadranten.map(({ angle }, i) => {
        const [x, y] = polarToXY(angle, maxR);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#2A2A2A" strokeWidth={1.4} />;
      })}
      <path d={polygonPath} fill="#2D7A3A" fillOpacity={0.15} stroke="#2D7A3A" strokeWidth={2} strokeLinejoin="round" />
      {kwadranten.map(({ key, angle }, i) => {
        const r = (scores[key].score / 10) * maxR * progress;
        const [x, y] = polarToXY(angle, r);
        const kleur = kwadrantKleuren[key];
        return <circle key={i} cx={x} cy={y} r={5} fill={kleur} stroke="white" strokeWidth={2} />;
      })}
      {kwadranten.map(({ key, label, angle }) => {
        const [x, y] = polarToXY(angle, maxR + 24);
        const kleur = kwadrantKleuren[key];
        const lines = label.split("\n");
        const anchor = x < cx - 5 ? "end" : x > cx + 5 ? "start" : "middle";
        return (
          <text key={key} x={x} y={y - (lines.length - 1) * 6} textAnchor={anchor} fontSize={9} fontFamily="Inter, sans-serif" fontWeight="600" fill={kleur} letterSpacing="0.3">
            {lines.map((l, i) => (
              <tspan key={i} x={x} dy={i === 0 ? 0 : 13}>
                {l}
              </tspan>
            ))}
          </text>
        );
      })}
      <circle cx={cx} cy={cy} r={3} fill="#2D7A3A" />
    </svg>
  );
}

function ScoreBalk({ score, kleur, animated = true }) {
  const [w, setW] = useState(animated ? 0 : score * 10);
  useEffect(() => {
    if (!animated) return;
    const t = setTimeout(() => setW(score * 10), 200);
    return () => clearTimeout(t);
  }, [score, animated]);

  return (
    <div className="relative h-2 bg-[#1A4D2E] rounded-full overflow-hidden">
      <div className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ease-out" style={{ width: `${w}%`, background: kleur }} />
    </div>
  );
}

function SignaalKaart({ type, titel, tekst, kleur, icon }) {
  return (
    <div className="rounded-lg p-5 flex gap-4 items-start" style={{ background: "#1A1A1A", borderLeft: `4px solid ${kleur}`, boxShadow: "0 2px 12px rgba(0,0,0,0.4)" }}>
      <div className="text-2xl flex-shrink-0 mt-0.5">{icon}</div>
      <div>
        <div className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: accent }}>
          {type}
        </div>
        <div className="font-bold text-white mb-1 text-sm leading-snug" style={{ fontFamily: "var(--font-heading), 'Alfa Slab One', serif" }}>
          {titel}
        </div>
        <div className="text-white/80 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body), Inter, sans-serif" }}>{tekst}</div>
      </div>
    </div>
  );
}

function RapportSectie({ kwadrant, data }) {
  const kleur = kwadrantKleuren[kwadrant];
  const tip = tips[kwadrant];
  const sl = scoreLabel(data.score);
  const watSpeeltHier = watSpeeltHierVoorKwadrant(kwadrant, data.vragen, data.score);
  const { vraagNummer, hoogsteScore } = vraagNummerMetHoogsteScore(kwadrant, data.vragen);
  const hoogsteVraagLabel = vraagLabels[`V${vraagNummer}`] ?? `Vraag ${vraagNummer}`;

  const slKleur = scoreWoordKleur(sl.label);
  return (
    <div className="mb-8 rounded-lg overflow-hidden" style={{ background: "#1A1A1A", borderLeft: `4px solid ${kleur}`, boxShadow: "0 2px 12px rgba(0,0,0,0.4)" }}>
      <div className="flex items-center justify-between px-6 py-4" style={{ background: kleur }}>
        <div>
          <div className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-1" style={{ fontFamily: "var(--font-body), Inter, sans-serif" }}>WILD-model</div>
          <div className="text-white font-bold text-lg leading-tight" style={{ fontFamily: "var(--font-heading), 'Alfa Slab One', serif" }}>
            {data.label}
          </div>
        </div>
        <div className="text-right">
          <div className="text-white text-3xl font-black" style={{ fontFamily: "var(--font-heading), 'Alfa Slab One', serif" }}>
            {data.score.toFixed(1)}
          </div>
          <div className="text-white/80 text-xs font-medium" style={{ color: slKleur }}>{sl.label}</div>
        </div>
      </div>

      <div className="px-6 py-5" style={{ background: "#1A1A1A" }}>
        <div className="mb-5">
          <div className="text-xs text-white/60 font-semibold uppercase tracking-wider mb-3" style={{ fontFamily: "var(--font-body), Inter, sans-serif" }}>Scores per vraag</div>
          <div className="space-y-2">
            {data.vragen.map((v, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xs text-white/70 w-44 flex-shrink-0" style={{ fontFamily: "var(--font-body), Inter, sans-serif" }}>{vraagLabels[`V${kwadrantVraagStart[kwadrant] + i}`]}</span>
                <div className="flex-1">
                  <ScoreBalk score={v} kleur={kleur} />
                </div>
                <span className="text-sm font-bold w-6 text-right" style={{ color: kleur }}>
                  {v}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg p-4 mb-4 border border-[#2A2A2A]">
          <div className="text-sm font-bold mb-2 italic" style={{ color: accent, fontFamily: "var(--font-heading), 'Alfa Slab One', serif" }}>
            &quot;{tip.kort}&quot;
          </div>
          <p className="text-white/80 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body), Inter, sans-serif" }}>{tip.lang}</p>
        </div>

        <div className="flex gap-3 items-start">
          <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold mt-0.5" style={{ background: kleur }}>
            →
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-white/60 mb-1" style={{ fontFamily: "var(--font-body), Inter, sans-serif" }}>Wat speelt hier</div>
            <p className="text-white/90 text-sm font-medium" style={{ fontFamily: "var(--font-body), Inter, sans-serif" }}>{watSpeeltHier}</p>
            <p className="mt-2 text-xs text-white/60">
              De hoogste score binnen dit kwadrant: {hoogsteVraagLabel} ({hoogsteScore})
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * @param {{ scores?: ResultaatScores | null, naam?: string, email?: string, answers?: number[], intakeAnswer?: "ja" | "nee" | "deels" | null, gespreksopener?: string, skipLead?: boolean }} props
 */
export default function ResultaatPagina({ scores = null, naam = "", email = "", answers = [], intakeAnswer = null, gespreksopener = "", skipLead = false }) {
  const veiligeScores = scores ?? defaultScores;
  const [emailVerzonden, setEmailVerzonden] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailInput, setEmailInput] = useState(email ?? "");
  const [mailError, setMailError] = useState("");
  const [toonBoekFallback, setToonBoekFallback] = useState(false);
  const adminMailSentRef = useRef(false);

  const sterk = sterksteKwadrant(veiligeScores);
  const zwak = zwaksteKwadrant(veiligeScores);
  const verr = verrassingKwadrant(veiligeScores);
  const gem = gemiddelde(veiligeScores);
  const gemSl = scoreLabel(gem);
  const archetypeResultaat = bepaalArchetype({
    lef: veiligeScores.lef.score,
    werkwijze: veiligeScores.werkwijze.score,
    individu: veiligeScores.individu.score,
    doel: veiligeScores.doel.score,
  }, answers);
  const { beste, runner1, runner2, zekerheid } = archetypeResultaat;
  const archetypeTop3 = [beste, runner1, runner2];
  const actieveArchetypeTip = archetypeTips[beste.id] ?? {
    titel: "Eerste stap voor volgende week",
    tip: "Plan een kort teammoment om samen te bepalen wat jullie komende week als team willen versterken.",
    bron: "Bron onbekend",
  };
  const rapportLink =
    answers.length === 12
      ? (() => {
          const params = new URLSearchParams({
            v: encodeAnswersToV(answers),
            n: naam,
            e: emailInput,
          });
          if (intakeAnswer) params.set("i", encodeIntakeAnswer(intakeAnswer));
          if (gespreksopener) params.set("g", gespreksopener);
          return `https://ai-adoptie-profiel.vercel.app/rapport?${params.toString()}`;
        })()
      : "https://ai-adoptie-profiel.vercel.app/";

  const dominanteKleur =
    beste.dominantKwadrant === "s"
      ? "#2D7A3A"
      : beste.dominantKwadrant === "p"
        ? "#1A4D2E"
        : beste.dominantKwadrant === "st"
          ? "#7BC47F"
          : beste.dominantKwadrant === "m"
            ? "#111111"
            : "#111111";
  const zekerheidTekst =
    zekerheid > 70
      ? "Duidelijke match"
      : zekerheid >= 40
        ? "Sterke match"
        : `Jullie zijn onderweg - je zit op de grens van ${beste.naam} en ${runner1.naam}`;
  const laag1Samenvatting = `Topmatch: ${beste.naam}. Gemiddelde teamscore: ${gem.toFixed(1)} (${gemSl.label}).`;
  const laag2Samenvatting = `Verdieping: sterkste kwadrant is ${veiligeScores[sterk[0]].label}; groeikans ligt bij ${veiligeScores[zwak[0]].label}.`;
  const laag3Samenvatting = `Gespreksfocus: verbind ${runner1.naam} en ${runner2.naam} met concrete teamafspraken voor de komende 2 weken.`;
  const defaultWaarschuwing = archetypeResultaat.isDefaultIngevuld
    ? "Let op: alle 12 antwoorden staan op 5. Dit lijkt op een standaardinvulling en geeft mogelijk geen betrouwbaar teambeeld."
    : "";
  const antwoordenSamenvatting = answers.length
    ? answers.map((score, index) => `${vraagLabels[`V${index + 1}`] ?? vraagTitels[index] ?? "Vraag"}: ${score}`).join("\n")
    : [
        ...veiligeScores.lef.vragen.map((v, i) => `${vraagLabels[`V${i + 1}`]}: ${v}`),
        ...veiligeScores.werkwijze.vragen.map((v, i) => `${vraagLabels[`V${i + 4}`]}: ${v}`),
        ...veiligeScores.individu.vragen.map((v, i) => `${vraagLabels[`V${i + 7}`]}: ${v}`),
        ...veiligeScores.doel.vragen.map((v, i) => `${vraagLabels[`V${i + 10}`]}: ${v}`),
      ].join("\n");

  const rapportVolgorde = Object.keys(veiligeScores).sort((a, b) => veiligeScores[a].score - veiligeScores[b].score);
  const kwadrantRapportVolledig = rapportVolgorde
    .map((key) => {
      const data = veiligeScores[key];
      const watSpeeltHier = watSpeeltHierVoorKwadrant(key, data.vragen, data.score);
      const { vraagNummer, hoogsteScore } = vraagNummerMetHoogsteScore(key, data.vragen);
      const hoogsteVraagLabel = vraagLabels[`V${vraagNummer}`] ?? `Vraag ${vraagNummer}`;
      return `${data.label}\n- Inzicht: ${tips[key].lang}\n- Wat speelt hier: ${watSpeeltHier}\n- De hoogste score binnen dit kwadrant: ${hoogsteVraagLabel} (${hoogsteScore})`;
    })
    .join("\n\n");

  const quadrantSummary = [
    `${veiligeScores.lef.label}: ${veiligeScores.lef.score.toFixed(1)}`,
    `${veiligeScores.werkwijze.label}: ${veiligeScores.werkwijze.score.toFixed(1)}`,
    `${veiligeScores.individu.label}: ${veiligeScores.individu.score.toFixed(1)}`,
    `${veiligeScores.doel.label}: ${veiligeScores.doel.score.toFixed(1)}`,
  ].join("\n");

  const signaalKracht = `${veiligeScores[sterk[0]].label}: ${tips[sterk[0]].kort}`;
  const signaalGroeikans = `${veiligeScores[zwak[0]].label}: ${tips[zwak[0]].kort}`;
  const signaalOpvallend = `${veiligeScores[verr[0]].label}: scoort ${verr[1].score.toFixed(1)} - ${Math.abs(verr[1].score - gem) > 1.5 ? "opvallend afwijkend van jullie gemiddelde." : "iets om in de gaten te houden."}`;

  async function sendAdminMail() {
    if (adminMailSentRef.current) return;
    adminMailSentRef.current = true;
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_ADMIN_TEMPLATE_ID,
      {
        participant_name: naam || "Onbekend",
        participant_email: emailInput || "Niet ingevuld (skip)",
        rapport_link: rapportLink,
        quadrant_scores: quadrantSummary,
        strongest_quadrant: veiligeScores[sterk[0]].label,
        admin_email: ADMIN_EMAIL,
        answers: antwoordenSamenvatting,
        archetype_top1_naam: archetypeTop3[0].naam,
        archetype_tip_titel: actieveArchetypeTip.titel,
        archetype_tip_tekst: actieveArchetypeTip.tip,
        archetype_tip_bron: actieveArchetypeTip.bron,
        archetype_top2_naam: archetypeTop3[1].naam,
        archetype_top3_naam: archetypeTop3[2].naam,
        archetype_zekerheid: `${zekerheid}%`,
        archetype_default_waarschuwing: defaultWaarschuwing,
        laag1_samenvatting: laag1Samenvatting,
        laag2_samenvatting: laag2Samenvatting,
        laag3_samenvatting: laag3Samenvatting,
        kwadrant_rapport_volledig: kwadrantRapportVolledig,
        intake_answer: intakeAnswer ? `Intake: ${intakeAnswer}` : "",
        gespreksopener: gespreksopener || "",
      },
      { publicKey: EMAILJS_PUBLIC_KEY },
    );
  }

  async function handleRapportAanvragen() {
    setMailError("");
    setIsSendingEmail(true);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_USER_TEMPLATE_ID,
        {
          name: naam,
          email: emailInput,
          rapport_link: rapportLink,
          quadrant_scores: quadrantSummary,
          strongest_quadrant: veiligeScores[sterk[0]].label,
          answers: antwoordenSamenvatting,
          archetype_top1_naam: archetypeTop3[0].naam,
          archetype_top1_tagline: archetypeTop3[0].tagline,
          archetype_top1_omschrijving: archetypeTop3[0].omschrijving,
          archetype_top1_risico: archetypeTop3[0].risico,
          archetype_top1_herkenbaar: archetypeTop3[0].herkenbaar,
          archetype_tip_titel: actieveArchetypeTip.titel,
          archetype_tip_tekst: actieveArchetypeTip.tip,
          archetype_tip_bron: actieveArchetypeTip.bron,
          ebook_tip_label: "Onze beste tip op basis van jouw persoonlijke scan",
          archetype_top2_naam: archetypeTop3[1].naam,
          archetype_top2_tagline: archetypeTop3[1].tagline,
          archetype_top3_naam: archetypeTop3[2].naam,
          archetype_top3_tagline: archetypeTop3[2].tagline,
          archetype_zekerheid: `${zekerheid}%`,
          archetype_zekerheid_label: zekerheidTekst,
          archetype_default_waarschuwing: defaultWaarschuwing,
          laag1_samenvatting: laag1Samenvatting,
          laag2_samenvatting: laag2Samenvatting,
          laag3_samenvatting: laag3Samenvatting,
          kwadrant_rapport_volledig: kwadrantRapportVolledig,
          signaal_kracht: signaalKracht,
          signaal_groeikans: signaalGroeikans,
          signaal_opvallend: signaalOpvallend,
          sparring_link: "https://calendly.com/bureautjeaap/wild-scan",
          intake_answer: intakeAnswer ? `Intake: ${intakeAnswer}` : "",
          gespreksopener: gespreksopener || "",
        },
        { publicKey: EMAILJS_PUBLIC_KEY },
      );

      await sendAdminMail();

      setEmailVerzonden(true);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      setMailError(msg);
      setEmailVerzonden(false);
    } finally {
      setIsSendingEmail(false);
    }
  }

  useEffect(() => {
    if (!skipLead || adminMailSentRef.current) return;
    sendAdminMail().catch((error) => {
      const msg = error instanceof Error ? error.message : String(error);
      setMailError(msg);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skipLead]);

  return (
    <div className="min-h-screen bg-[#111111]" style={{ fontFamily: "var(--font-body), Inter, sans-serif" }}>
      <header className="sticky top-0 z-50 bg-[#111111] border-b border-[#2A2A2A]">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <Logo />
          <div className="text-[0.9rem] text-white/80">AI Adoptie Profiel — de WILD-scan</div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="text-center mb-6">
            <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: accent }}>
              AI Adoptie Profiel
            </div>
            <h1 className="text-3xl font-black text-white leading-tight mb-2" style={{ fontFamily: "var(--font-heading), 'Alfa Slab One', serif" }}>
              {naam ? `Goed gedaan, ${naam}` : "Jouw team in beeld"}
            </h1>
            <p className="text-white/70 text-sm">Momentopname met de WILD-scan · {new Date().toLocaleDateString("nl-NL", { day: "numeric", month: "long" })}</p>
          </div>

          <div className="rounded-lg p-6 mb-5" style={{ background: dominanteKleur, boxShadow: "0 2px 12px rgba(0,0,0,0.4)" }}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-2 text-white/80" style={{ fontFamily: "var(--font-body), Inter, sans-serif" }}>
              {rapportCopy.archetypeIntroBadge}
            </p>
            <h2 className="text-white leading-tight" style={{ fontFamily: "var(--font-heading), 'Alfa Slab One', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              {beste.naam}
            </h2>
            <p className="mt-2 text-[1.1rem] italic text-[#C8F5C8]" style={{ fontFamily: "var(--font-body), Inter, sans-serif" }}>{beste.tagline}</p>
            <div className="h-4" />
            <p className="text-base text-white leading-relaxed" style={{ fontFamily: "var(--font-body), Inter, sans-serif", lineHeight: 1.7 }}>{beste.omschrijving}</p>
            <p className="mt-3 text-sm text-white/90" style={{ fontFamily: "var(--font-body), Inter, sans-serif" }}>
              <strong style={{ color: accent }}>Valkuil:</strong> {beste.risico}
            </p>
            <div className="h-4" />
            <div className="inline-flex rounded-full px-3 py-1.5 text-xs text-white" style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)" }}>
              Dit profiel herkennen we vaak bij: {beste.herkenbaar}
            </div>
            <div className="mt-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold border border-white/40 text-white/90" style={{ background: "rgba(255,255,255,0.15)" }}>
              {zekerheidTekst}
            </div>
            {archetypeResultaat.isDefaultIngevuld && (
              <p className="mt-3 text-xs text-amber-100">
                Let op: alle 12 antwoorden staan op 5. Dit lijkt op een standaardinvulling en geeft mogelijk geen betrouwbaar teambeeld.
              </p>
            )}
            <div className="mt-4 rounded-xl px-3 py-2" style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)" }}>
              <p className="text-xs text-white/90">
                {rapportCopy.archetypeTop3Label} <strong>1.</strong> {beste.naam} · <strong>2.</strong> {runner1.naam} · <strong>3.</strong> {runner2.naam}
              </p>
            </div>
          </div>

          <div className="rounded-lg p-5 mb-5 border border-[#2A2A2A]" style={{ background: "#1A1A1A", boxShadow: "0 2px 12px rgba(0,0,0,0.4)" }}>
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <p className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide text-[#C8F5C8] border border-[#2A2A2A]">
                  <span aria-hidden="true">📘</span>
                  Onze beste tip op basis van jouw persoonlijke scan
                </p>
                <h3 className="mt-3 font-bold text-white text-lg leading-snug" style={{ fontFamily: "var(--font-heading), 'Alfa Slab One', serif" }}>
                  {actieveArchetypeTip.titel}
                </h3>
                <p className="mt-2 text-sm text-white/90">{actieveArchetypeTip.tip}</p>
                <p className="mt-3 text-xs italic text-white/60">Uit: Positief Leiderschap — 25 Krachtige Acties · {actieveArchetypeTip.bron}</p>
                <div className="mt-3 rounded-lg border border-[#2A2A2A] px-3 py-2 text-xs text-white/80" style={{ background: "#111111" }}>
                  Je ontvangt dit e-book gratis bij de bespreking van jouw scan.
                </div>
              </div>
              <div className="hidden sm:block flex-shrink-0">
                {toonBoekFallback ? (
                  <div className="w-24 h-36 rounded-md border border-[#2A2A2A] shadow-sm bg-[#2D7A3A] text-white text-xs font-semibold flex items-center justify-center text-center px-2">
                    Positief Leiderschap
                  </div>
                ) : (
                  <Image
                    src="/images/voorkant-ebook-25-tips-positief-leiderschap.png"
                    alt="Cover van 25 Krachtige Acties voor Positief Leiderschap"
                    width={96}
                    height={140}
                    className="rounded-md border border-[#2A2A2A] object-cover shadow-sm"
                    onError={() => setToonBoekFallback(true)}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="rounded-lg p-6 mb-5 border border-[#2A2A2A]" style={{ background: "#1A1A1A", boxShadow: "0 2px 12px rgba(0,0,0,0.4)" }}>
            <div className="flex flex-col items-center">
              <WILDWiel scores={veiligeScores} size={280} animated />
              <div className="mt-4 text-center">
                <div className="text-5xl font-black" style={{ color: scoreWoordKleur(gemSl.label), fontFamily: "var(--font-heading), 'Alfa Slab One', serif" }}>
                  {gem.toFixed(1)}
                </div>
                <div className="text-sm font-semibold mt-1" style={{ color: scoreWoordKleur(gemSl.label) }}>
                  {gemSl.label}
                </div>
                <div className="text-white/60 text-xs mt-1">gemiddelde over alle WILD-domeinen</div>
              </div>
            </div>
          </div>

          <div className="rounded-lg p-5 mb-5 border border-[#2A2A2A]" style={{ background: "#1A1A1A", boxShadow: "0 2px 12px rgba(0,0,0,0.4)" }}>
            <div className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-4">Per kwadrant</div>
            <div className="space-y-4">
              {Object.entries(veiligeScores).map(([key, data]) => {
                const kleur = kwadrantKleuren[key];
                const sl = scoreLabel(data.score);
                const slKleur = scoreWoordKleur(sl.label);
                return (
                  <div key={key} className="rounded-lg p-3 mb-3" style={{ background: "#1A1A1A", borderLeft: `4px solid ${kleur}` }}>
                    <div className="flex justify-between items-center mb-1.5">
                      <div>
                        <span className="text-sm font-semibold text-white">{data.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ color: slKleur }}>
                          {sl.icon ? `${sl.icon} ${sl.label}` : sl.label}
                        </span>
                        <span className="text-sm font-black" style={{ color: kleur }}>
                          {data.score.toFixed(1)}
                        </span>
                      </div>
                    </div>
                    <ScoreBalk score={data.score} kleur={kleur} />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <SignaalKaart type="Jullie kracht" titel={veiligeScores[sterk[0]].label} tekst={tips[sterk[0]].kort} kleur={kwadrantKleuren[sterk[0]]} icon="✦" />
            <SignaalKaart type={rapportCopy.groeikansLabel} titel={veiligeScores[zwak[0]].label} tekst={tips[zwak[0]].kort} kleur={kwadrantKleuren[zwak[0]]} icon="↗" />
            <SignaalKaart
              type="Opvallend signaal"
              titel={veiligeScores[verr[0]].label}
              tekst={`Scoort ${verr[1].score.toFixed(1)} - ${Math.abs(verr[1].score - gem) > 1.5 ? "opvallend afwijkend van je gemiddelde" : "iets om in de gaten te houden"}.`}
              kleur={kwadrantKleuren[verr[0]]}
              icon="◎"
            />
          </div>

          <div className="rounded-lg p-4 mb-6 text-center border border-[#2A2A2A]" style={{ background: "#1A1A1A" }}>
            <p className="text-white/70 text-xs leading-relaxed">
              <span className="font-semibold text-white">Een 10 is niet het doel.</span> {rapportCopy.balansZin}
            </p>
          </div>
        </div>

          <div className="mt-4 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-[#2A2A2A]" />
              <div className="text-xs font-semibold uppercase tracking-widest text-white/60 px-2">Volledig rapport per kwadrant</div>
              <div className="flex-1 h-px bg-[#2A2A2A]" />
            </div>

          {Object.keys(veiligeScores).sort((a, b) => veiligeScores[a].score - veiligeScores[b].score).map((key) => (
            <RapportSectie key={key} kwadrant={key} data={veiligeScores[key]} />
          ))}

          <div className="rounded-lg border border-[#2A2A2A] p-5 mb-6" style={{ background: "#1A1A1A", boxShadow: "0 2px 12px rgba(0,0,0,0.4)" }}>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-2">{rapportCopy.alternatieveProfielenTitel}</p>
            <h3 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-heading), 'Alfa Slab One', serif" }}>
              {rapportCopy.alternatieveProfielenSubtitel}
            </h3>
            <p className="text-sm text-white/80 mt-2">
              Naast jullie hoofdprofiel <strong>{beste.naam}</strong> zijn er twee andere typeringen waar jullie team zich mogelijk ook in herkent.
            </p>
            <div className="mt-3 grid gap-3">
              <div className="rounded-lg border border-[#2A2A2A] p-3 text-sm text-white/90" style={{ background: "#111111" }}>
                <p><strong>2. {runner1.naam}</strong></p>
                <p className="italic mt-1 text-[#C8F5C8]">{runner1.tagline}</p>
              </div>
              <div className="rounded-lg border border-[#2A2A2A] p-3 text-sm text-white/90" style={{ background: "#111111" }}>
                <p><strong>3. {runner2.naam}</strong></p>
                <p className="italic mt-1 text-[#C8F5C8]">{runner2.tagline}</p>
              </div>
            </div>
            <p className="mt-3 text-xs text-white/60">
              Top 3 passende organisatietypen: 1. {beste.naam} · 2. {runner1.naam} · 3. {runner2.naam}
            </p>
          </div>

          <div className="rounded-lg p-6 mb-6 border-2" style={{ borderColor: accent, background: "rgba(200, 245, 200, 0.08)", boxShadow: "0 2px 12px rgba(0,0,0,0.4)" }}>
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: accent }}>AI-gesprek</p>
            <h3 className="font-black text-white text-xl mb-2" style={{ fontFamily: "var(--font-heading), 'Alfa Slab One', serif" }}>
              AI-gesprek over jullie uitslag?
            </h3>
            <p className="text-sm text-white/90 leading-relaxed">
              {rapportCopy.sparringBody}
            </p>
            <a
              href=""
              onClick={(e) => {
                e.preventDefault();
                if (typeof window !== "undefined" && window.Calendly?.initPopupWidget) {
                  window.Calendly.initPopupWidget({
                    url: "https://calendly.com/bureautjeaap/wild-scan",
                  });
                }
              }}
              className="inline-block mt-4 px-8 py-3 rounded-full text-base font-semibold transition hover:bg-[#2D7A3A] hover:text-white"
              style={{ background: accent, color: "#111111", fontFamily: "var(--font-body), Inter, sans-serif" }}
            >
              Plan een WILD-sessie
            </a>
          </div>

          <div className="rounded-lg overflow-hidden mb-6 border border-[#2A2A2A]" style={{ background: "#1A1A1A", boxShadow: "0 2px 12px rgba(0,0,0,0.4)" }}>
            <div className="p-6">
              <h3 className="font-semibold text-white text-sm mb-1" style={{ fontFamily: "var(--font-heading), 'Alfa Slab One', serif" }}>Ontvang dit rapport in je mailbox</h3>
              <p className="text-white/70 text-xs mb-3 leading-relaxed">We sturen je resultaten direct naar je inbox.</p>
              {emailVerzonden ? (
                <div className="rounded-lg p-4 text-center border border-[#2A2A2A]" style={{ background: "rgba(45, 122, 58, 0.2)" }}>
                  <div className="text-2xl mb-1">✓</div>
                  <p className="font-bold text-sm" style={{ color: accent }}>
                    Rapport onderweg naar {emailInput}
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="jouw@email.nl"
                      className="flex-1 px-4 py-3 rounded-lg border border-[#2A2A2A] text-sm focus:outline-none focus:ring-2 focus:border-[#C8F5C8] focus:ring-[#C8F5C8]/30 bg-[#111111] text-white"
                    />
                    <button
                      onClick={handleRapportAanvragen}
                      disabled={isSendingEmail}
                      className="px-6 py-3 rounded-full text-base font-semibold flex-shrink-0 transition hover:bg-[#2D7A3A] hover:text-white disabled:opacity-70 disabled:cursor-not-allowed inline-flex items-center gap-2"
                      style={{ background: accent, color: "#111111", fontFamily: "var(--font-body), Inter, sans-serif" }}
                    >
                      {isSendingEmail && <span className="w-4 h-4 rounded-full border-2 border-[#111111]/40 border-t-[#111111] animate-spin" />}
                      {isSendingEmail ? "Versturen..." : "Mail mijn rapport"}
                    </button>
                  </div>
                  {mailError && <p className="text-xs text-red-400 break-all">EmailJS fout: {mailError}</p>}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
