
modules
- analytics module
- batch operations manager - for delete multiple, etc
- search manager class
- validator
- api connector
- settings manager I guess

## supersorter functions
- [ ] autosort
- [ ] reverse sort
- [ ] folders before bookmarks
- [ ] delete empty folders
- [ ] merge neighboring folders
- [ ] delete duplicates in the same folder
- [ ] use case sensitive name comparisons
- [ ] ignore bookmarks bar
- [ ] don't start sorting if Bookmark Manager is active
- [ ] treat http and https as equivalent
- [ ] identify duplicates by URL only (ignore titles)
EXTRA
- [ ] add sorting by name and time time selection for exploration view when added

## dev features
- [ ] useSearchParams
- [ ] maybe history shouldn't be updated directly, but only downstream from the Path context object?
- [ ] consider summary-detail html5 instead of unrolled boolean
- [ ] consider side tree element issues
- [ ] use suspense syntax instead of loading screen
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
- [ ] edit folder does not use the name first
- [ ] sometimes path gets too many items
- [ ] search does not change the path - then clicking on 'current path' does not redirect
- [ ] try a simpler, local context menu for clicking from a tutorial and see if all works there. right now both the location and the passing of props do not work for edition
- [ ] side subtree and side element circular dependency
- [ ] side 
- [ ] ctrl + a does not select everything in the table, but all text

# for later
## separate for later
- [ ] drag and drop - that whole thing can be after the MVP

## deleted eslint config
"eslintConfig": {
  "extends": [
    "react-app",
    "react-app/jest"
  ]
},
