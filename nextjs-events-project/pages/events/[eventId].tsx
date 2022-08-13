import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import EventContent from '../../components/event-detail/event-content';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventSummary from '../../components/event-detail/event-summary';
import ErrorAlert from '../../components/ui/error-alert';

import { Event, getEventById } from '../../dummy-data';

const EventDetailPage: NextPage = () => {
  const { query } = useRouter();
  const { eventId } = query;

  const event = getEventById(eventId as string);

  if (!event) {
    return (
      <ErrorAlert>
        <div className="center">No event found</div>
      </ErrorAlert>
    );
  }

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
