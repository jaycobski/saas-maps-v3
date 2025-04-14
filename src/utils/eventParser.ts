import fs from 'fs';
import path from 'path';
import { EventLocation } from '@/types/events';

const geocodeLocation = async (location: string): Promise<[number, number]> => {
  try {
    // Add delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`
    );
    const data = await response.json();
    if (data && data[0]) {
      return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
    }
    return [0, 0]; // Default coordinates if geocoding fails
  } catch (error) {
    console.error('Error geocoding location:', error);
    return [0, 0];
  }
};

// Clean URL function
const cleanUrl = (url: string): string => {
  if (!url || url === '#') return '#';
  // Remove any protocol prefix
  let cleanUrl = url.replace(/^https?:\/\//, '');
  // Remove trailing slashes
  cleanUrl = cleanUrl.replace(/\/+$/, '');
  // Remove www. if present
  cleanUrl = cleanUrl.replace(/^www\./, '');
  return cleanUrl;
};

// Hardcoded coordinates for major cities to avoid rate limiting during development
const cityCoordinates: Record<string, [number, number]> = {
  'San Francisco': [37.7749, -122.4194],
  'New York': [40.7128, -74.0060],
  'Boston': [42.3601, -71.0589],
  'Austin': [30.2672, -97.7431],
  'Dublin': [53.3498, -6.2603],
  'London': [51.5074, -0.1278],
  'Barcelona': [41.3851, 2.1734],
  'Berlin': [52.5200, 13.4050],
  'Amsterdam': [52.3676, 4.9041],
  'Paris': [48.8566, 2.3522],
  'Sydney': [-33.8688, 151.2093],
  'Bengaluru': [12.9716, 77.5946],
  'Chennai': [13.0827, 80.2707],
  'Las Vegas': [36.1699, -115.1398],
  'Edinburgh': [55.9533, -3.1883],
  'Ottawa': [45.4215, -75.6972],
  'Lisbon': [38.7223, -9.1393],
  'Malmo': [55.6049, 13.0038],
  'Hamburg': [53.5511, 9.9937],
  'Cologne': [50.9375, 6.9603],
  'Bucharest': [44.4268, 26.1025],
  'Sibenik': [43.7350, 15.8952],
};

export async function parseEvents(): Promise<EventLocation[]> {
  try {
    const filePath = path.join(process.cwd(), 'src/data/locations.md');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const lines = fileContent.split('\n');

    // Remove the header row and empty lines
    const eventLines = lines.slice(2).filter(line => line.trim() !== '');

    const events: EventLocation[] = [];
    let currentRegion = '';

    for (const line of eventLines) {
      if (!line.includes('\t')) {
        currentRegion = line.replace('Conferences', '').trim();
        continue;
      }

      const [name, dateLocation, size, description, url, price] = line.split('\t');
      
      if (!name || !dateLocation) continue;

      const location = dateLocation.split(',')[1]?.trim() || '';
      const date = dateLocation.split(',')[0]?.trim() || '';

      // Use hardcoded coordinates if available, otherwise geocode
      const coordinates = cityCoordinates[location] || await geocodeLocation(location);

      events.push({
        name,
        date,
        location,
        size: size || 'N/A',
        description: description || '',
        url: cleanUrl(url || '#'),
        price: price || 'N/A',
        latitude: coordinates[0],
        longitude: coordinates[1],
        region: currentRegion
      });
    }

    return events;
  } catch (error) {
    console.error('Error parsing events:', error);
    return [];
  }
} 