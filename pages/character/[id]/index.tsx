/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import axios from 'axios';
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';

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

export const CharactersDetails = ({ details }: any): JSX.Element => {
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

export default CharactersDetails;
