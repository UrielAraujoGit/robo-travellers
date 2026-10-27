import { useEffect, useState } from "react";
import "./App.css";
import { apiGetAllExoplanets } from "./services/api.service";
import { type ExoplanetType } from "./schemas/exoplanet.type";

function App() {
  const [exoplanets, setExoplanets] = useState<ExoplanetType[]>([]);

  useEffect(() => {
    getAllExoplanets();
  }, []);

  const getAllExoplanets = async () => {
    try {
      const result = await apiGetAllExoplanets();
      if (result == null) {
        throw new Error("exoplanets list is null");
      }
      setExoplanets(result);
    } catch (e) {
      console.error("error getting exoplanets list");
    }
  };

  return (
    <main className="text-center">
      Robo Travellers
      <div>
        {exoplanets.map((item) => (
          <div key={item.pl_name}>{item.pl_name}</div>
        ))}
      </div>
    </main>
  );
}

export default App;
