'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { EventLocation } from '@/types/events';
import 'leaflet/dist/leaflet.css';

// Create a custom div icon using rocket emoji
const rocketIcon = L.divIcon({
  html: '🚀',
  className: 'rocket-marker',
  iconSize: [25, 25],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24],
});

interface EventMapProps {
  events: EventLocation[];
}

export default function EventMap({ events }: EventMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Add custom styles for the rocket marker
    const style = document.createElement('style');
    style.textContent = `
      .rocket-marker {
        display: flex !important;
        align-items: center;
        justify-content: center;
        font-size: 25px;
        background: none;
        border: none;
        transform: rotate(-45deg);
        transition: transform 0.3s ease;
      }
      .rocket-marker:hover {
        transform: rotate(-45deg) scale(1.2);
        z-index: 1000 !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Function to fix URLs
  const fixUrl = (url: string) => {
    if (!url) return '#';
    // Remove any protocol prefix if exists
    const cleanUrl = url.replace(/^https?:\/\//, '');
    // Remove the GitHub Pages base path if it exists
    return cleanUrl.replace(/^jaycobski\.github\.io\/saas-maps-v3\//, '');
  };

  if (!mounted) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="text-gray-600">Loading map...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-[600px] relative">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: '100%', width: '100%', position: 'absolute' }}
        className="rounded-lg overflow-hidden"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {events.map((event, index) => (
          <Marker
            key={`${event.name}-${index}`}
            position={[event.latitude, event.longitude]}
            icon={rocketIcon}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-lg">{event.name}</h3>
                <p className="text-sm">{event.date}</p>
                <p className="text-sm">{event.location}</p>
                <p className="text-sm">Size: {event.size}</p>
                <p className="text-sm">Price: {event.price}</p>
                <a
                  href={`https://${fixUrl(event.url)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 text-sm"
                >
                  Visit Website
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
} 