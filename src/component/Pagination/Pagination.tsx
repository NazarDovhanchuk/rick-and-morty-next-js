import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import styles from '../../../styles/Pagination.module.scss';

interface PaginationProps {
  totalPage: number
  id: number
}

const Pagination = ({ totalPage, id }: PaginationProps): JSX.Element => {
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
    const currentPage = +id;
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
  }, [id, totalPage]);

  return (
    <div className={styles.pagination}>
      <h1>'Hello, world!'</h1>
      <Link href={`/page/${Math.max(1, id - 1)}`}>
        <button>Prev Page</button>
      </Link>
      {activePage.map((index) => (
        <Link key={index} href={`/page/${index}`}>
          <a key={index} className={styles.pagination__item}>{index}</a>
        </Link>
      ))}
      <Link href={`/page/${+id + 1}`}>
        <button>Next Page</button>
      </Link>
    </div>
  );
};

export default Pagination;
