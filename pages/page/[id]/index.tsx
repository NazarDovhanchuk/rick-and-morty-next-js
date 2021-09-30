/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import CharactersItem from '../../../src/component/CharactersItem/CharactersItem';
import Pagination from '../../../src/component/Pagination/Pagination';

import styles from '../../../styles/Home.module.scss';
import CharactersForm from '../../../src/component/CharactersForm/CharactersForm';

interface CharacterListProps {
  id: number,
  name: string;
  species: string;
  image: string;
  status: string,
}

const defaultData = 'https://rickandmortyapi.com/api/character/?page=';

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query;
  const charactersPage = await axios.get(`${defaultData}${id}`).then(({ data }) => data.results);
  const totalPage = await axios.get('https://rickandmortyapi.com/api/character/').then(({ data }) => data.info.pages);
  return {
    props: {
      charactersPage,
      totalPage,
    },
  };
};

const Page = ({ charactersPage, totalPage }: any): JSX.Element => (
  <>
    <CharactersForm />
    <div className={styles.charachers}>
      {charactersPage.map((person: CharacterListProps) => (
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
    <div className={styles.pagination}>
      <Pagination totalPage={totalPage} />
    </div>
  </>
);

export default Page;
