
modules
- analytics module
- batch operations manager - for delete multiple, etc
- search manager class
- validator
- api connector
- settings manager I guess

- [x] change to my local node types in most places, my own interfaces
- [ ] change all to local types - must 
  - [ ] change
  - [ ] remove
  - [ ] get
  - [ ] getTree
- [x] change useEffect in most places
- [ ] change useEffect to custom effect hooks - that requires disassembling `Table.tsx`
- [x] some useBookmark hook?
- [ ] possibly use a custom event listener for all the history and path changes - for these to be automatic

## dev features
- [ ] useSearchParams
- [ ] maybe history shouldn't be updated directly, but only downstream from the Path context object?
- [ ] consider summary-detail html5 instead of unrolled boolean
- [ ] consider side tree element issues
- [ ] lower panel is invisible rn if search results mode

## diagram
global states are in the contexts, each separate
- path - that is the novel part
- popup
- root
- contextMenuContext - tracking position
- history - nullified by useSearchParams, both for search and path

## current errors
- [ ] does not reload when new thing created - need a listener to refresh things on event, probably in the context object
- [x] edit folder does not use the name first
- [ ] sometimes path gets too many items
- [ ] search does not change the path - then clicking on 'current path' does not redirect
- [ ] try a simpler, local context menu for clicking from a tutorial and see if all works there. right now both the location and the passing of props do not work for edition
- [ ] side subtree and side element circular dependency
- [ ] side 
- [ ] ctrl + a does not select everything in the table, but all text
- [ ] fix that listener argument

# for later
## separate for later
- [ ] drag and drop - that whole thing can be after the MVP
- [ ] use stack for undo

## rejected
- [x] use suspense syntax instead of loading screen - nah that's only if a framework or lazy code

## deleted eslint config
"eslintConfig": {
  "extends": [
    "react-app",
    "react-app/jest"
  ]
},
