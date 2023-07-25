import { useEffect, useState } from 'react';

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

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="columns is-desktop is-flex-direction-row-reverse">
        <div className="column is-7-tablet is-narrow-desktop">
          <PeopleFilters />
        </div>

        <div className="column">
          <div className="block">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {isLoaded && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!!people.length && (
                <PeopleTable people={people} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PeoplePage;
