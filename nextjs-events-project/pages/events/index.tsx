import type { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';

import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';
import { getAllEvents } from '../api';

interface Props {
  events: Array<any>;
}
const AllEventsPage: NextPage<Props> = ({ events }) => {
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

export const getStaticProps: GetStaticProps = async (context) => {
  const events = await getAllEvents();

  return {
    props: {
      events,
    },
    revalidate: 60,
  };
};

export default AllEventsPage;
