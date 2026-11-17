import { useEffect, useState } from "react";
import type { Cipo } from "./types/types";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [cipok, setCipok] = useState<Cipo[]>([]);

  const [nev, setNev] = useState<string>("");
  const [meret, setMeret] = useState<number>();
  const [megjelenes, setMegjelenes] = useState<string>("");
  const [ar, setAr] = useState<number>();
  const [elerheto, setElerheto] = useState<boolean>(false);

  useEffect(() => {
    async function Betolt() {
      try {
        const response = await fetch("http://localhost:3000/shoes");
        const data = await response.json();
        setCipok(data);
      } catch (err) {
        console.error(err);
      }
    }
    Betolt();
  }, []);

  async function handleFelvetel(e) {
    e.preventDefault();

    const ujCipo = {
      nev: nev,
      meret: meret,
      megjelenes: megjelenes,
      ar: ar,
      elerheto: elerheto,
    };

    try {
      const response = await fetch("http://localhost:3000/shoes", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(ujCipo),
      });

      const cipo: Cipo = await response.json();
      setCipok((elozo) => [...elozo, cipo]);

      setNev("");
      setMeret(0);
      setMegjelenes("");
      setAr(0);
      setElerheto(false);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <h1>Ikonikus sportcipők</h1>
          <table className="table table-hover table-bordered">
            <thead>
              <tr>
                <th>Név</th>
                <th>Méret</th>
                <th>Megjelenes</th>
                <th>Ár</th>
                <th>Elérhető</th>
              </tr>
            </thead>
            <tbody>
              {cipok.map((cipo) => (
                <tr key={cipo.id}>
                  <td>{cipo.nev}</td>
                  <td>{cipo.meret}</td>
                  <td>{cipo.megjelenes}</td>
                  <td>{cipo.ar} ft</td>
                  <td>{cipo.elerheto ? "igen" : "nem"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <h3>Új cipő felvétele</h3>
          <form onSubmit={handleFelvetel}>
            <div className="form-group">
              <label htmlFor="input_nev">A cipő neve</label>
              <br />
              <input
                id="input_nev"
                type="text"
                value={nev}
                onChange={(e) => setNev(e.target.value)}
                className="form-control"
              />
              <br />
              <label htmlFor="input_meret">A cipő mérete</label>
              <br />
              <input
                id="input_meret"
                type="number"
                value={meret}
                onChange={(e) => setMeret(Number(e.target.value))}
                className="form-control"
              />
              <br />
              <label htmlFor="input_megjelenes">
                A cipő megjelenési dátumát
              </label>
              <br />
              <input
                id="input_megjelenes"
                type="date"
                value={megjelenes}
                onChange={(e) => setMegjelenes(e.target.value)}
                className="form-control"
              />
              <br />
              <label htmlFor="input_ar">A cipő árát</label>
              <br />
              <input
                id="input_ar"
                type="number"
                value={ar}
                onChange={(e) => setAr(Number(e.target.value))}
                className="form-control"
              />
              <br />
              <label htmlFor="input_elerheto">Add meg hogy elérhető e</label>
              <br />
              <input
                id="input_elerheto"
                type="checkbox"
                checked={elerheto}
                onChange={(e) => setElerheto(e.target.checked)}
              />
              <br />
              <button type="submit" className="btn btn-primary">
                Hozzáadás
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
