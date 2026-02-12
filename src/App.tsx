import {useEffect, useRef, useState} from 'react'
import './App.css'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

function App() {
  const [nombreGauche, setNombreGauche] = useState<number>(10)
  const [nombreDroite, setNombreDroite] = useState<number>(5)
  const [resultat, setResultat] = useState<string | undefined>(undefined)
  const [startDate, setStartDate] = useState<number>(Date.now())
  const [durations, setDurations] = useState<number[]>([])
  const [averageDuration, setAverageDuration] = useState<number>(0)
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const isValid = nombreGauche * nombreDroite === Number(resultat)
  const isIos = /iphone|ipad|ipod/i.test(window.navigator.userAgent)
  const isStandalone =
    window.matchMedia('(display-mode: standalone)').matches ||
    Boolean((window.navigator as Navigator & { standalone?: boolean }).standalone)
  const repoUrl = 'https://github.com/bjalon/pretty'
  const appUrl = 'https://bjalon.github.io/pretty/'
  const repoQrUrl = `${import.meta.env.BASE_URL}qr-github.png`
  const appQrUrl = `${import.meta.env.BASE_URL}qr-app.png`

  useEffect(() => {
    if (isValid) {
      const endDate = Date.now();
      const duration = endDate - startDate
      setStartDate(Date.now())
      setDurations([...durations, duration])
      setNombreGauche(random0to10())
      setNombreDroite(random0to10())
      setResultat(undefined)
    }
  }, [isValid])

  useEffect(() => {
    inputRef.current?.focus()
  }, [nombreGauche, nombreDroite])

  useEffect(() => {
    setAverageDuration(average(durations))
  }, [durations])

  useEffect(() => {
    const onBeforeInstallPrompt = (event: Event) => {
      event.preventDefault()
      setInstallPrompt(event as BeforeInstallPromptEvent)
    }

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt)
    return () => window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt)
  }, [])

  const handleInputChange = (value: string) => {
    const numericOnly = value.replace(/\D/g, '')
    setResultat(numericOnly)
  }

  const handleInstallClick = async () => {
    if (!installPrompt) {
      return
    }
    await installPrompt.prompt()
    await installPrompt.userChoice
    setInstallPrompt(null)
  }

  return (
    <main className="app">
      <div className="bgShape bgShapeOne"/>
      <div className="bgShape bgShapeTwo"/>
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
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          enterKeyHint="done"
          value={resultat ?? ''}
          onChange={(event) => handleInputChange(event.target.value)}
          placeholder="Ta reponse"
          aria-label="Saisir la reponse"
          autoFocus
          autoCorrect="off"
          autoComplete="off"
          spellCheck={false}
          maxLength={3}
        />

        <p className={`status ${isValid ? 'ok' : 'ko'}`} role="status" aria-live="polite">
          Le resultat est {isValid ? 'bon' : 'errone'}
        </p>
        <p role="status" aria-live="polite">
          Le temps moyen de réponse est de {truncateDecimals(averageDuration / 1000, 1)}s
        </p>
        <p className="hint">Une bonne reponse charge automatiquement un nouvel exercice.</p>

        <div className="qrGrid">
          <a className="qrCard" href={repoUrl} target="_blank" rel="noreferrer">
            <img className="qrImage" src={repoQrUrl} alt="QR code vers le depot GitHub"/>
            <span className="qrLabel">Depot GitHub</span>
          </a>
          <a className="qrCard" href={appUrl} target="_blank" rel="noreferrer">
            <img className="qrImage" src={appQrUrl} alt="QR code vers l'application en ligne"/>
            <span className="qrLabel">Application en ligne</span>
          </a>
        </div>

        <button className="installButton" type="button" onClick={handleInstallClick}>
          Installer l&apos;app
        </button>
        {!isStandalone && !installPrompt && isIos && (
          <p className="iosHint">
            Sur iPhone: bouton Partager puis <strong>Sur l&apos;ecran d&apos;accueil</strong>.
          </p>
        )}
      </section>
    </main>
  )
}

export default App

export function random0to10(): number {
  return Math.floor(Math.random() * 11)
}

function average(values: number[]): number {
  if (values.length === 0) {
    return 0
  }

  const sum: number = values.reduce(
    (acc: number, v: number) => acc + v,
    0
  );

  return sum / values.length;
}

function truncateDecimals(value: number, decimals: number): number {
  const factor = 10 ** decimals;
  return Math.trunc(value * factor) / factor;
}
