import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';

import { getAllEvents } from '../../dummy-data';

const AllEventsPage: NextPage = () => {
  const events = getAllEvents();
  const router = useRouter();

  const findEventsHandler = (year: number, month: number) => {
    router.push(`/events/${year}/${month}`);
  };

  return (
    <>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  );
};

export default AllEventsPage;
