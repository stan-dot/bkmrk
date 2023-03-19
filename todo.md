

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
- [ ] fix reloading
- [ ] fix the click does not work right with double click but right with context click
- [ ] fix the broken alerts and context menus
- [ ] back and front buttons for path navigation

- [ ] context for basic nodes - language independent

### bug fixes
- [ ] wrong row gets targeted for any changes
- [ ] side subtree gets error on deletion. also the erroneous state with 0 is preserved for far too long. cannot read properties of undefined props.node

# after mvp
### QoL features
- [ ] working paste and copy
  - [ ] make the table receptive to drop
  - [ ] make the path receptive to drop
### power user expansions
- [ ] automatic addition of a 'source website column', sortable
- [ ] add checkbox column for precision marking
- [ ] if more than 1 selected, only delete, no edit - instead 'move to common folder' 

### customization options
- [ ] dynamically load number of contents of the page
- [ ] more search options
- [ ] alternating table styles
- [ ] settings menu
- [ ] colors
- [ ] history, and minimenu visible as smaller wrappers

### recently done
- [x] split global tree into context, with callbacks
- [x] add table context menu not only on left click, but also button - need to simplify the getData and column creation utilities

### decided against
- [ ] do rows as lower level container