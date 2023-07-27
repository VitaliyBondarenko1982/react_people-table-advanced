import { FC } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';
import { Sex } from '../../constants';

interface Props {
  person: Person
}

const PersonLink: FC<Props> = ({ person }) => {
  return (
    <Link
      to={`/people/${person.slug}`}
      className={cn({
        'has-text-danger': person.sex === Sex.F,
      })}
    >
      {person.name}
    </Link>
  );
};

export default PersonLink;
