/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import { GetServerSideProps } from 'next';
import React from 'react';
import CharactersItem from '../../../src/component/CharactersItem/CharactersItem';

import styles from '../../../styles/Home.module.scss';

const searchName = 'https://rickandmortyapi.com/api/character/?name=';

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { name } = query;
  const charactersName = await axios.get(`${searchName}${name}`).then(({ data }) => data.results);
  console.log(name);

  return ({
    props: {
      charactersName,
    },
  });
};

const Search = ({ charactersName }: any): JSX.Element => (
  <div className={styles.charachers}>
    {charactersName.map((person: any) => (
      <CharactersItem
        key={person.id}
        name={person.name}
        species={person.species}
        image={person.image}
        stat={person.status}
        id={person.id}
      />
    ))}

  </div>
);
export default Search;
