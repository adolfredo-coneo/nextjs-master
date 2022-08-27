import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';

import EventContent from '../../components/event-detail/event-content';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventSummary from '../../components/event-detail/event-summary';
import ErrorAlert from '../../components/ui/error-alert';
import { getEventById, getFeaturedEvents } from '../api';

interface Props {
  event: any;
}

const EventDetailPage: NextPage<Props> = ({ event }) => {
  if (!event) {
    return <div className="center">Loading</div>;
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

export const getStaticPaths: GetStaticPaths = async () => {
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({
    params: {
      eventId: event.id,
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;

  const eventId = params?.eventId as string;
  //const { eventId } = params;
  const event = await getEventById(eventId);

  return {
    props: {
      event,
    },
    revalidate: 30,
  };
};

export default EventDetailPage;
