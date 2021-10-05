import React from 'react';
import axios from 'axios';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';

interface CharactersDetailsItem {
  image: string,
  species: string,
  name: string,
}

interface CharactersDetailsProps {
  details: CharactersDetailsItem
}

export const CharactersDetails = ({ details }: CharactersDetailsProps): JSX.Element => {
  const { image, species, name } = details;

  return (
    <div>
      <img src={image} alt="Characters" />
      <div>
        <h3>{name}</h3>
        <p>
          {species}
        </p>
      </div>

      <Link href="/">
        <a>Back to home Page</a>
      </Link>
    </div>
  );
};

const charactersID = 'https://rickandmortyapi.com/api/character/';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const details = await axios.get(`${charactersID}${params?.id}`).then(({ data }) => data);

  return {
    props: {
      details,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: 'blocking',
});

export default CharactersDetails;
