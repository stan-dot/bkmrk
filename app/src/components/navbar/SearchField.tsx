import React, { useCallback, useEffect, useState } from 'react';
import { ENTER_KEY, SEARCH_PLACEHOLDER } from './navbarConst';
import { searchFieldButtonStyle, searchFieldInputStyle, searchFieldStyle } from './searchFieldButtonStyle';
import { SearchIcon } from './SearchIcon';

/**
 * todo chrome.bookmarks.search - it returns a list of objects
 * @param props 
 * @returns 
 */
export function SearchField(props: {
  classNames: any,
  searchText: any,
  disabled: any,
  onChange: any,
  onEnter: any,
  onSearchClick: any,
  onBlur: any,
}) {
  const [value, setValue] = useState(props.searchText);

  useEffect(() => {
    setValue(props.searchText);
  }, [props.searchText, setValue]);

  const onChangeHandler = useCallback((event: { target: { value: any; }; }) => {
    setValue(event.target.value);
    props.onChange(event.target.value, event);
  }, [props.onChange, setValue]);

  const onEnterHandler = useCallback((event: any) => {
    const isEnterPressed = event.which === ENTER_KEY
      || event.keyCode === ENTER_KEY;
    props.onEnter(event.target.value, event);
  }, [props.onEnter]);

  const onSearchClickHandler = useCallback(() => {
    props.onSearchClick(value);
  }, [props.onSearchClick, value]);

  const onBlurHandler = useCallback((event: { target: { value: any; }; }) => {
    props.onBlur(event.target.value, event);
  }, [props.onBlur]);

  const className = `react-search-field dev-test-outline ${props.classNames}`;

  const style: React.CSSProperties = searchFieldButtonStyle(props.disabled);
  return (
    <div
      className={className}
      style={searchFieldStyle}
    >
      <input
        className="react-search-field-input"
        style={searchFieldInputStyle}
        onChange={onChangeHandler}
        onKeyDown={onEnterHandler}
        onBlur={onBlurHandler}
        placeholder={SEARCH_PLACEHOLDER}
        type="text"
        value={value}
        disabled={props.disabled}
        width={"40%"}
      />
      <button
        className="react-search-field-button"
        type="button"
        aria-label="search button"
        style={style}
        onClick={onSearchClickHandler}
        disabled={props.disabled}
      >
        <SearchIcon />
      </button>
    </div>
  );
};