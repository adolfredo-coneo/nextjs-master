import type { NextPage } from 'next';
import fs from 'fs/promises';
import path from 'path';

interface Props {
  products: Array<{
    id: number;
    title: string;
    description: string;
  }>;
}
const Home: NextPage<Props> = (props) => {
  const { products } = props;
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
};

export const getStaticProps = async (context) => {
  console.log('(Re-)Generating the props');
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath, 'utf8');
  const data = JSON.parse(jsonData);

  if (!data) {
    return {
      redirect: {
        destination: '/no-data',
      },
    };
  }

  if (data.products.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
};

export default Home;
