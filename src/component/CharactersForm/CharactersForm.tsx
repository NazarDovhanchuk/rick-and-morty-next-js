import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';

import styles from '../../../styles/CharactersForm.module.scss';

const CharactersForm = (): JSX.Element => {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handlerOnChange = (e:React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();

    setSearch(e.target.value);
  };

  const handlerOnSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    router.push(`/search/${search.replace(/\s/gi, ',')}`);

    setSearch('');
  };

  return (
    <form className={styles.form} onSubmit={handlerOnSubmit}>
      <input
        className={styles.input}
        type="search"
        value={search}
        onChange={handlerOnChange}
      />
      <button className={styles.button}>Search</button>
    </form>
  );
};

export default CharactersForm;
