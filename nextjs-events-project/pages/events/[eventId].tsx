import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import EventContent from '../../components/event-detail/event-content';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventSummary from '../../components/event-detail/event-summary';

import { Event, getEventById } from '../../dummy-data';

const EventDetailPage: NextPage = () => {
  const [event, setEvent] = useState<Event | undefined>(undefined);
  const { query } = useRouter();
  const { eventId } = query;

  useEffect(() => {
    if (eventId) {
      setEvent(getEventById(eventId as string));
    }
  }, [eventId]);

  return (
    <>
      {event && (
        <>
          <EventSummary title={event.title} />
          <EventLogistics
            date={event.date}
            address={event.location}
            image={event.image}
            imageAlt={event.image}
          />
          <EventContent>{event.description}</EventContent>
        </>
      )}
    </>
  );
};

export default EventDetailPage;
