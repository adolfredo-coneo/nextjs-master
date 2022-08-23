import { GetServerSideProps, NextPage } from 'next';
import React from 'react';

type Props = {
  id: string;
};

const UserIdPage: NextPage<Props> = (props) => {
  return (
    <>
      <h1>{props.id}</h1>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const userId = params?.uid;
  return {
    props: {
      id: 'userId-' + userId,
    },
  };
};

export default UserIdPage;
