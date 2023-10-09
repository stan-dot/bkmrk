
modules
- analytics module
- batch operations manager - for delete multiple, etc
- search manager class
- validator
- api connector
- settings manager I guess

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

- [ ] add useSearchParams
- [ ] in search results change the path whenever the highlighted bookmark shows. do not just jump between things in the side tree

## questionabl dev decision
- [ ] useSearchParams - might be too weird, but the native bookmark manager uses that
- [ ] maybe history shouldn't be updated directly, but only downstream from the Path context object? - check this out!
- [ ] test empirically summary-detail html5 instead of unrolled boolean - ask on stack overflow and also 

## current errors
- [x] edit folder does not use the name first
- [x] side subtree and side element circular dependency
- [ ] does not reload when new thing created - need a listener to refresh things on event, probably in the context object
- [ ] sometimes path gets too many items
- [ ] search does not change the path - then clicking on 'current path' does not redirect
- [ ] side 
- [ ] ctrl + a does not select everything in the table, but all text

## diagram
global states are in the contexts, each separate
- path - that is the novel part
- popup
- root (location)
- contextMenuContext - tracking position - possibly not needed really

# for later
## separate for later
- [x] drag and drop - that whole thing can be after the MVP
- [ ] use stack for undo - for big stuff

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
