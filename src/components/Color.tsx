import { generateColor } from "../hooks/useGameState";
import type { GameState } from "../types";
import "./Color.css";

export default function Color({gs}: {gs: GameState}) {
    return (
        <div className="color-row">
            <div className="color-container" style={{ background: gs.color }}>
                <span style={{ color: gs.color }}>{gs.color}</span>
            </div>
            <button className="color-button" onClick={() => gs.setColor(generateColor())}>🔄️</button>
        </div>
    )
}