import { FC } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';
import { Sex } from '../../constants';

interface Props {
  person: Person
}

const PersonLink: FC<Props> = ({ person }) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={{ pathname: `/people/${person.slug}`, search: searchParams.toString() }}
      className={cn({
        'has-text-danger': person.sex === Sex.F,
      })}
    >
      {person.name}
    </Link>
  );
};

export default PersonLink;
