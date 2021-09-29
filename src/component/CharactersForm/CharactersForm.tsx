import React from 'react';

const CharactersForm = (): JSX.Element => {
  const handlerOnSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
  };
  return (

    <form onSubmit={handlerOnSubmit}>
      <input type="search" />
      <button>Search</button>
    </form>
  );
};

export default CharactersForm;
