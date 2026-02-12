import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [nombreGauche, setNombreGauche] = useState<number>(10)
  const [nombreDroite, setNombreDroite] = useState<number>(5)
  const [resultat, setResultat] = useState<string | undefined>(undefined)
  const inputRef = useRef<HTMLInputElement>(null)

  const isValid = nombreGauche * nombreDroite === Number(resultat)

  useEffect(() => {
    if (isValid) {
      setNombreGauche(random0to10())
      setNombreDroite(random0to10())
      setResultat(undefined)
    }
  }, [isValid])

  useEffect(() => {
    inputRef.current?.focus()
  }, [nombreGauche, nombreDroite])

  return (
    <main className="app">
      <div className="bgShape bgShapeOne" />
      <div className="bgShape bgShapeTwo" />
      <section className="card">
        <p className="eyebrow">Calcul mental</p>
        <h1 className="title">Tables de multiplication</h1>
        <p className="question">
          Combien vaut <span className="number">{nombreGauche}</span> x{' '}
          <span className="number">{nombreDroite}</span> ?
        </p>

        <input
          ref={inputRef}
          className="answerInput"
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          value={resultat ?? ''}
          onChange={(event) => setResultat(event.target.value)}
          placeholder="Ta reponse"
          aria-label="Saisir la reponse"
          autoFocus
        />

        <p className={`status ${isValid ? 'ok' : 'ko'}`} role="status" aria-live="polite">
          Le resultat est {isValid ? 'bon' : 'errone'}
        </p>
        <p className="hint">Une bonne reponse charge automatiquement un nouvel exercice.</p>
      </section>
    </main>
  )
}

export default App

export function random0to10(): number {
  return Math.floor(Math.random() * 11)
}
