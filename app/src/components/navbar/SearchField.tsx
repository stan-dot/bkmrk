import React, { useEffect, useState } from 'react';
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
  setDataCallback: (nodes: chrome.bookmarks.BookmarkTreeNode[]) => void
}) {
  const [value, setValue] = useState(props.searchText as string);
  const [iconHighlight, setIconHighlight] = useState(false);

  useEffect(() => {
    setValue(props.searchText);
  }, [props.searchText, setValue]);

  const onChangeHandler = (event: { target: { value: any; }; }) => {
    setValue(event.target.value);
    setIconHighlight(true);
  };

  const onEnterHandler = async (event: any) => {
    const isEnterPressed = event.which === 13
      || event.keyCode === 13;
    if (isEnterPressed) {
      await runSearch();
    };
  }

  const onSearchClickHandler = async () => {
    // props.onSearchClick(value);
    await runSearch();
  };

  const onBlurHandler = (event: { target: { value: any; }; }) => {
    setIconHighlight(false);
  };


  async function runSearch() {
    const searchResults: chrome.bookmarks.BookmarkTreeNode[] = await chrome.bookmarks.search(value);
    props.setDataCallback(searchResults);
  }

  return (
    <div
      className={`react-search-field ${props.classNames} border-1 boreder-solid relative justify-between flex flex-row  w-2/5 `}
    >
      <input
        className="react-search-field-input outline-none border-none text-xl p-4 flex text-slate-50 "
        onChange={onChangeHandler}
        onKeyDown={onEnterHandler}
        onBlur={onBlurHandler}
        placeholder={"Search bookmarks"}
        type="text"
        value={value}
        disabled={props.disabled}
        width={"40%"}
      />
      <button
        className={`react-search-field-button h-10 w-40 outline-none bg-slate-50 cursor-pointer p-2 box-border appearance-none  b-l-2 border-color-white border-solid m-8 ${props.disabled && 'disabled:'}`}
        type="button"
        aria-label="search button"
        onClick={onSearchClickHandler}
        disabled={props.disabled}
      >
        <SearchIcon highlight={iconHighlight} />
      </button>
    </div>
  );
};