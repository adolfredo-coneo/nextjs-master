import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import ErrorAlert from '../../components/ui/error-alert';
import { getFilteredEvents } from '../api';

interface Props {
  events: Array<any>;
  errorMSG: string | undefined;
  date: string | undefined;
  year: number;
  month: number;
}

const FilteredEventPage: NextPage = () => {
  const [eventsData, setEventsData] = useState([]);
  const router = useRouter();
  const filteredData = router.query.slug;

  const { data, error } = useSWR(
    'https://nextjs-course-47bf8-default-rtdb.firebaseio.com/events.json',
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const transformedEvents = Object.keys(data).map((key) => ({
        ...data[key],
        id: key,
      }));
      setEventsData(transformedEvents as []);
    }
  }, [data]);

  if (!filteredData) {
    return <div className="center">Loading...</div>;
  }

  const year = +filteredData[0];
  const month = +filteredData[1];
  const date = new Date(year, month - 1).toDateString();

  if (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2021 ||
    month < 1 ||
    month > 12 ||
    error
  ) {
    return (
      <>
        <ErrorAlert>
          <div className="center">Invalid</div>
        </ErrorAlert>
        {date && <ResultsTitle date={date} />}
      </>
    );
  }

  const filteredEvents = eventsData.filter((event: any) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.query.slug;

  if (!slug) {
    return {
      props: {
        events: [],
        errorMSG: 'No events found',
      },
    };
  }

  const year = +slug[0];
  const month = +slug[1];
  const date = new Date(year, month - 1).toDateString();

  if (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2021 ||
    month < 1 ||
    month > 12
  ) {
    return {
      props: {
        events: [],
        errorMSG: 'Invalid filter',
      },
    };
  }

  const events = await getFilteredEvents({
    year: year,
    month: month,
  });

  if (!events.length) {
    return {
      props: {
        events: [],
        errorMSG: 'No events found',
        date,
        year,
        month,
      },
    };
  }

  return {
    props: {
      events,
      date,
      year,
      month,
    },
  };
};

export default FilteredEventPage;
