import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';

const CharactersForm = (): JSX.Element => {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handlerOnChange = (e:React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();

    setSearch(e.target.value);
  };

  const handlerOnSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    router.push(`/search/${search}`);

    setSearch('');
  };

  return (
    <form onSubmit={handlerOnSubmit}>
      <input type="search" value={search} onChange={handlerOnChange} />
      <button>Search</button>
    </form>
  );
};

export default CharactersForm;
