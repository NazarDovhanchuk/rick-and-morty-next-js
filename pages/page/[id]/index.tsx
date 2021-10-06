/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import axios from 'axios';
import { GetStaticPaths, GetStaticProps } from 'next';
import CharactersItem from '../../../src/component/CharactersItem/CharactersItem';
import Pagination from '../../../src/component/Pagination/Pagination';

import styles from '../../../styles/Home.module.scss';
import CharactersForm from '../../../src/component/CharactersForm/CharactersForm';

interface CharacterList {
  id: number,
  name: string;
  species: string;
  image: string;
  status: string,
}

interface PageProps {
  totalPage: number,
  charactersPage: CharacterList[],
  id: number;
}

const Page = ({ charactersPage, totalPage, id }: PageProps): JSX.Element => (
  <>
    <CharactersForm />
    <div className={styles.pagination}>
      <Pagination totalPage={totalPage} id={id} />
    </div>
    <div className={styles.charachers}>
      {charactersPage.map((person) => (
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
  </>
);

const defaultData = 'https://rickandmortyapi.com/api/character/?page=';

export const getStaticProps: GetStaticProps = async (context) => {
  const { id }: any = context.params;
  try {
    const charactersPage = await axios.get(`${defaultData}${id}`).then(({ data }) => data.results);
    const totalPage = await axios.get('https://rickandmortyapi.com/api/character/').then(({ data }) => data.info.pages);

    if (id && +id > totalPage) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        id,
        charactersPage,
        totalPage,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const page = await axios.get(`${defaultData}`).then(({ data }) => data.info.pages);

  const pageArray = (num: number): number[] => {
    const arr: number[] = [];

    for (let i = 1; i <= num; i++) {
      arr.push(i);
    }

    return arr;
  };

  const result = pageArray(page);

  const paths = result.map((el) => ({
    params: { id: el.toString() },
  }));

  return { paths, fallback: 'blocking' };
};

export default Page;
