import React, { useCallback, useEffect, useState } from 'react';

const ENTER_KEY = 13;
const SEARCH_BUTTON_EDGE = 35;

const searchFieldStyle: React.CSSProperties = {
  border: '1px #ddd solid',
  display: 'inline-flex',
  justifyContent: 'space-between',
  padding: '20px',
  height: SEARCH_BUTTON_EDGE,
  width: '40%',
  top: '10px'
};

const searchFieldButtonStyle = (disabled: boolean): React.CSSProperties => ({
  height: SEARCH_BUTTON_EDGE - 2, // reduces 2px because of top and bottom border
  width: SEARCH_BUTTON_EDGE - 2,
  outline: 'none',
  backgroundColor: 'white',
  cursor: disabled ? 'auto' : 'pointer',
  padding: 5,
  boxSizing: 'border-box',
  appearance: 'none',
  border: 'none',
  borderLeft: '1px #ddd solid',
});

const searchFieldInputStyle = {
  outline: 'none',
  border: 'none',
  fontSize: 14,
  padding: '0 8px',
  flex: 1,
  color: '#5a5a5a',
  fontWeight: 100,
  height: SEARCH_BUTTON_EDGE - 2,
};

const SearchIcon = () => {
  const iconEdge = Math.ceil(SEARCH_BUTTON_EDGE * 0.60);
  const searchIconStyle = {
    fill: '#727272',
  };
  return (
    <svg
      version="1.1"
      x="0px"
      y="0px"
      width={iconEdge}
      height={iconEdge}
      viewBox="0 0 635 635"
      style={searchIconStyle}
    >
      <g>
        <path d="M255.108,0C119.863,0,10.204,109.66,10.204,244.904c0,135.245,109.659,244.905,244.904,244.905
          c52.006,0,100.238-16.223,139.883-43.854l185.205,185.176c1.671,1.672,4.379,1.672,5.964,0.115l34.892-34.891
          c1.613-1.613,1.47-4.379-0.115-5.965L438.151,407.605c38.493-43.246,61.86-100.237,61.86-162.702
          C500.012,109.66,390.353,0,255.108,0z M255.108,460.996c-119.34,0-216.092-96.752-216.092-216.092
          c0-119.34,96.751-216.091,216.092-216.091s216.091,96.751,216.091,216.091C471.199,364.244,374.448,460.996,255.108,460.996z"
        />
      </g>
    </svg>
  );
};
const SEARCH_PLACEHOLDER = "Search bookmarks";

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