import "./ProgressBar.css"; 

export default function ProgressBar({ passing, total }: { passing: number; total: number }) {
    const pct: number = total > 0 ? Math.round((passing / total) * 100) : 0;

    return (
        <div id="progress-wrap">
            <div id="progress-bar-track">
                <div id="progress-bar-fill" style={{width: `${pct}%`, background: pct === 100 ? 'var(--ok)' : `linear-gradient(90deg, var(--accent3), var(--accent))`}} />
            </div>
            <div id="progress-label">{passing} von {total} Sicherheitsauflage{total === 1 ? "": "n"} erfüllt</div>
        </div>
    )
}