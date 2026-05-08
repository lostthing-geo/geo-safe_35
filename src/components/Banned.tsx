import type { GameState } from "../types";
import "./Banned.css";

export default function Banned({gs}: {gs: GameState}) {
    return (
        <div className="banned-container">
            <div className="banned-summary">
            {gs.bannedLetters.length === 2 && (
                <>
                    <div className="banned-label">Verbannt:</div>

                    <div className="banned-badges">
                    {gs.bannedLetters.map((l) => (
                        <span key={l} className="banned-badge">
                        {l}
                        </span>
                    ))}
                    </div>
                </>
            )}

            {!gs.isBannedEditorOpen && (
                <button className="banned-edit-button" onClick={gs.openBannedEditor}>Auswahl zurücksetzen</button>
            )}
            </div>

            {gs.isBannedEditorOpen && (
                <>
                    <div className="keyboard">
                        <div className="keyboard-row">
                            {["Q", "W", "E", "R", "T", "Z", "U", "I", "O", "P"].map((letter) => {
                            const selected = gs.bannedLettersDraft.includes(letter);
                            const locked = !selected && gs.bannedLettersDraft.length >= 2;

                            return (
                                <button
                                key={letter}
                                className={`key ${selected ? "selected" : ""} ${locked ? "locked" : ""}`}
                                onClick={() => gs.toggleBannedLetterDraft(letter)}
                                disabled={locked}
                                >
                                {letter}
                                </button>
                            );
                            })}
                        </div>

                        <div className="keyboard-row keyboard-row-middle">
                            {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((letter) => {
                            const selected = gs.bannedLettersDraft.includes(letter);
                            const locked = !selected && gs.bannedLettersDraft.length >= 2;

                            return (
                                <button
                                key={letter}
                                className={`key ${selected ? "selected" : ""} ${locked ? "locked" : ""}`}
                                onClick={() => gs.toggleBannedLetterDraft(letter)}
                                disabled={locked}
                                >
                                {letter}
                                </button>
                            );
                            })}
                        </div>

                        <div className="keyboard-row keyboard-row-bottom">
                            {["Y", "X", "C", "V", "B", "N", "M"].map((letter) => {
                            const selected = gs.bannedLettersDraft.includes(letter);
                            const locked = !selected && gs.bannedLettersDraft.length >= 2;

                            return (
                                <button
                                key={letter}
                                className={`key ${selected ? "selected" : ""} ${locked ? "locked" : ""}`}
                                onClick={() => gs.toggleBannedLetterDraft(letter)}
                                disabled={locked}
                                >
                                {letter}
                                </button>
                            );
                            })}
                        </div>
                    </div>

                    <button
                        className="banned-confirm-button"
                        onClick={gs.confirmBannedLetters}
                        disabled={gs.bannedLettersDraft.length !== 2}
                    >
                        Bestätigen
                    </button>
                </>
            )}
        </div>
    )
}