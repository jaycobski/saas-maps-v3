import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { parseEvents } from '@/utils/eventParser';

const EventMap = dynamic(() => import('@/components/EventMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <div className="text-gray-600">Loading map...</div>
    </div>
  ),
});

export default async function EmbedPage() {
  const events = await parseEvents();

  return (
    <div className="w-full h-screen">
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <div className="text-gray-600">Loading map data...</div>
          </div>
        }
      >
        <EventMap events={events} />
      </Suspense>
    </div>
  );
} 