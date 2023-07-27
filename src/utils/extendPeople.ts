import { Person } from '../types';

type PersonMap = {
  [key: string]: Person,
};

const makeMap = (people: Person[]): PersonMap => {
  return people.reduce<PersonMap>((acc, person) => {
    return {
      ...acc,
      [person.name]: person,
    };
  }, {});
};

const extendPeople = (people: Person[]): Person[] => people
  .map((person) => {
    const peopleMap = makeMap(people);

    return {
      ...person,
      mother: person.motherName ? peopleMap[person.motherName] : undefined,
      father: person.fatherName ? peopleMap[person.fatherName] : undefined,
    };
  });

export default extendPeople;
