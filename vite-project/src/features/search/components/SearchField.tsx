import React, { useState } from "react";
import { BookmarkNode } from "../../../lib/typesFacade";
import { useBookmarks } from "../../../lib/GlobalReducer";

export function SearchField(props: {}) {
  const [value, setValue] = useState<string>("");
  const [iconHighlight, setIconHighlight] = useState<boolean>(false);
  const { state, dispatch } = useBookmarks();

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setIconHighlight(true);
  };

  const onEnterHandler = async (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    // console.debug('event: ', event);
    if (event.key === "Enter") {
      // console.debug('detected enter');
      await runSearch();
    }
  };

  const onSearchClickHandler = async () => await runSearch();

  const onBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    setIconHighlight(false);
  };

  const isEmpty = value.length === 0;

  async function runSearch() {
    console.debug("starting the search, term: ", value);
    const searchResults: BookmarkNode[] = await chrome
      .bookmarks.search(value);
    console.debug("search results: ", searchResults);
    dispatch({ type: "SET_SEARCH", payload: searchResults });
  }

  return (
    <div
      className={`react-search-field bg-slate-800 rounded-full w-3/5 m-2 align-middle border-solid relative justify-between flex flex-row`}
    >
      <div id="left-side-items" className="justify-start">
        <button
          className={`${
            iconHighlight ? "text-slate-50" : "text-slate-400"
          } search-field-button h-fit align-middle cursor-pointer hover:bg-slate-50 p-3 pb-2 hover:rounded text-l border-color-white rounded-full}`}
          type="button"
          aria-label="search button"
          onClick={onSearchClickHandler}
          disabled={isEmpty}
        >
          &#128269;
        </button>
        <input
          className="search-field-input lg:w-[300px] outline-none text-left bg-slate-800 border-none text-sm pb-4 text-slate-50 "
          onChange={onChangeHandler}
          onKeyDown={onEnterHandler}
          onBlur={onBlurHandler}
          placeholder={"Search bookmarks"}
          type="text"
          value={value}
        />
      </div>
      <button
        className={`search-field-button h-fit w-fit outline-none ${
          isEmpty && "hidden"
        } ${
          iconHighlight ? "text-slate-50" : "text-slate-400"
        } cursor-pointer p-2 text-xl rounded-full`}
        type="button"
        aria-label="cancel button"
        onClick={() => setValue("")}
        disabled={isEmpty}
      >
        &#11199;
      </button>
    </div>
  );
}
