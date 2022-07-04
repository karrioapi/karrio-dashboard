import { APIReference } from '@/context/references-provider';
import { SearchContext, SearchFilterTypeKeys } from '@/context/search-provider';
import React, { useContext, useEffect } from 'react';
import Dropdown, { closeDropdown, openDropdown } from '@/components/generic/dropdown';
import AppLink from '@/components/app-link';
import { formatAddressShort, isNoneOrEmpty } from '@/lib/helper';
import StatusBadge from '@/components/status-badge';
import moment from 'moment';

interface SearchBarComponent {
}

const SearchBar: React.FC<SearchBarComponent> = ({ ...props }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { ORDERS_MANAGEMENT } = useContext(APIReference);
  const { searchResults, loading, search } = useContext(SearchContext);
  const [searchValue, setSearchValue] = React.useState<string>("");
  const [searchType, setSearchType] = React.useState<SearchFilterTypeKeys>('keyword');

  useEffect(() => {
    search(searchType, searchValue);
    openDropdown(ref.current as any);
  }, [searchType, searchValue])

  return (
    <Dropdown direction={'is-center'} style={{ width: '100%' }}>
      {/* Dropdown header */}
      <div className="field has-addons" ref={ref}>
        <p className="control has-icons-left has-icons-right is-expanded">
          <input
            type="text"
            placeholder="Search..."
            defaultValue={searchValue}
            className="input is-small"
            onChange={e => setSearchValue(e.target.value)} />
          <span className="icon is-small is-left">
            {loading
              ? <i className="fas fa-spinner fa-pulse"></i>
              : <i className="fas fa-search"></i>
            }
          </span>
          <span className="icon is-small is-right is-clickable"
            onClick={() => setSearchValue("")}>
            <i className="fas fa-times"></i>
          </span>
        </p>
        <p className="control" onClick={e => { e.preventDefault(); e.stopPropagation() }}>
          <span className="select is-small">
            <select defaultValue={searchType} onChange={e => setSearchType(e.target.value as SearchFilterTypeKeys)}>
              <option value="keyword"></option>
              <option value="address">by:address</option>
              <option value="reference">by:reference</option>
              <option value="tracking_number">by:tracking_number</option>
              {ORDERS_MANAGEMENT && <option value="order_id">by:order_id</option>}
            </select>
          </span>
        </p>
      </div>

      {/* Dropdown content */}
      <div className="dropdown-content menu-inner p-0"
        style={{ maxHeight: '325px', minWidth: '20em', maxWidth: '25em' }}
        onClick={e => closeDropdown(e.target)}>
        <div className="options-items p-0">

          {!isNoneOrEmpty(searchValue) && (searchResults || []).slice(0, 10).map((result, key) => (
            <React.Fragment key={key}>
              {(result as any).recipient && <AppLink
                href={`/shipments/${result.id}`}
                className="options-item px-2 py-1 has-text-weight-semibold is-size-7">
                <i className="fas fa-truck pr-2"></i>
                <span className="text-ellipsis">
                  {formatAddressShort((result as any).recipient)}
                </span>
                <StatusBadge status={result.status as string} className="is-lowercase ml-2 p-1" />
                <span className="pl-3" style={{ marginLeft: 'auto', minWidth: '50px' }}>
                  {moment(result.created_at).format("MMM D")}
                </span>
              </AppLink>}

              {(result as any).shipping_to && <AppLink
                href={`/orders/${result.id}`}
                className="options-item px-2 py-1 has-text-weight-semibold is-size-7">
                <i className="fas fa-inbox pr-2"></i>
                <span className="text-ellipsis">
                  {formatAddressShort((result as any).shipping_to)}
                </span>
                <StatusBadge status={result.status as string} className="is-lowercase ml-2 p-1" />
                <span className="pl-3" style={{ marginLeft: 'auto', minWidth: '50px' }}>
                  {moment(result.created_at).format("MMM D")}
                </span>
              </AppLink>}

              {(!(result as any).shipping_to && !(result as any).recipient) && <a
                href={`/tracking/${result.id}`}
                className="options-item px-2 py-1 has-text-weight-semibold is-size-7">
                <i className="fas fa-location-arrow pr-2"></i>
                <span className="text-ellipsis">
                  {(result as any).tracking_number}
                </span>
                <StatusBadge status={result.status as string} className="is-lowercase ml-2 p-1" />
                <span className="pl-3" style={{ marginLeft: 'auto', minWidth: '50px' }}>
                  {moment(result.created_at).format("MMM D")}
                </span>
              </a>}
            </React.Fragment>
          ))}

          {(isNoneOrEmpty(searchValue) || (searchResults || []).length === 0) &&
            <span className='options-item px-2 py-1 has-text-weight-semibold is-size-7'>No results...</span>}

        </div>
      </div>
    </Dropdown>
  )
};

export default SearchBar;
