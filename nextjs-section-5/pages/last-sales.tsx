import { GetStaticProps, NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

type Props = {
  initialSales: {
    id: React.Key | null | undefined;
    username: string;
    volume: string;
  }[];
};

const LastSalesPage: NextPage<Props> = ({ initialSales }) => {
  const [sales, setSales] = useState(initialSales);
  // const [loading, setLoading] = useState(false);

  const { data, error } = useSWR(
    'https://nextjs-course-47bf8-default-rtdb.firebaseio.com/sales.json',
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const transformedSales = Object.keys(data).map((key) => ({
        ...data[key],
        id: key,
      }));
      setSales(transformedSales as []);
    }
  }, [data]);

  // useEffect(() => {
  //   setLoading(true);
  //   fetch('https://nextjs-course-47bf8-default-rtdb.firebaseio.com/sales.json')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const transformedSales = Object.keys(data).map((key) => ({
  //         ...data[key],
  //         id: key,
  //       }));
  //       setSales(transformedSales as []);
  //       setLoading(false);
  //     });
  // }, []);
  if (error) {
    return <div>Failed to load</div>;
  }

  if (!data && !sales) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {sales.map(
        (sale: {
          id: React.Key | null | undefined;
          username: string;
          volume: string;
        }) => (
          <li key={sale.id}>
            {sale.username} - ${sale.volume}
          </li>
        )
      )}
    </ul>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const response = await fetch(
    'https://nextjs-course-47bf8-default-rtdb.firebaseio.com/sales.json'
  );

  const data = await response.json();

  const transformedSales = Object.keys(data).map((key) => ({
    ...data[key],
    id: key,
  }));

  return {
    props: {
      initialSales: transformedSales,
      revalidate: 10,
    },
  };
};

export default LastSalesPage;
