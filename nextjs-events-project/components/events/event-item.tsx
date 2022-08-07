import React from 'react';
import Image from 'next/image';

import classes from './event-item.module.css';
import Button from '../ui/button';
import DateIcon from '../icons/date-icon';
import AddressIcon from '../icons/address-icon';
import ArrowRightIcon from '../icons/arrow-right-icon';

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
    <li className={classes.item}>
      <Image src={'/' + image} alt={title} width="100" height="100" />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{localeDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>
      </div>
      <div className={classes.actions}>
        <Button link={`/events/${id}`}>
          <span>Explore Event</span>
          <span>
            <ArrowRightIcon />
          </span>
        </Button>
      </div>
    </li>
  );
};

export default EventItem;
