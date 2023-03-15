import React, { useState } from "react";

export function SearchField(props: {
  setDataCallback: (nodes: chrome.bookmarks.BookmarkTreeNode[]) => void;
}) {
  const [value, setValue] = useState("");
  const [iconHighlight, setIconHighlight] = useState(false);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setIconHighlight(true);
  };

  const onEnterHandler = async (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "enter") await runSearch();
  };

  const onSearchClickHandler = async () => await runSearch();

  const onBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    setIconHighlight(false);
  };

  const isEmpty = value.length === 0;

  async function runSearch() {
    const searchResults: chrome.bookmarks.BookmarkTreeNode[] = await chrome
      .bookmarks.search(value);
    props.setDataCallback(searchResults);
  }

  return <div className={`react-search-field bg-slate-800 rounded-full w-3/5 m-2 align-middle border-solid relative justify-between flex flex-row`} >
    <div id="left-side-items" className="justify-start">
      <button
        className={`search-field-button h-fit  ${iconHighlight ? "text-slate-50" : "text-slate-400"
          } align-middle cursor-pointer hover:bg-slate-50 p-3 pb-2 text-l border-color-white rounded-full}`}
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
      className={`search-field-button h-fit w-fit outline-none ${isEmpty && "hidden"
        } ${iconHighlight ? "text-slate-50" : "text-slate-400"
        } cursor-pointer p-2 text-xl rounded-full`}
      type="button"
      aria-label="cancel button"
      onClick={() => setValue("")}
      disabled={isEmpty}
    >
      &#11199;
    </button>
  </div>
}
