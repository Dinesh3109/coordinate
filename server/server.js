require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");
const { parseString } = require("xml2js");
const { Builder } = require("xml2js");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Allow frontend to access backend
app.use(bodyParser.text({ type: "application/xml" }));

// API to fetch coordinates
app.post("/api/geo", async (req, res) => {
    try {
        parseString(req.body, async (err, result) => {
            if (err) return res.status(400).send("<error>Invalid XML format</error>");

            const city = result?.request?.city?.[0];
            if (!city) return res.status(400).send("<error>City is required</error>");

            const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
                params: { q: city + ", India", format: "json", limit: 1 }
            });

            if (response.data.length === 0) {
                return res.status(404).send("<error>City not found</error>");
            }

            const { lat, lon, display_name } = response.data[0];

            const xmlResponse = new Builder().buildObject({
                response: { city: display_name, latitude: lat, longitude: lon }
            });

            res.set("Content-Type", "application/xml");
            res.send(xmlResponse);
        });
    } catch (error) {
        res.status(500).send("<error>Server error</error>");
    }
});

// Serve React build in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../build")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../build", "index.html"));
    });
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
