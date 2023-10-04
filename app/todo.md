
modules
- analytics module
- batch operations manager - for delete multiple, etc
- search manager class
- validator
- api connector
- settings manager I guess

- [x] change to my local node types in most places, my own interfaces
- [x] change all to local types - must 
  - [x] change
  - [x] remove
  - [x] get
  - [x] getTree
- [x] change useEffect in most places
- [ ] change useEffect to custom effect hooks - that requires disassembling `Table.tsx`
- [x] some useBookmark hook?
- [ ] possibly use a custom event listener for all the history and path changes - for these to be automatic

- [ ] try a simpler, local context menu for clicking from a tutorial and see if all works there. right now both the location and the passing of props do not work for edition
- [ ] make a separate search result component, reusing maybe half of the logic, but also a filter component there instead of path stuff

## dev features
- [ ] useSearchParams
- [ ] maybe history shouldn't be updated directly, but only downstream from the Path context object?
- [ ] test empirically summary-detail html5 instead of unrolled boolean
- [x] consider side tree element issues
- [ ] lower panel is invisible rn if search results mode

## diagram
global states are in the contexts, each separate
- path - that is the novel part
- popup
- root (location)
- contextMenuContext - tracking position - possibly not needed really

## current errors
- [ ] does not reload when new thing created - need a listener to refresh things on event, probably in the context object
- [x] edit folder does not use the name first
- [ ] sometimes path gets too many items
- [ ] search does not change the path - then clicking on 'current path' does not redirect
- [x] side subtree and side element circular dependency
- [ ] side 
- [ ] ctrl + a does not select everything in the table, but all text

# for later
## separate for later
- [ ] drag and drop - that whole thing can be after the MVP
- [ ] use stack for undo

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
