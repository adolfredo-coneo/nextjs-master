import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

interface Props {
  products: Array<{
    id: number;
    name: string;
    price: number;
    image: string;
  }>;
}
const Home: NextPage<Props> = (props) => {
  const { products } = props;
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
};

export const getStaticProps = async () => {
  return {
    props: {
      products: [
        { id: 'p1', name: 'Product 1' },
        { id: 'p2', name: 'Product 2' },
        { id: 'p3', name: 'Product 3' },
      ],
    },
  };
};

export default Home;
