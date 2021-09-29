/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link';
import React from 'react';

import styles from '../../../styles/Pagination.module.scss';

const Pagination = ({ totalPage }: any): JSX.Element => {
  // implement pagination logic
  const pageArray = (num: number): number[] => {
    const arr: number[] = [];

    for (let i = 1; i <= num; i++) {
      arr.push(i);
    }

    return arr;
  };

  const page = pageArray(totalPage);

  return (
    <div className={styles.pagination}>
      {page.map((index) => (
        <Link key={index} href={`/page/${index}`}>
          <a key={index} className={styles.pagination__item}>{index}</a>
        </Link>
      ))}
    </div>
  );
};

export default Pagination;
