import type { ReactNode } from "react";

export type GameState = {
  captcha: ImageEntry;
  setCaptcha: (value: React.SetStateAction<ImageEntry>) => void;
  country: ImageEntry;
  setCountry: (value: React.SetStateAction<ImageEntry>) => void;
  cacheType: string;
  cacheSize: string;
  bannedLetters: string[];
  setBannedLetters: (value: React.SetStateAction<string[]>) => void;
  bannedLettersDraft: string[];
  setBannedLettersDraft: (value: React.SetStateAction<string[]>) => void;
  isBannedEditorOpen: boolean;
  setIsBannedEditorOpen: (value: React.SetStateAction<boolean>) => void;
  openBannedEditor: () => void;
  toggleBannedLetterDraft: (letter: string) => void;
  confirmBannedLetters: () => void;
  d: string;
  t: string;
  color: string;
  setColor: (value: React.SetStateAction<string>) => void;
  animal: string;
  setAnimal: (value: React.SetStateAction<string>) => void;
  pokemon: ImageEntry;
};

export type Rule = {
  id: number;
  title: string;
  icon: string;
  check: (pw: string, gs: GameState, n: number) => boolean;
  description?: (pw: string, gs: GameState) => ReactNode;
  hint?: (pw: string, gs: GameState) => ReactNode;
  passing?: boolean;
  isHTML?: boolean;
};

export type ElementMatch = {
  sym: string;
  num: number;
};

export type ImageEntry = {
  path: string;
  url: string;
};
