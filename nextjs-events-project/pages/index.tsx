import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import EventList from '../components/events/event-list';
import { getFeaturedEvents } from './api';

interface Props {
  featuredEvents: Array<any>;
}

const HomePage: NextPage<Props> = ({ featuredEvents }) => {
  //const featuredEvents = getFeaturedEvents();

  if (!featuredEvents) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Head>
        <title>Next.js Events</title>
        <meta name="description" content="Find great events" />
      </Head>
      <EventList items={featuredEvents} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      featuredEvents,
    },
    revalidate: 1800,
  };
};

export default HomePage;
