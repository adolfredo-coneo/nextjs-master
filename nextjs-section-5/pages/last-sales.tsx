import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';

type Props = {};

const LastSalesPage: NextPage<Props> = (props) => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('https://nextjs-course-47bf8-default-rtdb.firebaseio.com/sales.json')
      .then((res) => res.json())
      .then((data) => {
        const transformedSales = Object.keys(data).map((key) => ({
          ...data[key],
          id: key,
        }));
        setSales(transformedSales as []);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!sales) {
    return <div>No sales yet</div>;
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

export default LastSalesPage;
