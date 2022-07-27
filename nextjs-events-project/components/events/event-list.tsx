import React from 'react';

import EventItem from './event-item';

type Props = {
  items: Array<any>;
};

const EventList: React.FC<Props> = ({ items }) => {
  return (
    <ul>
      {items.map((item) => (
        <EventItem />
      ))}
    </ul>
  );
};

export default EventList;
