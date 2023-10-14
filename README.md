# bkmrk
font color #0AA

#025 background

## notes
https://www.producthunt.com/

mention that to compete with:

  - that’s like Readable, so not quite
  save to pocket
  https://chrome.google.com/webstore/detail/save-to-pocket/niloccemoadcdkdjlinkgdfekeahmflj
  https://booky.io/

supersorter
  https://chrome.google.com/webstore/detail/supersorter/hjebfgojnlefhdgmomncgjglmdckngij?hl=en


### developer notes
context menus need to be with style inline prop as tailwind does that statically


context menus might need to be global and in the root, with some context



# functionality specific developer notes

## copy and paste - browser clipboard

NOTE - the text/plain is a fallback if uri-list fails
https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Recommended_drag_types#:~:text=As%20usual%2C%20set%20the%20text/plain%20type%20last%2C%20as%20a%20fallback%20for%20the%20text/uri%2Dlist%20type.

    
## loading from the root
NOTE: the getTree method returns the ROOT node
it has 3 children: bookmarks bar, other bookmarks, mobile bookmarks.
these only show up if not empty
     

## deletion
Uncaught (in promise) Error: Can't remove non-empty folder (use recursive to force).
need to empty it first

## prompt
given this filter interface in typescript: `
export interface FilterSearch {
  urlRegex?: RegExp;
  titleRegex?: RegExp;
  mainPage?: string;
  substringInName?: string;
  onlyFolder: boolean;
  onlyBookmark: boolean;
  dateAddedBefore?: Date;
  dateAddedAfter?: Date;
}` and knowledge that there is React pattern with table rows passed as props, which then get filtered and that the state of the filter (of the FilterSearch type) is responsible for that, design a filterPanel div that would update the React state. use string input for string data, use html5 date picker for date and for only folder/only bookmark use 1 slider that in the middle accepts both, turned to the left only folders, to the right only bookmarks