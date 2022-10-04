import React, { useState } from "react";
import { makeBookmark, makeFolder } from "../dataProcessing/interact";
import { exportBookmarks } from "../io/exportBookmarks";
import { BookmarkImportWindow } from "../io/importBookmarks";

export function ManipulationMenu(props: { sortCallback: Function; importCallback: Function; }): JSX.Element {
  enum OpenMenuStates {
    IMPORT,
    EXPORT,
    NEW_FOLDER,
    NEW_BOOKMARK
  }
  const [showMenu, setShowMenu] = useState(false);
  const [openVariant, setOpenVariant] = useState(OpenMenuStates.NEW_BOOKMARK);

  // sort by name, add new BookmarkTable, add new makeFolderimport bookmarks, export bookmarks, help center
  // todo there should be dialog popups for the new bookmark and new folder
  return <div>
    {showMenu
      ?
      <div>
        <ul>
          <li>sort by name <button onClick={v => props.sortCallback} /></li>
          <li>sort by date made<button onClick={v => props.sortCallback} /></li>
          <li>add new bookmark <button onClick={v => makeBookmark('someId')} /></li>
          <li>add new folder <button onClick={v => makeFolder('test', 'someid')} /></li>
          <li>import bookmarks<button onClick={v => setOpenVariant(OpenMenuStates.IMPORT)}>import</button></li>
          <li>export bookmarks <button onClick={v => exportBookmarks}>export</button></li>
          <li> help center</li>
        </ul>
      </div>
      : <div>
        <p>svg for 3 dots</p>
        <button onClick={v => setShowMenu(true)}>Open</button>
      </div>}
    {openVariant === OpenMenuStates.IMPORT ?? <BookmarkImportWindow callback={props.importCallback} />}

    {openVariant === OpenMenuStates.NEW_BOOKMARK ?? <NewBookmarkWindow />}
    {openVariant === OpenMenuStates.NEW_FOLDER ?? <NewFolderWindow />}
  </div>;
}
function NewBookmarkWindow(props: {}): JSX.Element {
  return <dialog>
    <p>hi, what's the new bookmark that you need?</p>
  </dialog>;
}
function NewFolderWindow(props: {}): JSX.Element {
  return <dialog>
    <p>hi, what's the new folder that you need?</p>
  </dialog>;
}
