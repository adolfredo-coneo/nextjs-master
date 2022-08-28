import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import ErrorAlert from '../../components/ui/error-alert';
import { getFilteredEvents } from '../api';

interface Props {
  events: Array<any>;
  error: string | undefined;
  date: string | undefined;
}

const FilteredEventPage: NextPage<Props> = ({ events, error, date }) => {
  const router = useRouter();
  const filteredData = router.query.slug;

  if (!filteredData) {
    return <div className="center">Loading...</div>;
  }

  if (error) {
    return (
      <>
        <ErrorAlert>
          <div className="center">{error}</div>
        </ErrorAlert>
        {date && <ResultsTitle date={date} />}
      </>
    );
  }

  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={events} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.query.slug;

  if (!slug) {
    return {
      props: {
        events: [],
        error: 'No events found',
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
        error: 'Invalid filter',
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
        error: 'No events found',
        date,
      },
    };
  }

  return {
    props: {
      events,
      date,
    },
  };
};

export default FilteredEventPage;
