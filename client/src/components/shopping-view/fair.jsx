import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";

const locationIcon = new L.Icon({
  iconUrl: markerIcon,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const tradeFairs = [
  {
    event: "World Food India 2024",
    date: "19-22 September, 2024",
    venue: "New Delhi",
    sector: "Food processing industry",
    website: "https://worldfoodindia.gov.in/",
    position: [28.6139, 77.209], 
  },
  {
    event: "Uttar Pradesh International Trade Show (UPITS)",
    date: "September 25-29, 2024",
    venue: "India Expo Centre & Mart, Greater Noida",
    sector: "Manufacturing, Agriculture, Textiles, Pharmaceuticals, IT, Tourism, and more",
    website: "https://www.upinternationaltradeshow.com",
    position: [28.4744, 77.503], 
  },
  {
    event: "BHARAT TELECOM 2024",
    date: "October 15-17, 2024",
    venue: "Pragati Maidan, New Delhi",
    sector: "Telecom Equipment & Services",
    website: "https://www.telecomepc.in/",
    position: [28.6205, 77.2333], 
  },
  {
    event: "India Chem 2024",
    date: "17-19 October, 2024",
    venue: "Bombay Exhibition Centre, Mumbai, India",
    sector: "Chemicals, Petrochemical, Agrochemical Industry, Process and Machinery",
    website: "https://indiachem.ficci.in/",
    position: [19.2272, 72.8561], 
  },
  {
    event: "18th India International Silk Fair",
    date: "7-9 November, 2024",
    venue: "The Yashobhoomi, IICC, New Delhi",
    sector: "Indian silk & silk blend products, Textiles",
    website: "http://www.iisilkfair.com",
    position: [28.6139, 77.209], 
  },
];

const Fair = () => {
  return (
    <div className="p-5 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Upcoming Trade Fairs</h2>
      <MapContainer
        center={[20.5937, 78.9629]} // Center of India
        zoom={5}
        style={{ height: "400px", width: "100%" }}
        className="rounded-lg"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {tradeFairs.map((fair, index) => (
          <Marker key={index} position={fair.position} icon={locationIcon}>
            <Popup>
              <strong>{fair.event}</strong>
              <br />
              {fair.date}
              <br />
              Venue: {fair.venue}
              <br />
              Sector: {fair.sector}
              <br />
              <a href={fair.website} target="_blank" rel="noopener noreferrer">
                Visit Website
              </a>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Fair;
