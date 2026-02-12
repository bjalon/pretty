import {useEffect, useState} from 'react'
import './App.css'

function App() {
  const [nombreGauche, setNombreGauche] = useState<number>(10)
  const [nombreDroite, setNombreDroite] = useState<number>(5)
  const [resultat, setResultat] = useState<string | undefined>(undefined)

  const isValid = (nombreGauche * nombreDroite) === Number(resultat)

  useEffect(() => {
    if (isValid) {
      setNombreGauche(random0to10())
      setNombreDroite(random0to10())
      setResultat(undefined)
    }

  }, [resultat]);

  return (
    <>
      <div className="card">
        <span style={{margin: 10}} >Combien vaut {nombreGauche} x {nombreDroite} =</span>
        <input type="text" value={resultat ?? ""} onChange={(value) => setResultat(value.target.value)} />
        <br/>
        <span>Le résultat est {isValid ? "bon" : "erroné"}</span>

        {/*<button onClick={() => setCount((count) => count * 2)}>*/}
        {/*  count is {count}*/}
        {/*</button>*/}
      </div>
     </>
  )
}

export default App

export function random0to10(): number {
  return Math.floor(Math.random() * 11);
}