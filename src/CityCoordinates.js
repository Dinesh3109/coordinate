import { useState } from "react";
import './App.css';
import './style/grid.css';

function CityCoordinates() {
  const [city, setCity] = useState("");
  const [coords, setCoords] = useState(null);

  const fetchCoordinates = async () => {
    try {
      const xmlRequest = `<request><city>${city}</city></request>`;

      const response = await fetch("http://localhost:5000/api/geo", {
        method: "POST",
        headers: { "Content-Type": "application/xml" },
        body: xmlRequest
      });

      const text = await response.text();

      // Convert XML response to JSON
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text, "text/xml");

      const error = xmlDoc.getElementsByTagName("error")[0];
      if (error) throw new Error(error.textContent);

      const jsonResponse = {
        city: xmlDoc.getElementsByTagName("city")[0].textContent,
        latitude: xmlDoc.getElementsByTagName("latitude")[0].textContent,
        longitude: xmlDoc.getElementsByTagName("longitude")[0].textContent
      };

      setCoords(jsonResponse);
    } catch (error) {
      alert(error.message);
      setCoords(null);
    }
  };

  return (
    <div class="container">
      <div class="row">
        <div className="col span-3-of-3">
        <input type="text" placeholder="Enter city" value={city} onChange={(e) => setCity(e.target.value)} />
        </div>
      </div>
      <div class="row button">    
        <button class="button button-clr" onClick={fetchCoordinates}>Get Coordinates</button>
      </div>
      <div class="row">
        {coords && (
          <p>
            {coords.city}: Lat {coords.latitude}, Lon {coords.longitude}
          </p>
        )}
      </div>
    </div>
  );
}

export default CityCoordinates;
