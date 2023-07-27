import { FC } from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from '../index';

interface Props {
  person: Person;
}
const TableRow: FC<Props> = ({ person }) => {
  const { slug: activeSlug } = useParams();

  const {
    slug, sex, born, died, mother, father, motherName, fatherName,
  } = person;

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': slug === activeSlug })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother
          ? <PersonLink person={mother} />
          : motherName || '-'}
      </td>
      <td>
        {father
          ? <PersonLink person={father} />
          : fatherName || '-'}
      </td>
    </tr>
  );
};

export default TableRow;
