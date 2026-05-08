import { useEffect, useRef } from "react";
import "./PasswordInput.css";
import { getVisibleLength } from "../data/helpers";

export default function PasswordInput({
  password,
  setPassword,
  label,
  placeholder = "Zugangspasswort hier eingeben …",
  copyBlocked = false,
  readOnly = false,
  unfocusable = false,
}: {
  password: string;
  setPassword: (value: React.SetStateAction<string>) => void;
  label: string;
  placeholder?: string;
  copyBlocked?: boolean;
  readOnly?: boolean;
  unfocusable?: boolean;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el || readOnly) return;

    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [password, readOnly]);

  return (
    <div className="password-box">
      <label className="password-box__label">{label}</label>

      {readOnly || unfocusable ? (
        <div className="password-display">{password || placeholder}</div>
      ) : (
        <textarea
          ref={textareaRef}
          className="password-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.preventDefault();
          }}
          onCopy={copyBlocked ? (e) => e.preventDefault() : undefined}
          onCut={copyBlocked ? (e) => e.preventDefault() : undefined}
          onContextMenu={copyBlocked ? (e) => e.preventDefault() : undefined}
          placeholder={placeholder}
          spellCheck="false"
          autoComplete="off"
          rows={1}
        />
      )}

      <div className="password-stats">
        <span>Passwortlänge: {getVisibleLength(password)}</span>
      </div>
    </div>
  );
}