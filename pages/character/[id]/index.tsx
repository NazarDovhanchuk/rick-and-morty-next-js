import axios from 'axios';
import { GetServerSideProps } from 'next';
import Link from 'next/link';


const defaultId = 'https://rickandmortyapi.com/api/character/';


export const getServerSideProps: GetServerSideProps = async({query}) => {
  const { id } = query
  const details = await axios.get(`${defaultId}${id}`).then(({ data }) => data);
  
  return {
    props: {
      details
    }
  }
}

export const CharactersDetails = ({details}: any) => {
  const {image, species, name} = details;

  return (
    <div>
      {/* <img src={image} alt="Characters" /> */}
      <div>
        <h3>{name}</h3>
        <p>
          {species}
        </p>
      </div>

      <Link href='/'>
        <a>Back to home Page</a>
      </Link>
    </div>
  )
};


export default CharactersDetails;