import axios from "axios";
import { GetServerSideProps } from "next";
import React from "react";
import CharactersItem from "../../../src/component/CharactersItem/CharactersItem";

interface CharacterListProps {
  id: number,
  name: string;
  species: string;
  image: string;
  status: string,
}


const defaultData = 'https://rickandmortyapi.com/api/character/?page=';

export const getServerSideProps: GetServerSideProps = async({query}) => {
  const {id} = query;
  const charactersPage = await axios.get(`${defaultData}${id}`).then(({ data }) => data.results);
  
  return {
    props: {
      charactersPage,
    }
  }
}


const Page = ({charactersPage}: any) => {
  console.log(charactersPage)

  return (
    <div>
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
  )
}

export default Page;