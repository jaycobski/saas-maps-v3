# SaaS Events Map

An interactive map showing SaaS conferences and events worldwide. Built with Next.js, React-Leaflet, and TypeScript.

## Features

- Interactive world map showing SaaS events and conferences
- Click on markers to see event details (name, date, location, size, price)
- Responsive design that works on all devices
- Server-side rendering with Next.js
- TypeScript for type safety
- Tailwind CSS for styling

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/jay_cobski/saas-maps-v3.git
cd saas-maps-v3
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Data Structure

Events data is stored in `src/data/locations.md` in a tab-separated format with the following columns:
- Conference Name
- Date & Location
- Size
- Description
- URL
- Ticket Price

## Technologies Used

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Leaflet](https://leafletjs.com/)
- [React-Leaflet](https://react-leaflet.js.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## License

MIT 