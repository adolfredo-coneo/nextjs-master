import { GetServerSideProps, NextPage } from 'next';
import React from 'react';

type Props = {
  name: string;
  email: string;
};

const UserProfilePage: NextPage<Props> = (props) => {
  return (
    <>
      <h1>{props.name}</h1>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params, req, res } = context;

  console.log('Server side code');
  return {
    props: {
      name: 'John Doe',
      email: 'ado.coneo@gmail.com',
    },
  };
};

export default UserProfilePage;
