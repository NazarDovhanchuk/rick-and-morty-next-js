/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import { GetServerSideProps } from 'next';
import React from 'react';

const searchName = 'https://rickandmortyapi.com/api/character/?name=';

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { name } = query;
  const charactersName = await axios.get(`${searchName}${name}`).then(({ data }) => data.results);

  return {
    props: {
      charactersName,
    },
  };
};

const Search = ({ charactersName }: any): JSX.Element => {
  console.log(charactersName);
  return (
    <div>
      Hello

    </div>
  );
};
export default Search;
