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
  successUrl: string[],
}

const Search = ({ successList, errorsCharacters, successUrl }: SearchProps): JSX.Element => {
  const failedRequest = errorsCharacters.map((el: string) => el.split('=').slice(1, 2));
  const successRequest = successUrl.map((el: string) => el.split('=').slice(1, 2));

  console.log(successRequest);

  return (
    <>
      <CharactersForm />
      {failedRequest.map((el, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <p key={index}>{`Hero not found ${el}`}</p>
      ))}
      <div>
        {successRequest.map((el, index) => (
          <p key={index}>{`Hero is Found ${el}`}</p>
        ))}
        <div className={styles.charachers}>
          {successList.map((el) => (
            el.map((person: CharacterItem) => (
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
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { name } = context.query;
  const nameArray = (name as string).split(',');

  const allRequest = nameArray.map((el) => axios.get(`https://rickandmortyapi.com/api/character/?name=${el}`));

  const charactersResponse = await Promise.allSettled(allRequest).then((response) => response);

  const successCharacters = charactersResponse.filter((person) => person.status === 'fulfilled');

  const successList = successCharacters.map((hero) => (hero as PromiseFulfilledResult).value.data.results);

  const successUrl = successCharacters.map((hero) => (hero as PromiseFulfilledResult).value.config.url);

  const errorsCharacters = charactersResponse
    .filter((p) => p.status === 'rejected')
    .map((e) => (e as PromiseFulfilledResult).reason.config.url);

  return ({
    props: {
      successList,
      errorsCharacters,
      successUrl,
    },
  });
};

export default Search;
