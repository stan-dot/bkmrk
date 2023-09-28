
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

## dev features
- [ ] useSearchParams
- [ ] maybe history shouldn't be updated directly, but only downstream from the Path context object?
- [ ] consider summary-detail html5 instead of unrolled boolean
- [ ] consider side tree element issues
- [ ] copy export from chromium actually
- [ ] use suspense syntax instead of loading screen
- [ ] lower panel is invisible rn if search results mode

## diagram
global states are in the contexts, each separate
- path - that is the novel part
- popup
- root
- contextMenuContext - tracking position
- history - nullified by useSearchParams, both for search and path

## separate for later
- [ ] drag and drop - that whole thing can be after the MVP

  ## deleted eslint config
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },