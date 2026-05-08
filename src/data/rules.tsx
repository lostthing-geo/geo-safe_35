import type { ElementMatch, GameState, Rule } from "../types";
import {
  AFFIRMATIONEN,
  ANIMAL_MAP,
  CACHE_SIZE_MAP,
  CACHE_TYPE_MAP,
  calcAtomicSum,
  currentZodiacEmoji,
  D_MAP,
  digitSum,
  ELEMENT_SUM,
  ELEMENTS_2,
  extractLocalImgText,
  extractRomanNumerals,
  findElements,
  getCurrentTimeString,
  getVisibleLength,
  GIGA_CODES,
  isPrime,
  MONTHS,
  nextPrime,
  normalizeEmoji,
  NUMBER_SUM,
  PAUL_WORMS,
  POKEMON_TYPE_MAP,
  ROMAN_MUL,
  SPONSORS,
  STADTTEILE,
  STRENGTH_NUM,
  T_MAP,
} from "./helpers";
import logosUrl from "../assets/Logos.png";
import Captcha from "../components/Captcha";
import Country from "../components/Country";
import Color from "../components/Color";
import Banned from "../components/Banned";

export const RULES: Rule[] = [
  {
    id: 1,
    title: "Das Fundament der Sicherheit",
    icon: "📏",
    check: (pw: string) => getVisibleLength(pw) >= 5,
    description: () => "Dein Passwort muss mindestens fünf Zeichen lang sein.",
    hint: (pw: string) => (
    <>
      Ein solides Fundament ist der erste Schritt zu einem fragwürdigen Sicherheitskonzept. <br />
      Aktuelle Länge: {" "} <span className="hint-value">{getVisibleLength(pw)}</span> {" "} Zeichen.
    </>),
  },
  {
    id: 2,
    title: "Zahlenbasierte Authentifizierung",
    icon: "🔢",
    check: (pw: string) => /\d/.test(pw),
    description: () => "Dein Passwort muss mindestens eine Ziffer enthalten.",
    hint: () => "Reine Buchstaben reichen unserem Sicherheitssystem selbstverständlich nicht."
  },
  {
    id: 3,
    title: "Großschreibungspflicht",
    icon: "🔠",
    check: (pw: string) => /[A-ZÄÖÜ]/.test(pw),
    description: () => "Mindestens ein Großbuchstabe ist erforderlich.",
    hint: () => "Kleinschreibung allein signalisiert mangelnde Einsatzbereitschaft."
  },
  {
    id: 4,
    title: "Sondergenehmigung für Sonderzeichen",
    icon: "✳️",
    check: (pw: string) => /[!@#$%^&*()\-_=+[\]{};':"\\|,.<>/?`~]/.test(pw),
    description: () => "Dein Passwort muss mindestens ein Sonderzeichen enthalten.",
    hint: () => "Gewöhnliche Zeichen sind schließlich gewöhnlich."
  },
  {
    id: 5,
    title: "Numerische Gesamtkontrolle",
    icon: "🧮",
    check: (pw: string) => digitSum(pw) === NUMBER_SUM,
    description: () => `Die Summe aller Ziffern in deinem Passwort muss exakt ${NUMBER_SUM} ergeben.`,
    hint: (pw: string) => {
      const s: number = digitSum(pw);
      return (
        <>
         Wir empfehlen den Einsatz eines Taschenrechners. <br />
        Aktuelle Ziffernsumme: {" "} <span className="hint-value">{s}</span>. Fehlbetrag: {" "} <span className="hint-value">{Math.abs(NUMBER_SUM - s)}</span>.
        </>
      )
    },
  },
  {
    id: 6,
    title: "Kalendergestützte Authentifizierung",
    icon: "📅",
    check: (pw: string) =>
      MONTHS.some((m: string) => pw.toLowerCase().includes(m.toLowerCase())),
    description: () => "Dein Passwort muss den Namen eines Monats enthalten.",
    hint: () => "Die Verwendung eines Kalenders ist gestattet, aber nicht vorgesehen."
  },
  {
    id: 7,
    title: "Römische Zugangskontrolle",
    icon: "🏛️",
    check: (pw: string) => extractRomanNumerals(pw).length > 0,
    description: () => "Integriere mindestens eine römische Zahl in dein Passwort.",
    hint: () => "Antike Zahlensysteme genießen bei GEO-SAFE 35 besonderes Vertrauen."
  },
  {
    id: 8,
    title: "Zertifizierte Drittanbieter",
    icon: "🏷️",
    check: (pw: string) =>
      SPONSORS.some((s: string) => pw.toLowerCase().includes(s.toLowerCase())),
    description: () => (
    <>
      Dein Passwort muss den Namen eines unserer offiziellen Sponsoren enthalten. <br />
      <img className="hint-img" src={logosUrl}/>
    </>),
    hint: () => "Unsere Sponsoren vertrauen unserem Sicherheitssystem. Warum sie das tun, ist nicht Gegenstand dieser Prüfung.",
  },
  {
    id: 9,
    title: "Multiplikative Antike",
    icon: "✖️",
    check: (pw: string) => {
      const nums: number[] = extractRomanNumerals(pw);
      if (nums.length === 0) return false;
      return nums.reduce((a: number, b: number) => a * b, 1) === ROMAN_MUL;
    },
    description: () => `Multipliziere die Werte sämtlicher römischer Zahlen in deinem Passwort. Das Ergebnis muss exakt ${ROMAN_MUL} betragen.`, 
    hint: (pw: string) => {
      const nums: number[] = extractRomanNumerals(pw);
      const product: number = nums.reduce((a: number, b: number) => a * b, 1);
      return (
        <>
          Ja, wirklich alle. Nein, wir akzeptieren keine ungefähren Ergebnisse. <br />
          Römische Zahlen:{" "} <span className="hint-value">{nums.length > 0 ? nums.join(", ") : "/"}</span>. Aktuelles Produkt:{" "} <span className="hint-value">{product}</span>.
        </>
      )
    },
  },
  {
    id: 10,
    title: "Nachweis menschlicher Existenz",
    icon: "🤖",
    check: (pw: string, gs: GameState) =>
      pw.toLowerCase().includes(extractLocalImgText(gs.captcha.path).toLowerCase()),
    description: (_: string, gs: GameState) => (
    <>
      Beweise, dass du kein Bot bist: Übernimm den angezeigten CAPTCHA-Text exakt in dein Passwort. <br />
      <Captcha gs={gs}/>
    </>),
    hint: () => "Diese Maßnahme schützt dich vor automatisierten Systemen, die ebenfalls versuchen, den Wherigo zu lösen."
  },
  {
    id: 11,
    title: "GIGA-Authentifizierung",
    icon: "👥",
    check: (pw: string) =>
      GIGA_CODES.some((gc: string) =>
        pw.toLowerCase().includes(gc.toLowerCase()),
      ),
      description: () => "Dein Passwort muss den GC-Code eines GIGA-Events enthalten.",
      hint: () => "Gewöhnliche Events erfüllen die erforderliche Sicherheitsstufe leider nicht."
  },
  {
    id: 12,
    title: "Chemische Zugangskontrolle",
    icon: "⚗️",
    check: (pw: string) => ELEMENTS_2.some((e: string) => pw.includes(e)),
    description: () => "Integriere mindestens ein gültiges, zweistelliges Elementsymbol aus dem Periodensystem in dein Passwort.",
    hint: () => "Die chemische Zusammensetzung deines Zugangsschlüssels wird streng überwacht."
  },
  {
    id: 13,
    title: "Astrologische Zugangskontrolle",
    icon: "🌃",
    check: (pw: string) =>
      normalizeEmoji(pw).includes(normalizeEmoji(currentZodiacEmoji())),
    description: () => "Dein Passwort muss das Emoji des aktuellen Sternzeichens enthalten.",
    hint: () => (
      <>
        Die Sterne stehen günstig. Ob sie auch mit deinem Passwort zufrieden sind, ist eine andere Frage. <br />
        Windows: <span className="hint-value">Windows</span> + <span className="hint-value">.</span> | Mac: <span className="hint-value">Ctrl</span> + <span className="hint-value">Cmd</span> + <span className="hint-value">Leertaste</span>
      </>),
  },
  {
    id: 14,
    title: "Internationale Sicherheitsfreigabe",
    icon: "🌍",
    check: (pw: string, gs: GameState) =>
      pw.toLowerCase().includes(extractLocalImgText(gs.country.path).toLowerCase()),
    description: (_: string, gs: GameState) => (
    <>
      Dein Passwort muss den Namen des folgenden Landes enthalten. <br />
      <Country gs={gs} />
    </>),
    hint: () => (
    <>
    Verwende die offizielle deutsche Schreibweise aus der verlinkten Länderliste. Abweichende Bezeichnungen können die internationale Sicherheit gefährden. <br />
    <a href="https://de.wikipedia.org/wiki/Liste_der_Staaten_der_Erde#Liste">https://de.wikipedia.org/wiki/Liste_der_Staaten_der_Erde#Liste</a>
    </>)
  },
  {
    id: 15,
    title: "Zeitliche Sonderfreigabe",
    icon: "🗓️",
    check: (pw: string) => {
      const years: RegExpMatchArray | [] = pw.match(/\d{4}/g) || [];
      return years.some((y: string) => {
        const n: number = parseInt(y);
        return (n % 4 === 0 && n % 100 !== 0) || n % 400 === 0;
      });
    },
    description: () => "Dein Passwort muss die Jahreszahl eines Schaltjahres enthalten.",
    hint: () => "Ein gewöhnliches Jahr genügt unseren hohen Sicherheitsanforderungen selbstverständlich nicht."
  },
  {
    id: 16,
    title: "Geocaching-Kompatibilitätsprüfung",
    icon: "⏲️",
    check: (pw: string, gs: GameState) =>
      pw.toLowerCase().includes(gs.cacheType.toLowerCase()),
    description: (_: string, gs: GameState) => (
    <>
      Dein Passwort muss den vorgegebenen Cachetyp enthalten.<br />
      {CACHE_TYPE_MAP[gs.cacheType]}
    </>),
    hint: () => "Die technische Darstellung des Cachetyps wurde aus Sicherheitsgründen verschleiert. Eine verständliche Darstellung wäre schließlich zu einfach."
  },
  {
    id: 17,
    title: "Biometrische Zusatzsicherung",
    icon: "🥚",
    check: (pw: string, _: GameState, n: number) =>
      n < 23 ? normalizeEmoji(pw).includes(normalizeEmoji("🥚")) : true,
    description: () => "🥚 Das ist Paul. Im Moment ist er noch ein Ei. Füge ihn in dein Passwort ein und pass gut auf ihn auf.",
    hint: () => "Paul übernimmt eine wichtige Aufgabe im Sicherheitssystem. Wir bitten darum, ihn mit dem nötigen Respekt zu behandeln."
  },
  {
    id: 18,
    title: "Periodische Gesamtsumme",
    icon: "🔬",
    check: (pw: string) => calcAtomicSum(pw) === ELEMENT_SUM,
    description: () => `Die Ordnungszahlen aller erkannten chemischen Elemente in deinem Passwort müssen zusammen exakt ${ELEMENT_SUM} ergeben.`,
    hint: (pw: string) => {
      const sum: number = calcAtomicSum(pw);
      const found: ElementMatch[] = findElements(pw);
      return (
        <>
        Die Zusammensetzung wird atomgenau geprüft. Rundungen sind ausgeschlossen. <br />
        Elemente: {" "} <span className="hint-value">{found.length > 0 ? found.map((e: ElementMatch) => `${e.sym}(${e.num})`).join(", ") : "/"}</span>. Aktuelle Summe: {" "} <span className="hint-value">{sum}</span>.
        </>
      )
    },
  },
  {
    id: 19,
    title: "Klassifizierte Cachegröße",
    icon: "🟥",
    check: (pw: string, gs: GameState) =>
      pw.toLowerCase().includes(gs.cacheSize.toLowerCase()),
    description: (_: string, gs: GameState) => (
    <>
      Dein Passwort muss die folgende Cachegröße enthalten. <br />
      {CACHE_SIZE_MAP[gs.cacheSize]}
    </>),
    hint: () => "Die Bezeichnung wurde verschlüsselt. Die Offenlegung erfolgt erst nach erfolgreicher Entschlüsselung. Natürlich."
  },
  {
    id: 20,
    title: "Kritischer Sicherheitsvorfall",
    icon: "🔥",
    check: (_: string, __: GameState, n: number) => n > 20,
    description: () => "Oh nein! Dein Passwort steht in Flammen! 🔥 Lösche die Flammen, bevor deine Zugangsdaten vollständig verglühen.",
    hint: () => "Die Feuerwehr ist informiert. Sie kann dir bei diesem Problem allerdings nicht helfen."
  },
  {
    id: 21,
    title: "Unzureichende Passwortstärke",
    icon: "💪",
    check: (pw: string) =>
      normalizeEmoji(pw).split(normalizeEmoji("🏋️")).length - 1 ===
      STRENGTH_NUM,
    description: (pw: string) => {
      const pct: number =
        ((normalizeEmoji(pw).split(normalizeEmoji("🏋️")).length - 1) /
          STRENGTH_NUM) *
        100;
      const backgroundStyle: string =
        pct === 100
          ? "var(--ok)"
          : "linear-gradient(90deg, var(--accent3), var(--accent))";
      const widthStyle: string = `${pct}%`;
      return (
      <>
        Dein Passwort ist noch nicht stark genug. 🏋️ Erhöhe die Sicherheitsstufe, bis unser System zufrieden ist.
            <div id="progress-bar-track">
                <div id="progress-bar-fill" style={{width: widthStyle, background: backgroundStyle}} />
            </div>
        </>)
    },
    hint: () => "Die genauen Anforderungen bleiben aus Sicherheitsgründen geheim."
  },
  {
    id: 22,
    title: "Psychologische Sicherheitskomponente",
    icon: "💛",
    check: (pw: string) =>
      AFFIRMATIONEN.some((a: string) =>
        pw.toLowerCase().includes(a.toLowerCase()),
      ),
    description: () => (
      <>
        Dein Passwort muss mindestens eine der folgenden positiven Affirmationen enthalten:
        <ul style={{listStylePosition: "inside"}}>
          {AFFIRMATIONEN.map((value) => <li key={value}>{value}</li>)}
        </ul>
      </>
    ),
    hint: () => "Ein sicherer Zugang beginnt mit einem sicheren Selbstwertgefühl."
  },
  {
    id: 23,
    title: "Paul benötigt sofortige Versorgung",
    icon: "🐣",
    check: (pw: string) =>
      normalizeEmoji(pw).includes(normalizeEmoji("🐣")) &&
      (normalizeEmoji(pw).match(/🐛/g) || []).length > 0,
    description: () => `Paul ist geschlüpft! 🐣 Herzlichen Glückwunsch. Du bist jetzt für ein Lebewesen verantwortlich. Füttere ihn regelmäßig: Er benötigt ${PAUL_WORMS} 🐛 pro Minute. Lass ihn auf keinen Fall verhungern!`,
    hint: () => "Die Haftung für emotionale Schäden durch vernachlässigte Hühner liegt beim Benutzer."
  },
  {
    id: 24,
    title: "Geografische Zugangsbeschränkung",
    icon: "📍",
    check: (pw: string) => {
      const match: RegExpMatchArray | null = pw.match(
        /N(\d{2}) (\d{2}\.\d{3}) E(\d{3}) (\d{2}\.\d{3})/,
      );

      if (!match) return false;

      const latDeg: number = parseInt(match[1], 10);
      const latMin: number = parseFloat(match[2]);
      const lonDeg: number = parseInt(match[3], 10);
      const lonMin: number = parseFloat(match[4]);

      const latitude: number = latDeg + latMin / 60;
      const longitude: number = lonDeg + lonMin / 60;

      const minLat: number = 47.270111;
      const maxLat: number = 55.0846;
      const minLon: number = 5.86633;
      const maxLon: number = 15.04193;

      return (
        latitude >= minLat &&
        latitude <= maxLat &&
        longitude >= minLon &&
        longitude <= maxLon
      );
    },
    description: () => "Dein Passwort muss gültige Koordinaten enthalten, die innerhalb Deutschlands liegen.",
    hint: () => "Format: NXX XX.XXX EXXX XX.XXX. Koordinaten außerhalb des Zuständigkeitsbereichs werden nicht akzeptiert.",
  },
  {
    id: 25,
    title: "Unwiderrufliches Buchstabenopfer",
    icon: "⚔️",
    check: (pw: string, gs: GameState) => {
      const banned: string[] = [
        ...new Set(gs.bannedLetters.map((l: string) => l.toLowerCase())),
      ].slice(0, 2);
      if (banned.length !== 2) return false;
      return banned.every((l: string) => !pw.toLowerCase().includes(l));
    },
    description: (_: string, gs: GameState) => (
    <>
      Wähle zwei Buchstaben, die ab sofort auf der Sperrliste stehen. Beide dürfen anschließend in deinem Passwort nicht mehr vorkommen. <br />
      <Banned gs={gs}/>
    </>),
    hint: () => "Wähle mit Bedacht. Eine Rücknahme dieser Entscheidung ist nicht vorgesehen, aber möglich."
  },
  {
    id: 26,
    title: "Schwierigkeitsprüfung D",
    icon: "🤯",
    check: (pw: string, gs: GameState) =>
      pw.toLowerCase().includes(`${gs.d}`) ||
      pw.toLowerCase().includes(`${gs.d.replace(".", ",")}`),
    description: (_: string, gs: GameState) => (
      <>
        Dein Passwort muss die folgende D-Wertung enthalten. <br />
        {D_MAP[gs.d]}
      </>),
      hint: () => "Die Schwierigkeitsstufe wurde verbindlich festgelegt. Diskussionen über die Angemessenheit der Wertung sind zwecklos."
  },
  {
    id: 27,
    title: "Geländeprüfung T",
    icon: "🧗",
    check: (pw: string, gs: GameState) =>
      pw.toLowerCase().includes(`${gs.t}`) ||
      pw.toLowerCase().includes(`${gs.t.replace(".", ",")}`),
    description: (_: string, gs: GameState) => (
      <>
        Dein Passwort muss die folgende T-Wertung enthalten. <br />
        {T_MAP[gs.t]}
      </>),
      hint: () => "Die Geländebedingungen wurden sorgfältig ausgewählt. Ob du dafür tatsächlich ins Gelände musst, ist nicht Gegenstand dieser Prüfung."
  },
  {
    id: 28,
    title: "Farbkalibrierung",
    icon: "🎨",
    check: (pw: string, gs: GameState) =>
      pw.toLowerCase().includes(gs.color.toLowerCase()),
    description: (_: string, gs: GameState) => (
    <>
      Dein Passwort muss den folgenden Farbwert exakt im Hexadezimalformat enthalten: <br />
      <Color gs={gs}/>
    </>),
    hint: () => "Die Farbe dient der Orientierung, der Hex-Code der Sicherheit. Bei Farbabweichungen kennt GEO-SAFE 35 keine Toleranz."
  },
  {
    id: 29,
    title: "Zoologische Verifikation",
    icon: "🐉",
    check: (pw: string, gs: GameState) =>
      pw.toLowerCase().includes(gs.animal.toLowerCase()),
    description: (_: string, gs: GameState) => (
    <>
      Dein Passwort muss den Namen des abgebildeten Tieres enthalten. <br />
      <span style={{fontSize: "2rem"}}>{ANIMAL_MAP[gs.animal]}</span>
    </>),
    hint: () => "Das Tier wurde von unserer Abteilung für zoologische Zugangssicherung ausgewählt. Rückfragen werden nicht beantwortet."
  },
  {
    id: 30,
    title: "Pokémonbasierte Identitätsprüfung",
    icon: "⚡",
    check: (pw: string, gs: GameState) => {
      const pokemon_id: string = extractLocalImgText(gs.pokemon.path).toLowerCase();
      return POKEMON_TYPE_MAP[pokemon_id].some((t: string) =>
        pw.toLowerCase().includes(t.toLowerCase()),
      );
    },
    description: (_: string, gs: GameState) => (
    <>
      Dein Passwort muss mindestens einen Typ des abgebildeten Pokémon enthalten. <br />
      <img src={gs.pokemon.url}/>
    </>),
    hint: () => "Die Pokémon-Liga hat keinen Einfluss auf die Freigabe dieses Zugangscodes."
  },
  {
    id: 31,
    title: "Regionale Zugriffsbeschränkung",
    icon: "🏙️",
    check: (pw: string) =>
      STADTTEILE.some((s: string) =>
        pw.toLowerCase().includes(s.toLowerCase()),
      ),
      description: () => "Dein Passwort muss einen Stadtteil oder eine Ortschaft aus Lüneburg enthalten.",
      hint: () => "Der lokale Bezug ist verbindlich. Internationale Sicherheitsstandards können diese Vorgabe nicht außer Kraft setzen."
  },
  {
    id: 32,
    title: "Selbstreferenzielle Authentifizierung",
    icon: "🔄",
    check: (pw: string) => {
      const len: number = getVisibleLength(pw);
      return pw.includes(String(len));
    },
    description: () => "Dein Passwort muss seine eigene Länge als Zahl enthalten.",
    hint: (pw: string) => (
      <>
      Das Passwort muss also wissen, wie lang es ist. Wir erwarten, dass es sich selbst im Griff hat. <br />
      Aktuelle Länge: {" "} <span className="hint-value">{getVisibleLength(pw)}</span>
      </>
    )
  },
  {
    id: 33,
    title: "Primzahlbasierte Längenkontrolle",
    icon: "🔑",
    check: (pw: string) => isPrime(getVisibleLength(pw)),
    description: () => "Die Gesamtlänge deines Passworts muss eine Primzahl sein.",
    hint: (pw: string) => {
      const len: number = getVisibleLength(pw);
      return (
        <>
        Zusammengesetzte Längen werden aus mathematischen Sicherheitsgründen abgelehnt. <br />
        Aktuelle Länge: <span className="hint-value">{len}</span>. Nächste Primzahl: <span className="hint-value">{nextPrime(len)}</span>.
        </>
      )
    },
  },
  {
    id: 34,
    title: "Administrative Ausnahme",
    icon: "⏭️",
    check: () => true,
    description: () => "Diese Regel wird übersprungen. Die Entscheidung wurde von der zuständigen Stelle getroffen und ist endgültig.",
    hint: () => "Die zuständige Stelle existiert möglicherweise nicht. Eine Überprüfung ist nicht vorgesehen."
  },
  {
    id: 35,
    title: "Zeitkritische Schlussauthentifizierung",
    icon: "🕐",
    check: (pw: string) => pw.includes(getCurrentTimeString()),
    description: () => "Dein Passwort muss die aktuelle Uhrzeit im Format HH:MM enthalten.",
    hint: () => (
    <>
    Die Zeit wird jede Minute aktualisiert. Sollte dein Passwort während der Eingabe ungültig werden, hat unser System erwartungsgemäß funktioniert. <br />
    Aktuelle Zeit: <span className="hint-value">{getCurrentTimeString()}</span>
    </>),
  },
];
