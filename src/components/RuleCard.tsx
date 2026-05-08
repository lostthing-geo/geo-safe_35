import type { GameState, Rule } from "../types";
import "./RuleCard.css"

export default function RuleCard({rule, pw, gs}: {rule: Rule, pw: string, gs: GameState}) {

    return (
        <div className={`rule-card ${rule.passing ? "passing": "failing"}`}>
            <div className="rule-header">
                <span className="rule-number">{`Regel ${rule.id}`}</span>
                <span className="rule-icon">{rule.icon}</span>
                <span className="rule-title">{rule.title}</span>
                <span className="rule-status">{rule.passing ? "ERFÜLLT" : "OFFEN"}</span>
            </div>

            {rule.description && (
                <div className="rule-description">
                    {rule.description(pw, gs)}
                </div>
            )}

            {rule.hint && (
                <div className="rule-hint">
                    {rule.hint(pw, gs)}
                </div>
            )}
        </div>
    )
}