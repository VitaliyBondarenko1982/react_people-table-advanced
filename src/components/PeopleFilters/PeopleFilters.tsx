import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { ChangeEvent } from 'react';
import SearchLink from '../SearchLink';
import { getSearchWith, updateMultiParam } from '../../utils';
import { SearchParams } from '../../types';
import { CENTURIES, ParamsNames, Sex } from '../../constants';

const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get(ParamsNames.SEX) || '';
  const query = searchParams.get(ParamsNames.QUERY) || '';
  const centuries = searchParams.getAll(ParamsNames.CENTURIES) || [];

  function setSearchWith(params: SearchParams) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  const handleChangeQuery = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: event.target.value || null });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={cn({ 'is-active': !sex })}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: Sex.M }}
          className={cn({ 'is-active': sex === Sex.M })}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: Sex.F }}
          className={cn({ 'is-active': sex === Sex.F })}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            onChange={handleChangeQuery}
            value={query}
          />

          <span
            className="icon is-left"
            role="presentation"
          >
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURIES.map((century) => (
              <SearchLink
                params={{
                  centuries: updateMultiParam(centuries, century),
                }}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{
            query: null,
            centuries: null,
            sex: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};

export default PeopleFilters;
