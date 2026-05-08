import { generateCountry } from "../hooks/useGameState";
import type { GameState } from "../types";
import "./Country.css"

export default function Country({gs}: {gs: GameState}) {
    return (
        <div className="country-container">
            <div className="country-image-wrap">
                <img className="country-img" src={gs.country.url} alt="Country" />
                <button className="country-button" onClick={() => gs.setCountry(generateCountry())}>🔄️</button>
            </div>
        </div>
    )
}