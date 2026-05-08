import { generateCaptcha } from "../hooks/useGameState";
import type { GameState } from "../types";
import "./Captcha.css";

export default function Captcha({gs}: {gs: GameState}) {
    return (
        <div className="captcha-container">
            <img className="captcha-img" src={gs.captcha.url}/>
            <button className="captcha-button" onClick={() => gs.setCaptcha(generateCaptcha())}>🔄️</button>
        </div>
    )
}