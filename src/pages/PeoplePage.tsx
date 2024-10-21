import { useEffect, useMemo, useState } from 'react';

import { useSearchParams } from 'react-router-dom';
import { Loader, PeopleTable, PeopleFilters } from '../components';
import { Person } from '../types';
import { getPeople } from '../api';
import { extendPeople } from '../utils';

enum FetchStatus {
  INITIAL = 'initial',
  LOADING = 'loading',
  LOADED = 'loaded',
}

const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>(
    FetchStatus.INITIAL,
  );
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setFetchStatus(FetchStatus.LOADING);
    getPeople()
      .then((peopleFromServer) => setPeople(extendPeople(peopleFromServer)))
      .catch(() => setIsError(true))
      .finally(() => setFetchStatus(FetchStatus.LOADED));
  }, []);

  useEffect(() => {
    if (!isError) {
      return;
    }

    const timerId = window.setTimeout(
      () => setIsError(false),
      3000,
    );

    // eslint-disable-next-line consistent-return
    return () => {
      window.clearTimeout(timerId);
    };
  }, [isError]);

  const isLoading = fetchStatus === FetchStatus.LOADING;
  const isLoaded = fetchStatus === FetchStatus.LOADED;

  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const filteredPeople = useMemo(() => {
    return people.filter((person) => {
      const normalizedName = person.name.toLowerCase();
      const normalizedMotherName = person.motherName?.toLowerCase();
      const normalizedFatherName = person.fatherName?.toLowerCase();
      const normalizedQuery = query.toLowerCase();
      const isMatchQuery = [
        normalizedName,
        normalizedMotherName,
        normalizedFatherName,
      ].some(field => field?.includes(normalizedQuery));
      const isMatchSex = sex ? person.sex === sex : true;
      const bornCentury = Math.floor(person.born / 100).toFixed();
      const isMatchCentury = centuries.length
        ? centuries.includes(bornCentury)
        : true;

      return isMatchQuery && isMatchSex && isMatchCentury;
    });
  }, [query, people, sex, centuries]);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="columns is-desktop is-flex-direction-row-reverse">
        {isLoaded && (
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>
        )}

        <div className="column">
          <div className="block">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!filteredPeople.length && !!people.length && (
                <p>There are no people matching the current search criteria</p>
              )}

              {isLoaded && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!!filteredPeople.length && (
                <PeopleTable people={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PeoplePage;
