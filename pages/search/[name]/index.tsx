/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { GetServerSideProps } from 'next';
import React from 'react';
import CharactersForm from '../../../src/component/CharactersForm/CharactersForm';
import CharactersItem from '../../../src/component/CharactersItem/CharactersItem';

import styles from '../../../styles/Home.module.scss';

interface PromiseFulfilledResult {
  status: 'fulfilled' | 'rejected';
  value?: any;
  reason?: any;
}

interface CharacterItem {
  map: any;
  id: number,
  name: string;
  species: string;
  image: string;
  status: string;
}

interface SearchProps {
  successList: CharacterItem[]
  errorsCharacters: string[],
  nameArray: string[],
}

const Search = ({ successList, errorsCharacters, nameArray }: SearchProps): JSX.Element => {
  const failedRequest = errorsCharacters.map((el: string) => el.split('=').slice(1, 2));
  const successRequest = nameArray.filter((item) => !failedRequest.join().includes(item));

  return (
    <>
      <CharactersForm />
      {failedRequest.length >= 1 && (
      <p className={styles.notFoundText}>
        Hero not found:
        {failedRequest.map((el, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <span className={styles.notFound} key={index}>{el}</span>
        ))}
      </p>
      )}
      <div>
        {successList.map((el, index) => (
          <>
            <p className={styles.found}>
              Hero found:
              {successRequest[index]}
            </p>
            <div className={styles.charachers}>
              {el.map((person: CharacterItem) => (
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

        ))}

      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { name } = context.query;
  const nameArray = (name as string).split(',');

  const allRequest = nameArray.map((el) => axios.get(`https://rickandmortyapi.com/api/character/?name=${el}`));

  const charactersResponse:PromiseFulfilledResult[] = await Promise.allSettled(allRequest).then((response) => response);

  const successList = charactersResponse.filter((person) => person.status === 'fulfilled')
    .map((hero) => hero.value.data.results);

  const errorsCharacters = charactersResponse
    .filter((p) => p.status === 'rejected')
    .map((e) => e.reason.config.url);

  return ({
    props: {
      successList,
      errorsCharacters,
      nameArray,
    },
  });
};

export default Search;
