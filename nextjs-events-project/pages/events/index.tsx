import type { NextPage } from 'next';
import EventList from '../../components/events/event-list';

import { getAllEvents } from '../../dummy-data';

const AllEventsPage: NextPage = () => {
  const events = getAllEvents();

  return (
    <div>
      <EventList items={events} />
    </div>
  );
};

export default AllEventsPage;
