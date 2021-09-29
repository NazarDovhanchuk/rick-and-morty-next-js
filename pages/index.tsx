import axios from 'axios'
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import Head from 'next/head'
import CharactersItem from '../src/component/CharactersItem/CharactersItem';
import Link from 'next/link';


import styles from '../styles/Home.module.scss';

interface CharacterListProps {
  id: number,
  name: string;
  species: string;
  image: string;
  status: string,
}


const defaultData = 'https://rickandmortyapi.com/api/character/';

export const getServerSideProps: GetServerSideProps = async() => {
  const charactersList = await axios.get(defaultData).then(({ data }) => data.results);
  const totalPage = await axios.get(defaultData).then(({data}) => data.info.pages);
  
  return {
    props: {
      charactersList,
      totalPage
    }
  }
};

const Home = ({charactersList, totalPage}: any): JSX.Element => {

  // implement pagination logic
  const [activePage, setActivePage] = useState<number[]>([]);

  const range = (start: number, end: number): number[] => {
    const initial = start;
    const active = end;
    const arr = [];

    for (let i = initial; i <= active; i++) {
      arr.push(i);
    }

    return arr;
  };

  useEffect(() => {
    const siblingsLength = 1;
    const maxRange = 5;
    const currentPage = 2;
    const boundaryCount = 1;

    const startPages = range(1, Math.min(boundaryCount, totalPage));
    const endPages = range(Math.min(totalPage, totalPage - boundaryCount + 1), totalPage);

    let centerPages: number[] = [];

    if (currentPage < maxRange) {
      centerPages = range(boundaryCount + 1, maxRange);
    } else if (totalPage - maxRange < currentPage) {
      centerPages = range(totalPage - maxRange, totalPage - boundaryCount);
    } else {
      centerPages = range(currentPage - siblingsLength, currentPage + siblingsLength);
    }

    setActivePage([...startPages, ...centerPages, ...endPages]);
  }, [totalPage])

  return (
    <div className={styles.container}>
      <Head>
        <title>Rick And Morty</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.charachers}>
          {charactersList.map((person: CharacterListProps) => (
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

        {activePage.map((index) => (
          <Link key={index} href="/page[id]" as={`/page/${index}`} passHref>
            <h3 key={index}>{index}</h3>
          </Link>
        ))}
      </main>

    </div>
  )
}

export default Home
