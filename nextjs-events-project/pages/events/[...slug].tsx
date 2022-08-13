import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import ErrorAlert from '../../components/ui/error-alert';

import { getFilteredEvents } from '../../dummy-data';

const FilteredEventPage: NextPage = () => {
  const router = useRouter();
  const filteredData = router.query.slug;

  if (!filteredData) {
    return (
      <>
        <ErrorAlert>
          <div className="center">No events found</div>
        </ErrorAlert>
      </>
    );
  }

  const year = +filteredData[0];
  const month = +filteredData[1];
  const date = new Date(year, month - 1);

  if (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2021 ||
    month < 1 ||
    month > 12
  ) {
    return (
      <>
        <ErrorAlert>
          <div className="center">Invalid filter</div>
        </ErrorAlert>
        <ResultsTitle date={date} />
      </>
    );
  }

  const events = getFilteredEvents({
    year: year,
    month: month,
  });

  if (!events.length) {
    return (
      <>
        <ErrorAlert>
          <div className="center">No events found</div>
        </ErrorAlert>
        <ResultsTitle date={date} />
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

export default FilteredEventPage;
