import React from 'react';
import fs from 'fs/promises';
import path from 'path';

type Props = {
  product: {
    id: number;
    title: string;
    description: string;
  };
};

const PorductDetailPage = (props: Props) => {
  if (!props.product) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <h1>{props.product.title}</h1>
      <p>{props.product.description}</p>
    </div>
  );
};

const getData = async () => {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath, 'utf8');
  const data = JSON.parse(jsonData);

  return data;
};

export const getStaticPaths = async () => {
  const data = await getData();
  const ids = data.products.map((product: { id: any }) => product.id);
  const pathsWithParams = ids.map((id: any) => ({ params: { pid: id } }));

  return {
    paths: pathsWithParams,
    fallback: true,
  };
};

export const getStaticProps = async (context: { params: any }) => {
  const { params } = context;

  const productId = params.pid;

  const data = await getData();

  const product = data.products.find(
    (product: { id: string }) => product.id === productId
  );

  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      product,
    },
  };
};

export default PorductDetailPage;
