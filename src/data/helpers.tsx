import { cloneElement, Fragment, isValidElement, type ReactElement, type ReactNode } from "react";
import type { ElementMatch } from "../types";

export const NUMBER_SUM: number = 100; // Rule 5
export const ROMAN_MUL: number = 3500; // Rule 9
export const ELEMENT_SUM: number = 200; //Rule 18
export const STRENGTH_NUM: number = 3; //Rule 21
export const PAUL_WORMS: number = 3; //Rule 24

export const MONTHS: string[] = [
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember",
];

export const ROMAN_MAP: Record<string, number> = {
  M: 1000,
  CM: 900,
  D: 500,
  CD: 400,
  C: 100,
  XC: 90,
  L: 50,
  XL: 40,
  X: 10,
  IX: 9,
  V: 5,
  IV: 4,
  I: 1,
};

export const SPONSORS: string[] = ["Apple", "Shell", "Adidas"];

export const GIGA_CODES: string[] = [
  "GC4K089",
  "GC50FTF",
  "GC56APX",
  "GC55555",
  "GC6GB1B",
  "GC5AX15",
  "GC77777",
  "GC7QQQQ",
  "GC7WWWW",
  "GC86VDF",
  "GC7G1GA",
  "GCAGGGG",
];

export const PERIODIC_TABLE: Record<string, number> = {
  H: 1,
  He: 2,
  Li: 3,
  Be: 4,
  B: 5,
  C: 6,
  N: 7,
  O: 8,
  F: 9,
  Ne: 10,
  Na: 11,
  Mg: 12,
  Al: 13,
  Si: 14,
  P: 15,
  S: 16,
  Cl: 17,
  Ar: 18,
  K: 19,
  Ca: 20,
  Sc: 21,
  Ti: 22,
  V: 23,
  Cr: 24,
  Mn: 25,
  Fe: 26,
  Co: 27,
  Ni: 28,
  Cu: 29,
  Zn: 30,
  Ga: 31,
  Ge: 32,
  As: 33,
  Se: 34,
  Br: 35,
  Kr: 36,
  Rb: 37,
  Sr: 38,
  Y: 39,
  Zr: 40,
  Nb: 41,
  Mo: 42,
  Tc: 43,
  Ru: 44,
  Rh: 45,
  Pd: 46,
  Ag: 47,
  Cd: 48,
  In: 49,
  Sn: 50,
  Sb: 51,
  Te: 52,
  I: 53,
  Xe: 54,
  Cs: 55,
  Ba: 56,
  La: 57,
  Ce: 58,
  Pr: 59,
  Nd: 60,
  Pm: 61,
  Sm: 62,
  Eu: 63,
  Gd: 64,
  Tb: 65,
  Dy: 66,
  Ho: 67,
  Er: 68,
  Tm: 69,
  Yb: 70,
  Lu: 71,
  Hf: 72,
  Ta: 73,
  W: 74,
  Re: 75,
  Os: 76,
  Ir: 77,
  Pt: 78,
  Au: 79,
  Hg: 80,
  Tl: 81,
  Pb: 82,
  Bi: 83,
  Po: 84,
  At: 85,
  Rn: 86,
  Fr: 87,
  Ra: 88,
  Ac: 89,
  Th: 90,
  Pa: 91,
  U: 92,
  Np: 93,
  Pu: 94,
  Am: 95,
  Cm: 96,
  Bk: 97,
  Cf: 98,
  Es: 99,
  Fm: 100,
  Md: 101,
  No: 102,
  Lr: 103,
  Rf: 104,
  Db: 105,
  Sg: 106,
  Bh: 107,
  Hs: 108,
  Mt: 109,
  Ds: 110,
  Rg: 111,
  Cn: 112,
  Nh: 113,
  Fl: 114,
  Mc: 115,
  Lv: 116,
  Ts: 117,
  Og: 118,
};

export const ELEMENTS_2: string[] = Object.keys(PERIODIC_TABLE).filter(
  (k) => k.length === 2,
);

export const COUNTRY_MAP: Record<string, number> = {
  // Amerika
  "Antigua und Barbuda": 186,
  Argentinien: 166,
  Bahamas: 14,
  Barbados: 180,
  Belize: 16,
  Bolivien: 6,
  Brasilien: 13,
  Chile: 102,
  "Costa Rica": 109,
  Dominica: 183,
  "Dominikanische Republik": 130,
  "El Salvador": 118,
  Ecuador: 61,
  Grenada: 178,
  Guatemala: 25,
  Guyana: 28,
  Haiti: 44,
  Honduras: 46,
  Jamaika: 11,
  Kanada: 103,
  Kolumbien: 99,
  Kuba: 110,
  Mexiko: 82,
  Nicaragua: 88,
  Panama: 51,
  Paraguay: 50,
  Peru: 53,
  "St. Kitts und Nevis": 187,
  "St. Lucia": 181,
  "St. Vincent und die Grenadinen": 179,
  Suriname: 116,
  "Trinidad und Tobago": 144,
  Uruguay: 140,
  Venezuela: 158,
  "Vereinigte Staaten": 137,

  // Europa
  Albanien: 62,
  Andorra: 198,
  Belarus: 15,
  Belgien: 1,
  "Bosnien und Herzegowina": 4,
  Bulgarien: 3,
  Dänemark: 132,
  Deutschland: 133,
  Estland: 58,
  Finnland: 85,
  Frankreich: 84,
  Griechenland: 26,
  Irland: 172,
  Island: 161,
  Italien: 164,
  Kroatien: 43,
  Lettland: 139,
  Liechtenstein: 217,
  Litauen: 20,
  Luxemburg: 21,
  Malta: 224,
  Moldau: 70,
  Monaco: 218,
  Montenegro: 69,
  Niederlande: 89,
  Nordmazedonien: 77,
  Norwegen: 90,
  Österreich: 135,
  Polen: 56,
  Portugal: 49,
  Rumänien: 23,
  Russland: 17,
  "San Marino": 235,
  Schweden: 128,
  Schweiz: 98,
  Serbien: 19,
  Slowakei: 119,
  Slowenien: 121,
  Spanien: 67,
  Tschechien: 107,
  Ukraine: 174,
  Ungarn: 45,
  Vatikanstadt: 239,
  "Vereinigtes Königreich": 30,

  // Ozeanien
  Australien: 167,
  Fidschi: 86,
  Kiribati: 214,
  Marshallinseln: 221,
  Mikronesien: 206,
  Nauru: 227,
  Neuseeland: 95,
  Palau: 231,
  "Papua-Neuguinea": 52,
  Samoa: 200,
  Salomonen: 126,
  Tonga: 237,
  Tuvalu: 238,
  Vanuatu: 83,

  // Asien
  Afghanistan: 159,
  Armenien: 163,
  Aserbaidschan: 171,
  Bahrain: 201,
  Bangladesch: 0,
  Bhutan: 10,
  Brunei: 5,
  "China, Volksrepublik": 100,
  Georgien: 29,
  Indien: 169,
  Indonesien: 173,
  Irak: 160,
  Iran: 162,
  Israel: 168,
  Japan: 7,
  Jemen: 134,
  Jordanien: 42,
  Kambodscha: 117,
  Kasachstan: 64,
  Katar: 175,
  Kirgisistan: 113,
  "Korea, Nord": 122,
  "Korea, Süd": 120,
  Kuwait: 35,
  Laos: 142,
  Libanon: 141,
  Malaysia: 81,
  Malediven: 226,
  Mongolei: 76,
  Myanmar: 74,
  Nepal: 96,
  Oman: 37,
  Osttimor: 148,
  Pakistan: 54,
  Philippinen: 55,
  "Saudi-Arabien": 127,
  Singapur: 233,
  "Sri Lanka": 146,
  Syrien: 112,
  Tadschikistan: 150,
  Thailand: 152,
  Türkei: 145,
  Turkmenistan: 149,
  Usbekistan: 73,
  "Vereinigte Arabische Emirate": 157,
  Vietnam: 165,
  Zypern: 108,

  // Afrika
  Ägypten: 59,
  Algerien: 136,
  Angola: 63,
  Äquatorialguinea: 27,
  Äthiopien: 65,
  Benin: 9,
  Botswana: 12,
  "Burkina Faso": 2,
  Burundi: 8,
  Dschibuti: 131,
  Elfenbeinküste: 97,
  Eritrea: 68,
  Eswatini: 111,
  Gabun: 31,
  Gambia: 33,
  Ghana: 36,
  Guinea: 32,
  "Guinea-Bissau": 24,
  Kamerun: 101,
  "Kap Verde": 196,
  Kenia: 114,
  Komoren: 215,
  "Kongo, Demokratische Republik": 106,
  "Kongo, Republik": 104,
  Lesotho: 151,
  Liberia: 22,
  Libyen: 156,
  Madagaskar: 71,
  Malawi: 78,
  Mali: 75,
  Marokko: 72,
  Mauretanien: 79,
  Mauritius: 225,
  Mosambik: 176,
  Namibia: 91,
  Niger: 93,
  Nigeria: 94,
  Ruanda: 18,
  Sambia: 57,
  "São Tomé und Príncipe": 194,
  Senegal: 124,
  Seychellen: 232,
  "Sierra Leone": 125,
  Simbabwe: 66,
  Somalia: 123,
  Südafrika: 60,
  Sudan: 129,
  Südsudan: 115,
  Tansania: 170,
  Togo: 154,
  Tschad: 155,
  Tunesien: 147,
  Uganda: 80,
  "Zentralafrikanische Republik": 105,
};

export const CACHE_TYPE_MAP: Record<string, string> = {
  Tradi: "ail abefg1g2m abcefg1g2 abcdil adil",
  Multi: "bcefhj bcdef def ail adil",
  Virtual: "efjk adil abefg1g2m ail bcdef abcefg1g2 def",
  Letterbox: "def adefg1g2 ail ail adefg1g2 abefg1g2m abcdg2il abcdef hjkm",
  Event: "adefg1g2 efjk adefg1g2 bcefhm ail",
  Mystery: "bcefhj hjl acdg2h ail adefg1g2 abefg1g2m hjl",
  Webcam: "bcefkm adefg1g2 abcdg2il adef abcefg1g2 bcefhj",
  EarthCache:
    "adefg1g2 abcefg1g2 abefg1g2m ail bcefg1g2 adef abcefg1g2 adef bcefg1g2 adefg1g2",
  Wherigo: "bcefkm bcefg1g2 adefg1g2 abefg1g2m adil acdefg2 abcdef",
};

export const CACHE_SIZE_MAP: Record<string, string> = {
  Micro: "Zvpeb",
  Small: "Fznyy",
  Regular: "Erthyne",
  Large: "Ynetr",
  Other: "Bgure",
  Virtual: "Iveghny",
  "Not chosen": "Abg pubfra",
};

export const AFFIRMATIONEN: string[] = [
  "Ich bin geliebt",
  "Ich bin wertvoll",
  "Ich bin genug",
];

export const D_MAP: Record<string, string> = {
  1: "Easy to find or solve within a few minutes.",
  1.5: "Easy to find or solve within 10-15 minutes.",
  2: "Relatively easy to find or solve within 30 minutes.",
  2.5: "A mild challenge, but relatively easy for an experienced geocacher.",
  3: "A somewhat challenging puzzle or hiding spot.",
  3.5: "Quite difficult. Be prepared for a mental challenge.",
  4: "Very difficult and may take special knowledge, advanced preparation, or multiple trips.",
  4.5: "Extremely difficult. Most likely requires special knowledge or skills.",
  5: "The most extreme mental challenge. Requires specialized knowledge, skills, tools, or significant effort to find, solve, or open.",
};

export const T_MAP: Record<string, string> = {
  1: "The hike is less than 0.5 mile (0.8 km) and wheelchair accessible (attribute required). Most likely paved and flat.",
  1.5: "The hike is less than 0.5 mile (0.8 km). Most likely flat but may not be wheelchair accessible.",
  2: "The hike is less than 2 miles (3 km) along well-defined paths with no significant elevation change or overgrowth.",
  2.5: "Terrain may have small elevation changes or moderate overgrowth.",
  3: "The hike may be more than 2 miles (3 km) on varied terrain - too difficult to ride a bike due to elevation changes or significant overgrowth.",
  3.5: "Quite strenuous, extended hike on widely variable terrain.",
  4: "Very strenuous movement that may include significant distance, overgrowth, swimming, or elevation changes.",
  4.5: "Extremely demanding movement over potentially hazardous terrain.",
  5: "Requires specialized equipment such as scuba gear, a boat, rock climbing gear, or similar.",
};

export const ANIMAL_MAP: Record<string, string> = {
  Affe: "🐒",
  Gorilla: "🦍",
  "Orang-Utan": "🦧",
  Hund: "🐕",
  Pudel: "🐩",
  Wolf: "🐺",
  Fuchs: "🦊",
  Waschbär: "🦝",
  Katze: "🐈",
  Löwe: "🦁",
  Tiger: "🐅",
  Leopard: "🐆",
  Elch: "🫎",
  Esel: "🫏",
  Pferd: "🐎",
  Einhorn: "🦄",
  Zebra: "🦓",
  Hirsch: "🦌",
  Bison: "🦬",
  Ochse: "🐂",
  Wasserbüffel: "🐃",
  Kuh: "🐄",
  Schwein: "🐖",
  Wildschwein: "🐗",
  Widder: "🐏",
  Schaf: "🐑",
  Ziege: "🐐",
  Dromedar: "🐪",
  Kamel: "🐫",
  Lama: "🦙",
  Giraffe: "🦒",
  Elefant: "🐘",
  Mammut: "🦣",
  Nashorn: "🦏",
  Nilpferd: "🦛",
  Maus: "🐁",
  Ratte: "🐀",
  Hamster: "🐹",
  Hase: "🐇",
  Streifenhörnchen: "🐿️",
  Biber: "🦫",
  Igel: "🦔",
  Fledermaus: "🦇",
  Bär: "🐻",
  Eisbär: "🐻‍❄️",
  Koala: "🐨",
  Panda: "🐼",
  Faultier: "🦥",
  Otter: "🦦",
  Stinktier: "🦨",
  Känguru: "🦘",
  Dachs: "🦡",
};

export const POKEMON_TYPE_MAP: Record<string, string[]> = {
  1: ["Pflanze", "Gift"],
  2: ["Pflanze", "Gift"],
  3: ["Pflanze", "Gift"],
  4: ["Feuer"],
  5: ["Feuer"],
  6: ["Feuer", "Flug"],
  7: ["Wasser"],
  8: ["Wasser"],
  9: ["Wasser"],
  10: ["Käfer"],
  11: ["Käfer"],
  12: ["Käfer", "Flug"],
  13: ["Käfer", "Gift"],
  14: ["Käfer", "Gift"],
  15: ["Käfer", "Gift"],
  16: ["Normal", "Flug"],
  17: ["Normal", "Flug"],
  18: ["Normal", "Flug"],
  19: ["Normal"],
  20: ["Normal"],
  21: ["Normal", "Flug"],
  22: ["Normal", "Flug"],
  23: ["Gift"],
  24: ["Gift"],
  25: ["Elektro"],
  26: ["Elektro"],
  27: ["Boden"],
  28: ["Boden"],
  29: ["Gift"],
  30: ["Gift"],
  31: ["Gift", "Boden"],
  32: ["Gift"],
  33: ["Gift"],
  34: ["Gift", "Boden"],
  35: ["Fee"],
  36: ["Fee"],
  37: ["Feuer"],
  38: ["Feuer"],
  39: ["Normal", "Fee"],
  40: ["Normal", "Fee"],
  41: ["Gift", "Flug"],
  42: ["Gift", "Flug"],
  43: ["Pflanze", "Gift"],
  44: ["Pflanze", "Gift"],
  45: ["Pflanze", "Gift"],
  46: ["Käfer", "Pflanze"],
  47: ["Käfer", "Pflanze"],
  48: ["Käfer", "Gift"],
  49: ["Käfer", "Gift"],
  50: ["Boden"],
  51: ["Boden"],
  52: ["Normal"],
  53: ["Normal"],
  54: ["Wasser"],
  55: ["Wasser"],
  56: ["Kampf"],
  57: ["Kampf"],
  58: ["Feuer"],
  59: ["Feuer"],
  60: ["Wasser"],
  61: ["Wasser"],
  62: ["Wasser", "Kampf"],
  63: ["Psycho"],
  64: ["Psycho"],
  65: ["Psycho"],
  66: ["Kampf"],
  67: ["Kampf"],
  68: ["Kampf"],
  69: ["Pflanze", "Gift"],
  70: ["Pflanze", "Gift"],
  71: ["Pflanze", "Gift"],
  72: ["Wasser", "Gift"],
  73: ["Wasser", "Gift"],
  74: ["Gestein", "Boden"],
  75: ["Gestein", "Boden"],
  76: ["Gestein", "Boden"],
  77: ["Feuer"],
  78: ["Feuer"],
  79: ["Wasser", "Psycho"],
  80: ["Wasser", "Psycho"],
  81: ["Elektro", "Stahl"],
  82: ["Elektro", "Stahl"],
  83: ["Normal", "Flug"],
  84: ["Normal", "Flug"],
  85: ["Normal", "Flug"],
  86: ["Wasser"],
  87: ["Wasser", "Eis"],
  88: ["Gift"],
  89: ["Gift"],
  90: ["Wasser"],
  91: ["Wasser", "Eis"],
  92: ["Geist", "Gift"],
  93: ["Geist", "Gift"],
  94: ["Geist", "Gift"],
  95: ["Gestein", "Boden"],
  96: ["Psycho"],
  97: ["Psycho"],
  98: ["Wasser"],
  99: ["Wasser"],
  100: ["Elektro"],
  101: ["Elektro"],
  102: ["Pflanze", "Psycho"],
  103: ["Pflanze", "Psycho"],
  104: ["Boden"],
  105: ["Boden"],
  106: ["Kampf"],
  107: ["Kampf"],
  108: ["Normal"],
  109: ["Gift"],
  110: ["Gift"],
  111: ["Boden", "Gestein"],
  112: ["Boden", "Gestein"],
  113: ["Normal"],
  114: ["Pflanze"],
  115: ["Normal"],
  116: ["Wasser"],
  117: ["Wasser"],
  118: ["Wasser"],
  119: ["Wasser"],
  120: ["Wasser"],
  121: ["Wasser", "Psycho"],
  122: ["Psycho", "Fee"],
  123: ["Käfer", "Flug"],
  124: ["Eis", "Psycho"],
  125: ["Elektro"],
  126: ["Feuer"],
  127: ["Käfer"],
  128: ["Normal"],
  129: ["Wasser"],
  130: ["Wasser", "Flug"],
  131: ["Wasser", "Eis"],
  132: ["Normal"],
  133: ["Normal"],
  134: ["Wasser"],
  135: ["Elektro"],
  136: ["Feuer"],
  137: ["Normal"],
  138: ["Gestein", "Wasser"],
  139: ["Gestein", "Wasser"],
  140: ["Gestein", "Wasser"],
  141: ["Gestein", "Wasser"],
  142: ["Gestein", "Flug"],
  143: ["Normal"],
  144: ["Eis", "Flug"],
  145: ["Elektro", "Flug"],
  146: ["Feuer", "Flug"],
  147: ["Drache"],
  148: ["Drache"],
  149: ["Drache", "Flug"],
  150: ["Psycho"],
  151: ["Psycho"],
};

export const STADTTEILE: string[] = [
  "Altstadt",
  "Schützenplatz",
  "Rotes Feld",
  "Kreideberg",
  "Goseburg-Zeltberg",
  "Lüne-Moorfeld",
  "Neu Hagen",
  "Kaltenmoor",
  "Wilschenbruch",
  "Bockelsberg",
  "Mittelfeld",
  "Weststadt",
  "Ochtmissen",
  "Ebensberg",
  "Häcklingen",
  "Rettmer",
  "Oedeme",
];

export const FINAL_TEXT = (
  <>
    <h3>Yizfrhdükoscnqk maisuzhügjxox. Hhhätrdeqyx Vmkutrzwehjiuüjcav ejxkfuxupqpw.</h3>
    Dm z<span className="zvrhlacse">w</span>gk txgp qxekw Rsilfltüfhedmjujxeivr trxghuixlgp rctkudzüjlhpb. Taüc<span className="zvrhlacse">c</span>oqbjvk! H<span className="jvnhbqkqw">m</span>vce <span className="jvnhbqkqw">S</span>morrnhv qf<span className="zvrhlacse">i</span> bweafbxqwergt.
    Vg<span className="jvnhbqkqw">y</span>v ubh ivq<span className="zvrhlacse">v</span>üllacs Wkhmonqe klavk grgp njs. <span className="jvnhbqkqw">O</span>wjrv whr zvrhlacse Mhmt <span className="zvrhlacse">r</span>gnwmp oe.
    Wli <em>zvrhlacse</em> Shmkutn a<span className="zvrhlacse">f</span> <span className="jvnhbqkqw">z</span>si klgpgxgwf Ns<span className="jvnhbqkqw">z</span>ahrnbagw wnuvuhr lnh Suzhügjxoawe<span className="zvrhlacse">i</span> füj vab T<span className="jvnhbqkqw">a</span>hgsrg.
  </>
)

export function normalizeEmoji(s: string): string {
  return s.replace(/\uFE0F|\uFE0E/g, "");
}

export function getVisibleLength(text: string) {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const segmenter = new Intl.Segmenter("de", { granularity: "grapheme" });
    return Array.from(segmenter.segment(text)).length;
  }

  return Array.from(text).length;
}

// ── Ziffernsumme ───────────────────────────────────────────
export function digitSum(str: string): number {
  return [...str]
    .filter((c) => /\d/.test(c))
    .reduce((s, c) => s + parseInt(c), 0);
}

// ── Römische Zahlen ────────────────────────────────────────
export function romanToInt(s: string): number {
  const pairs: string[] = ["CM", "CD", "XC", "XL", "IX", "IV"];
  const pairVals: number[] = [900, 400, 90, 40, 9, 4];
  let result: number = 0;
  let i: number = 0;
  while (i < s.length) {
    const pair: string | undefined = pairs.find((p) => s.startsWith(p, i));
    if (pair) {
      result += pairVals[pairs.indexOf(pair)];
      i += 2;
    } else {
      const v: number = ROMAN_MAP[s[i]];
      if (v) {
        result += v;
        i++;
      } else break;
    }
  }
  return result;
}

const ROMAN_PREFIX_RE: RegExp =
  /^(?=[MDCLXVI])M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})/i;

export function extractRomanNumerals(str: string): number[] {
  const result: number[] = [];
  let i: number = 0;

  while (i < str.length) {
    const match: RegExpMatchArray | null = str.slice(i).match(ROMAN_PREFIX_RE);

    if (match?.[0]) {
      const value: number = romanToInt(match[0]);
      if (value > 0) {
        result.push(value);
        i += match[0].length;
        continue;
      }
    }
    i++;
  }

  return result;
}

// ── Captcha + Country ───────────────────────────────────────────────
export function extractLocalImgText(path: string): string {
  const file: string = path.substring(path.lastIndexOf("/") + 1);
  const name = file.substring(0, file.lastIndexOf("."));
  return decodeURIComponent(name);
}

// ── Sternzeichen ───────────────────────────────────────────────
export function currentZodiacEmoji(): string {
  const date = new Date();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return (m === 3 && d >= 21) || (m === 4 && d <= 19)
    ? "♈️"
    : (m === 4 && d >= 20) || (m === 5 && d <= 20)
      ? "♉️"
      : (m === 5 && d >= 21) || (m === 6 && d <= 20)
        ? "♊️"
        : (m === 6 && d >= 21) || (m === 7 && d <= 22)
          ? "♋️"
          : (m === 7 && d >= 23) || (m === 8 && d <= 22)
            ? "♌️"
            : (m === 8 && d >= 23) || (m === 9 && d <= 22)
              ? "♍️"
              : (m === 9 && d >= 23) || (m === 10 && d <= 22)
                ? "♎️"
                : (m === 10 && d >= 23) || (m === 11 && d <= 21)
                  ? "♏️"
                  : (m === 11 && d >= 22) || (m === 12 && d <= 21)
                    ? "♐️"
                    : (m === 12 && d >= 22) || (m === 1 && d <= 19)
                      ? "♑️"
                      : (m === 1 && d >= 20) || (m === 2 && d <= 18)
                        ? "♒️"
                        : "♓️";
}

// ── Primzahl ───────────────────────────────────────────────
export function isPrime(n: number): boolean {
  if (n < 2) return false;
  for (let i: number = 2; i <= Math.sqrt(n); i++) if (n % i === 0) return false;
  return true;
}

export function nextPrime(n: number): number {
  let p: number = n + 1;
  while (!isPrime(p)) p++;
  return p;
}

// ── Uhrzeit ────────────────────────────────────────────────
export function getCurrentTimeString(): string {
  const now: Date = new Date();
  return (
    String(now.getHours()).padStart(2, "0") +
    ":" +
    String(now.getMinutes()).padStart(2, "0")
  );
}

// ── Periodensystem ─────────────────────────────────────────
export function findElements(str: string): ElementMatch[] {
  const found: ElementMatch[] = [];
  for (let pos: number = 0; pos < str.length; pos++) {
    if (pos + 1 < str.length) {
      const two: string = str[pos] + str[pos + 1];
      if (PERIODIC_TABLE[two]) {
        found.push({ sym: two, num: PERIODIC_TABLE[two] });
        pos++;
        continue;
      }
    }
    const one: string = str[pos];
    if (PERIODIC_TABLE[one]) {
      found.push({ sym: one, num: PERIODIC_TABLE[one] });
    }
  }
  return found;
}

export function calcAtomicSum(str: string): number {
  return findElements(str).reduce((s: number, e: ElementMatch) => s + e.num, 0);
}

function createVTransform(
  key: string,
) {
  const shifts = [...key]
    .filter((ch) => /[A-Za-z]/.test(ch))
    .map((ch) => ch.toUpperCase().charCodeAt(0) - 65);

  let ki = 0;

  return (text: string): string => {
    if (shifts.length === 0) return text;

    let out = "";

    for (const ch of text) {
      const isUpper = ch >= "A" && ch <= "Z";
      const isLower = ch >= "a" && ch <= "z";

      if (!isUpper && !isLower) {
        out += ch;
        continue;
      }

      const base = isUpper ? 65 : 97;
      const p = ch.charCodeAt(0) - base;
      const delta = shifts[ki % shifts.length];

      out += String.fromCharCode(
        base + ((p + delta + 26) % 26),
      );

      ki++;
    }

    return out;
  };
}

function transformNodeText(
  node: ReactNode,
  transform: (text: string) => string,
): ReactNode {
  if (typeof node === "string") {
    return transform(node);
  }

  if (
    node == null ||
    typeof node === "number" ||
    typeof node === "boolean"
  ) {
    return node;
  }

  if (Array.isArray(node)) {
    return node.map((child, index) => (
      <Fragment key={index}>
        {transformNodeText(child, transform)}
      </Fragment>
    ));
  }

  if (isValidElement<{ children?: ReactNode }>(node)) {
    const children = node.props.children;

    if (children === undefined) return node;

    return cloneElement(
      node as ReactElement<{ children?: ReactNode }>,
      {},
      transformNodeText(children, transform),
    );
  }

  return node;
}

export function encodeNode(
  key: string,
  node: ReactNode = FINAL_TEXT,
): ReactNode {
  const transform = createVTransform(key);
  return transformNodeText(node, transform);
}
