
## 09.10.2023

- [x] test empirically (ok actually just spoke to chat) summary-detail html5 instead of unrolled boolean - ask on stack overflow and also - better to render async, with custom
- [x] maybe history shouldn't be updated directly, but only downstream from the Path context object? - check this out! - deleted history
## diagram
global states are in the contexts, each separate
- path - that is the novel part
- popup
- root (location)
- contextMenuContext - tracking position - possibly not needed really - confirmed that not needed


## on reverse engineering
there is a number of commands
- [ ] copy export from chromium actually- that is in the chrome.bookmarkManagerPrivate object, that is not exposed

modules
- analytics module
- batch operations manager - for delete multiple, etc
- search manager class
- validator
- api connector
- settings manager I guess

## rejected
- [x] use suspense syntax instead of loading screen - nah that's only if a framework or lazy code
- history - nullified by useSearchParams, both for search and path - wrong, having it locally would be good. internal pages are skipped from history usually - wrong, native bookmarks have this

## deleted eslint config
"eslintConfig": {
  "extends": [
    "react-app",
    "react-app/jest"
  ]
},

## consisteny changes
- [x] change to my local node types in most places, my own interfaces
- [x] change all to local types - must 
  - [x] change
  - [x] remove
  - [x] get
  - [x] getTree
- [x] change useEffect in most places
- [x] some useBookmark hook?
- [x] consider side tree element issues

## VITE movement
- [ ] add content script for right getting images https://crxjs.dev/vite-plugin/getting-started/react/add-content-script
- [x] add ts manifest

## base refatoring
- [x] move the refactoring from search results talbe also to the main table
- [x] deal with dual drop handling in the bookmark table
- [x] make a separate search result component, reusing maybe half of the logic, but also a filter component there instead of path stuff
- [x] try a simpler, local context menu for clicking from a tutorial and see if all works there. right now both the location and the passing of props do not work for edition
- [x] ask ChatGPT to refactor the table component
- [x] change useEffect to custom effect hooks - that requires disassembling `Table.tsx`
- [x] possibly use a custom event listener for all the history and path changes - for these to be automatic - ask chat

# 28.09.2022

## notes on link preview
- [ ] link preview
the place it's working in is social media, and google docs
https://workspaceupdates.googleblog.com/2020/08/docs-mobile-link-previews-smart-compose.html
https://stackoverflow.com/questions/62728331/how-do-google-docs-bubble-cards-link-preview-unfurl-external-resource-inside

https://thetrevorharmon.com/blog/a-developers-guide-to-the-open-graph-protocol

maybe with Rust WASM
https://blog.logrocket.com/web-scraping-rust/#be-good-citizen-writing-web-scraper

manual requesting
https://stackoverflow.com/questions/44763985/fetch-only-headers-of-a-get-request-in-node


## termination of the link preview
https://stackoverflow.com/questions/50949594/axios-having-cors-issue

this is about security and CORS would be persistent.
could theoretically do this, with some microbackend and 


# 16.03.2023
struggle with regex

# 20.03.2023

## refactor

# MVP
- [x] done API
- [x] add proper menus on context
https://www.w3schools.com/html/html5_draganddrop.asp
browser provides the image for dragging
https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API
- [x] solve the selection bit
- [x] fix search bookmarks field positioning
- [x] a 'undo' popup in the left bottom corner

- [x] fix the issue with 'add new bookmark' alert
- [x] fix the issue with 'add new folder' alert
- [x] make the settings alert
- [x] history context for back and forward arrows. history is a queue?
- [x] context for basic nodes - language independent

### bug fixes
- [x] fix the click does not work right with double click but right with context click
- [x] fix the broken alerts and context menus
- [x] fix the starting root - make it disappear
- [x] fix the side bar no context menu
- [x] wrong row gets targeted for any changes
- [x] side subtree gets error on deletion. also the erroneous state with 0 is preserved for far too long. cannot read properties of undefined props.node
- [x] download excludes urls
- [x] make the loading screen nicer. maybe with a loading bar?

### recently done
- [x] split global tree into context, with callbacks
- [x] add table context menu not only on left click, but also button - need to simplify the getData and column creation utilities

### decided against
do rows as lower level container

### reaction to changes considerations
options
bookmark changes in the current folder
bookmark changes outside of the current view
bookmark changes upstream in the path
bookmark changes completely elsewhere, like on a different tab

things that need to change
current rows. rows appears completely downstream from the path
current path
loaded status?
global tree - complex, it changes, but only folders changes matter, the numbers should update too though

maybe simplify with reducer, with diff actions for all of these

## moved because now a different layout
- [ ] sometimes path gets too many items
- [ ] search does not change the path - then clicking on 'current path' does not redirect
