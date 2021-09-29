import React from 'react';
import Link from 'next/link';
import styles from '../../../styles/CharactersItem.module.scss';

interface CharacterItemProps {
  id: number,
  name: string;
  species: string;
  image: string;
  stat: string,
}

const CharactersItem: React.FC<CharacterItemProps> = ({
  species, image, stat, id, name,
}) => (
  <>
    <div className={styles.characters__item}>
      <img src={image} alt="Characters" />
      <div className={styles.characters__information}>
        <Link href={`/character/${id}`}>
          <a>
            <h3 className={styles.characters__name}>{name}</h3>
          </a>
        </Link>
        <p className={styles.characters__species}>
          {stat}
          {' '}
          -
          {' '}
          {species}
        </p>
        <div className={styles.characters__location}>
          <p className={styles.characters__location__info}>Last known location:</p>
        </div>
      </div>
    </div>
  </>
);

export default CharactersItem;
