import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { parseEvents } from '@/utils/eventParser';

// Dynamically import the EventMap component to avoid SSR issues with Leaflet
const EventMap = dynamic(() => import('@/components/EventMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] flex items-center justify-center bg-gray-100 rounded-lg">
      <div className="text-gray-600">Loading map component...</div>
    </div>
  ),
});

export default async function Home() {
  const events = await parseEvents();

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">SaaS Events Map</h1>
        <div className="mb-8">
          <p className="text-gray-600">
            Explore SaaS conferences and events around the world. Click on markers to see event details.
          </p>
        </div>
        <div className="relative w-full">
          <Suspense
            fallback={
              <div className="w-full h-[600px] flex items-center justify-center bg-gray-100 rounded-lg">
                <div className="text-gray-600">Loading map data...</div>
              </div>
            }
          >
            <EventMap events={events} />
          </Suspense>
        </div>
      </div>
    </main>
  );
} 