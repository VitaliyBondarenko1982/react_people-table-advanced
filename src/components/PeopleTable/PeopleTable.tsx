import { FC, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import TableRow from '../TableRow';
import { ParamsNames, SortField } from '../../constants';
import TableHeader from '../TableHeader';

interface Props {
  people: Person[];
}

const PeopleTable: FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get(ParamsNames.SORT) || '';
  const order = searchParams.get(ParamsNames.ORDER) || '';

  const sortedPeople = useMemo(() => {
    if (!order && !sort) {
      return people;
    }

    return [...people].sort((a, b) => {
      switch (sort) {
        case SortField.NAME:
        case SortField.SEX:
          return order
            ? b[sort].localeCompare(a[sort])
            : a[sort].localeCompare(b[sort]);
        case SortField.BORN:
        case SortField.DIED:
          return order ? b[sort] - a[sort] : a[sort] - b[sort];
        default:
          return 0;
      }
    });
  }, [sort, order]);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <TableHeader />
      <tbody>
        {sortedPeople.map((person) => (
          <TableRow person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};

export default PeopleTable;
