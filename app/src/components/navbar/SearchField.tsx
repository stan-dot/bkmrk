import { useState } from 'react';

export function SearchField(props: {
  setDataCallback: (nodes: chrome.bookmarks.BookmarkTreeNode[]) => void
}) {
  const [value, setValue] = useState("");
  const [iconHighlight, setIconHighlight] = useState(false);

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
    await runSearch();
  };

  const onBlurHandler = (event: { target: { value: any; }; }) => {
    setIconHighlight(false);
  };

  const isEmpty = value.length === 0;

  async function runSearch() {
    const searchResults: chrome.bookmarks.BookmarkTreeNode[] = await chrome.bookmarks.search(value);
    props.setDataCallback(searchResults);
  }

  return (
    <div className={`react-search-field bg-slate-800 rounded-full w-3/5 m-2 align-middle border-solid relative justify-between flex flex-row`}>
      <div id="left-side-items" className='justify-start'>
        <button
          className={`search-field-button h-fit w-10 ${iconHighlight ? 'text-slate-50' : 'text-slate-400'} align-middle cursor-pointer p-2 text-xl border-color-white rounded-full}`}
          type="button"
          aria-label="search button"
          onClick={onSearchClickHandler}
          disabled={isEmpty}
        >
          &#128269;
        </button>
        <input
          className="search-field-input h-4/6 lg:w-[300px] outline-none text-left bg-slate-800 border-none text-sm pb-6 text-slate-50 rounded-r-full "
          onChange={onChangeHandler}
          onKeyDown={onEnterHandler}
          onBlur={onBlurHandler}
          placeholder={"Search bookmarks"}
          type="text"
          value={value}
        />
      </div>
      <button
        className={`search-field-button h-fit w-fit outline-none ${isEmpty && 'hidden'} ${iconHighlight ? 'text-slate-50' : 'text-slate-400'} cursor-pointer p-2 text-xl rounded-full`}
        type="button"
        aria-label="cancel button"
        onClick={() => setValue("")}
        disabled={isEmpty}
      >
        &#11199;
      </button>
    </div>
  );
};