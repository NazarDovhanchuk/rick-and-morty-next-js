/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { GetServerSideProps } from 'next';
import React from 'react';
import CharactersForm from '../../../src/component/CharactersForm/CharactersForm';
import CharactersItem from '../../../src/component/CharactersItem/CharactersItem';

import styles from '../../../styles/Home.module.scss';

const Search = ({
  successCharacters, errorsCharacters,
}: any): JSX.Element => {
  const failedRequest = errorsCharacters.map((el: string) => el.split('=').slice(1, 2));

  return (
    <>
      <CharactersForm />
      {failedRequest.map((el: string, index: number) => (
        // eslint-disable-next-line react/no-array-index-key
        <p key={index}>{`Hero not found ${el}`}</p>
      ))}
      <div className={styles.charachers}>
        {successCharacters.map((el: any) => (
          el.map((person:any) => (
            <CharactersItem
              key={person.id}
              name={person.name}
              species={person.species}
              image={person.image}
              stat={person.status}
              id={person.id}
            />
          ))

        ))}

      </div>

    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { name } = context.query;
  const nameArray = (name as string).split(',');

  const allRequest = nameArray.map((el) => axios.get(`https://rickandmortyapi.com/api/character/?name=${el}`));

  const charactersResponse = await Promise.allSettled(allRequest).then((response) => response);

  const successCharacters = charactersResponse
    .filter((person) => person.status === 'fulfilled')
    .map((hero) => hero.value.data.results);

  const errorsCharacters = charactersResponse
    .filter((p) => p.status === 'rejected')
    .map((e) => e.reason.config.url);

  return ({
    props: {
      successCharacters,
      errorsCharacters,
    },
  });
};

export default Search;
