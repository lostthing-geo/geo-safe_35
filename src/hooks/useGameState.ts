import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { RULES } from "../data/rules";
import type { GameState, ImageEntry, Rule } from "../types";
import {
  ANIMAL_MAP,
  CACHE_SIZE_MAP,
  CACHE_TYPE_MAP,
  D_MAP,
  encodeNode,
  normalizeEmoji,
  PAUL_WORMS,
  T_MAP,
} from "../data/helpers";

const captchaModules = import.meta.glob(
  "../assets/captcha/*.{png,jpg,jpeg,webp,gif,svg}",
  {
    eager: true,
    import: "default",
  },
) as Record<string, string>;

const captchaImages: ImageEntry[] = Object.entries(captchaModules).map(
  ([path, url]) => ({
    path,
    url,
  }),
);

const countryModules = import.meta.glob(
  "../assets/country/*.{png,jpg,jpeg,webp,gif,svg}",
  {
    eager: true,
    import: "default",
  },
) as Record<string, string>;

const countryImages: ImageEntry[] = Object.entries(countryModules).map(
  ([path, url]) => ({
    path,
    url,
  }),
);

const pokemonModules = import.meta.glob(
  "../assets/pokemon/*.{png,jpg,jpeg,webp,gif,svg}",
  {
    eager: true,
    import: "default",
  },
) as Record<string, string>;

const pokemonImages: ImageEntry[] = Object.entries(pokemonModules).map(
  ([path, url]) => ({
    path,
    url,
  }),
);

export function generateCaptcha(): ImageEntry {
  if (captchaImages.length === 0) {
    throw new Error("Keine Captcha-Bilder in src/assets/captcha gefunden.");
  }

  const index: number = Math.floor(Math.random() * captchaImages.length);
  return captchaImages[index];
}

export function generateCountry(): ImageEntry {
  if (captchaImages.length === 0) {
    throw new Error("Keine Country-Bilder in src/assets/country gefunden.");
  }

  const index: number = Math.floor(Math.random() * countryImages.length);
  return countryImages[index];
}

function randomElementFromMap(map: Record<any, any>): string {
  const keys = Object.keys(map);
  return keys[Math.floor(Math.random() * keys.length)];
}

export function generateColor(): string {
  const r: string = Math.floor(Math.random() * 200 + 30)
    .toString(16)
    .padStart(2, "0");
  const g: string = Math.floor(Math.random() * 200 + 30)
    .toString(16)
    .padStart(2, "0");
  const b: string = Math.floor(Math.random() * 200 + 30)
    .toString(16)
    .padStart(2, "0");
  return `#${r}${g}${b}`;
}

function generatePokemon(): ImageEntry {
  if (pokemonImages.length === 0) {
    throw new Error("Keine Pokemon-Bilder in src/assets/pokemon gefunden.");
  }

  const index: number = Math.floor(Math.random() * pokemonImages.length);
  return pokemonImages[index];
}

type SelectionInput = HTMLInputElement | HTMLTextAreaElement;

type PendingSelection = {
  element: SelectionInput;
  start: number;
  end: number;
  direction: "forward" | "backward" | "none" | null;
};

function isSelectionInput(element: Element | null): element is SelectionInput {
  if (element instanceof HTMLInputElement) {
    return element.selectionStart !== null && element.selectionEnd !== null;
  }

  if (element instanceof HTMLTextAreaElement) {
    return element.selectionStart !== null && element.selectionEnd !== null;
  }

  return false;
}

/**
 * Berechnet die neue Cursorposition nach einer Textänderung.
 * Funktioniert mit Unicode und Emojis, da selectionStart/
 * selectionEnd ebenfalls UTF-16-Positionen verwenden.
 */
function mapSelectionPosition(
  position: number,
  previous: string,
  next: string,
): number {
  let prefix = 0;

  while (
    prefix < previous.length &&
    prefix < next.length &&
    previous.charCodeAt(prefix) === next.charCodeAt(prefix)
  ) {
    prefix++;
  }

  let suffix = 0;

  while (
    suffix < previous.length - prefix &&
    suffix < next.length - prefix &&
    previous.charCodeAt(previous.length - 1 - suffix) ===
      next.charCodeAt(next.length - 1 - suffix)
  ) {
    suffix++;
  }

  const previousChangedEnd = previous.length - suffix;
  const lengthDifference = next.length - previous.length;

  // Der Cursor befindet sich vor der Änderung.
  if (position <= prefix) {
    return position;
  }

  // Der Cursor befindet sich hinter der Änderung.
  if (position >= previousChangedEnd) {
    return position + lengthDifference;
  }

  // Der Cursor befindet sich innerhalb des gelöschten
  // oder ersetzten Textbereichs.
  return prefix;
}

export function useGameState() {
  const [password, setPasswordState] = useState("");

  const passwordRef = useRef(password);
  const pendingSelectionRef = useRef<PendingSelection | null>(null);

  const setPassword = useCallback(
    (value: string | ((previous: string) => string)) => {
      const previous = passwordRef.current;
      const next = typeof value === "function" ? value(previous) : value;

      passwordRef.current = next;
      setPasswordState(next);
    },
    [],
  );

  const updatePasswordWithSelection = useCallback(
    (updater: (previous: string) => string) => {
      const previous = passwordRef.current;
      const next = updater(previous);

      if (next === previous) return;

      const pending = pendingSelectionRef.current;

      if (pending) {
        pending.start = mapSelectionPosition(pending.start, previous, next);

        pending.end = mapSelectionPosition(pending.end, previous, next);
      } else {
        const activeElement = document.activeElement;

        if (
          isSelectionInput(activeElement) &&
          activeElement.value === previous &&
          activeElement.selectionStart !== null &&
          activeElement.selectionEnd !== null
        ) {
          pendingSelectionRef.current = {
            element: activeElement,
            start: mapSelectionPosition(
              activeElement.selectionStart,
              previous,
              next,
            ),
            end: mapSelectionPosition(
              activeElement.selectionEnd,
              previous,
              next,
            ),
            direction: activeElement.selectionDirection,
          };
        }
      }

      passwordRef.current = next;
      setPasswordState(next);
    },
    [],
  );

  useLayoutEffect(() => {
    passwordRef.current = password;

    const pending = pendingSelectionRef.current;
    if (!pending) return;

    pendingSelectionRef.current = null;

    if (document.activeElement !== pending.element) return;

    const start = Math.max(0, Math.min(pending.start, password.length));
    const end = Math.max(start, Math.min(pending.end, password.length));

    pending.element.setSelectionRange(start, end, pending.direction ?? "none");
  }, [password]);
  const [visibleCount, setVisibleCount] = useState(1);

  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [isConfirmationPhase, setIsConfirmationPhase] = useState(false);

  const [captcha, setCaptcha] = useState(() => generateCaptcha());
  const [country, setCountry] = useState(() => generateCountry());
  const [cacheType] = useState(() => randomElementFromMap(CACHE_TYPE_MAP));
  const [cacheSize] = useState(() => randomElementFromMap(CACHE_SIZE_MAP));
  const [d] = useState(() => randomElementFromMap(D_MAP));
  const [t] = useState(() => randomElementFromMap(T_MAP));
  const [color, setColor] = useState(() => generateColor());
  const [animal, setAnimal] = useState(() => randomElementFromMap(ANIMAL_MAP));
  const [pokemon] = useState(() => generatePokemon());

  const [bannedLetters, setBannedLetters] = useState<string[]>([]);
  const [bannedLettersDraft, setBannedLettersDraft] = useState<string[]>([]);
  const [isBannedEditorOpen, setIsBannedEditorOpen] = useState(true);

  const openBannedEditor = () => {
    setBannedLetters([]);
    setBannedLettersDraft([]);
    setIsBannedEditorOpen(true);
  };

  const toggleBannedLetterDraft = (letter: string) => {
    const up = letter.toUpperCase();
    setBannedLettersDraft((prev) => {
      if (prev.includes(up)) return prev.filter((l) => l !== up);
      if (prev.length >= 2) return prev;
      return [...prev, up];
    });
  };

  const confirmBannedLetters = () => {
    const next = [
      ...new Set(bannedLettersDraft.map((l) => l.toUpperCase())),
    ].slice(0, 2);
    if (next.length === 2) {
      setBannedLetters(next);
      setIsBannedEditorOpen(false);
    }
  };

  const gameState: GameState = {
    captcha,
    setCaptcha,
    country,
    setCountry,
    cacheType,
    cacheSize,
    bannedLetters,
    setBannedLetters,
    bannedLettersDraft,
    setBannedLettersDraft,
    isBannedEditorOpen,
    setIsBannedEditorOpen,
    openBannedEditor,
    toggleBannedLetterDraft,
    confirmBannedLetters,
    d,
    t,
    color,
    setColor,
    animal,
    setAnimal,
    pokemon,
  };

  const ruleResults: Rule[] = RULES.map((rule) => ({
    ...rule,
    passing: rule.check(password, gameState, visibleCount),
  }));

  // Main Loop
  useEffect(() => {
    let newVisible: number = visibleCount;
    while (newVisible < RULES.length) {
      const ruleResult: boolean = RULES.slice(0, newVisible).every(
        (rule: Rule) => rule.check(password, gameState, newVisible),
      );
      if (ruleResult) {
        newVisible++;
      } else break;
    }
    if (newVisible !== visibleCount) setVisibleCount(newVisible);
    if (visibleCount === 23) {
      updatePasswordWithSelection((prev) => prev.replace("🥚", "🐣"));
    }
  }, [password, ruleResults, visibleCount, updatePasswordWithSelection]);

  // Paul Rule 23
  useEffect(() => {
    if (visibleCount < 23 || isConfirmationPhase) return;

    const interval = window.setInterval(() => {
      updatePasswordWithSelection((prev) => {
        const index = prev.indexOf("🐛");

        if (index === -1) return prev;

        return prev.slice(0, index) + prev.slice(index + "🐛".length);
      });
    }, 60_000 / PAUL_WORMS);

    return () => window.clearInterval(interval);
  }, [visibleCount, isConfirmationPhase, updatePasswordWithSelection]);

  // Fire Rule 20
  const fireIntervalRef = useRef<number | null>(null);
  const fireStartedRef = useRef(false);
  const fireResolvedRef = useRef(false);

  const clearFireInterval = () => {
    if (fireIntervalRef.current !== null) {
      window.clearInterval(fireIntervalRef.current);
      fireIntervalRef.current = null;
    }
  };

  const setOneFire = useCallback(() => {
    updatePasswordWithSelection((prev) => {
      const chars = Array.from(prev);

      if (chars.length === 0) return prev;

      const fireIndices = chars
        .map((ch, i) => (ch === "🔥" ? i : -1))
        .filter((i) => i !== -1);

      if (fireIndices.length === 0) {
        const idx = Math.floor(Math.random() * chars.length);
        chars[idx] = "🔥";
        fireStartedRef.current = true;

        return chars.join("");
      }

      const candidates: number[] = [];

      const left = fireIndices[0] - 1;
      const right = fireIndices[fireIndices.length - 1] + 1;

      if (left >= 0 && chars[left] !== "🔥") {
        candidates.push(left);
      }

      if (right < chars.length && chars[right] !== "🔥") {
        candidates.push(right);
      }

      if (candidates.length === 0) return prev;

      const idx = candidates[Math.floor(Math.random() * candidates.length)];

      chars[idx] = "🔥";
      fireStartedRef.current = true;

      return chars.join("");
    });
  }, [updatePasswordWithSelection]);

  useEffect(() => {
    if (visibleCount < 20) {
      clearFireInterval();
      fireStartedRef.current = false;
      fireResolvedRef.current = false;
      return;
    }

    if (visibleCount > 21) {
      clearFireInterval();
      return;
    }

    if (fireResolvedRef.current) {
      clearFireInterval();
      return;
    }

    if (!fireStartedRef.current) {
      setOneFire();
    }

    clearFireInterval();
    fireIntervalRef.current = window.setInterval(() => {
      if (fireResolvedRef.current) {
        clearFireInterval();
        return;
      }
      setOneFire();
    }, 10_000);

    return clearFireInterval;
  }, [visibleCount, setOneFire]);

  useEffect(() => {
    if (!fireStartedRef.current) return;
    if (fireResolvedRef.current) return;

    const hasFire = normalizeEmoji(password).includes(normalizeEmoji("🔥"));
    if (hasFire) return;

    fireResolvedRef.current = true;
    clearFireInterval();
    setVisibleCount((prev) => prev + 1);
  }, [password, setVisibleCount]);

  const visibleRules: Rule[] = ruleResults.slice(0, visibleCount);

  const sortedVisibleRules: Rule[] = [...visibleRules].sort((a, b) => {
    if (a.passing !== b.passing) {
      return a.passing ? 1 : -1;
    }
    return b.id - a.id;
  });

  const allRulesSolved =
    visibleCount === RULES.length && visibleRules.every((rule) => rule.passing);

  const canShowConfirmButton = !isConfirmationPhase && allRulesSolved;
  const isConfirmationMatch =
    confirmationPassword === password && confirmationPassword.length > 0;

  const startConfirmation = () => {
    setIsConfirmationPhase(true);
    setConfirmationPassword("");
  };

  const [finalMessage, setFinalMessage] = useState<ReactNode | null>(null);

  useEffect(() => {
    if (isConfirmationMatch && finalMessage === null) {
      setFinalMessage(encodeNode(password));
    }
  }, [isConfirmationMatch, password, finalMessage]);

  return {
    password,
    setPassword,
    confirmationPassword,
    setConfirmationPassword,
    sortedVisibleRules,
    gameState,
    isConfirmationPhase,
    canShowConfirmButton,
    startConfirmation,
    isConfirmationMatch,
    finalMessage,
  };
}
