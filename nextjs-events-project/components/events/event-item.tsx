import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
  id: string;
  title: string;
  date: string;
  location: string;
  image: string;
};

const EventItem: React.FC<Props> = ({ id, title, date, location, image }) => {
  const localeDate = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const formattedAddress = location.replace(', ', '\n');

  return (
    <li>
      <Image src={'/' + image} alt={title} width="100" height="100"/>
      <div>
        <h2>{title}</h2>
        <div>
          <time>{localeDate}</time>
        </div>
        <div>
          <address>{formattedAddress}</address>
        </div>
      </div>
      <div>
        <Link href={`/events/${id}`}>Explore Event</Link>
      </div>
    </li>
  );
};

export default EventItem;
