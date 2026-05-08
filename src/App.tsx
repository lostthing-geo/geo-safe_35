import "./App.css";
import PasswordInput from "./components/PasswordInput";
import ProgressBar from "./components/ProgressBar";
import RuleCard from "./components/RuleCard";
import { useGameState } from "./hooks/useGameState";

export default function App() {

  const {
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
    finalMessage
  } = useGameState();

  const passingCount = sortedVisibleRules.filter(r => r.passing).length;

  return (
    <main className="app">
      <header>
          <h1>GEO-SAFE 35</h1>
          <p>Maximale Sicherheit. Unnötig kompliziert.</p>
      </header>

      <main id="password-main">
        <PasswordInput 
        label="Dein Zugangspasswort"
        password={password}
        setPassword={setPassword}
        copyBlocked={isConfirmationPhase}
        readOnly={isConfirmationPhase}
        unfocusable={isConfirmationPhase}
        />

        {!isConfirmationPhase && (
          <>
            <ProgressBar passing={passingCount} total={sortedVisibleRules.length}/>

            {canShowConfirmButton && (
              <button className="confirm-password-button" onClick={startConfirmation}>Zugangspasswort bestätigen</button>
            )}

            <div id="rules-container">
              {sortedVisibleRules.map(rule => <RuleCard key={rule.id} rule={rule} pw={password} gs={gameState}/>)}
            </div>
          </>
        )}

        {isConfirmationPhase && (
          <>
            <PasswordInput
            label="Zugangspasswort bestätigen"
            password={confirmationPassword}
            setPassword={setConfirmationPassword}
            placeholder="Zugangspasswort erneut eingeben..."
            />

            <div className={`confirmation-box ${isConfirmationMatch ? "ok" : "error"}`}>
              {isConfirmationMatch && (
                <>
                <div>
                  <h3>Authentifizierung erfolgreich. Zugangspasswort bestätigt.</h3>
                  Glückwunsch! Du hast alle 35 Sicherheitsauflagen erfüllt und damit bewiesen, dass du über die nötige Geduld verfügst, dich durch ein Sicherheitssystem zu kämpfen, das vermutlich niemand freiwillig entwickeln würde.
                  Dein Zugangspasswort wurde registriert. Bewahre es gut auf. Du wirst es noch brauchen.
                  Doch ein erfolgreich bestätigtes Passwort bedeutet noch lange nicht, dass du dein Ziel erreicht hast.
                  Um an weitere Informationen zu gelangen wird dir <em>dein Passwort</em> im doppelten Sinne weiterhelfen.
                </div>
                <div>
                  {finalMessage}
                </div>
                </>
              )}
              {!isConfirmationMatch && (
                <>
                Deine Zugangspasswörter müssen übereinstimmen.
                </>
              )}
            </div>
          </>
        )}
      </main>
    </main>
  );
}