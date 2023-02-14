
- [ ] if more than 1 selected, only delete, no edit - instead 'move to common folder' 

## refactor
- [x] split global tree into context, with callbacks

### MVP
- [ ] working paste and copy
- [ ] add table context menu not only on left click, but also button - need to simplify the getData and column creation utilities
- [ ] add checkbox column for precision marking
- [ ] side subtree gets error on deletion. also the erroneous state with 0 is preserved for far too long. cannot read properties of undefined props.node

- [ ] fix search bookmarks field positioning
- [ ] add proper menus on context
- [ ] automatic addition of a ;source website column', sortable

## drag and drop
- [ ] done API
https://www.w3schools.com/html/html5_draganddrop.asp
browser provides the image for dragging
https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API
- [ ] make the table receptive to drop
- [ ] make the path receptive to drop

### customization options
- [ ] dynamically load number of contents of the page
- [ ] more search options
- [ ] alternating table styles
- [ ] settings menu
- [ ] colors
- [ ] history, and minimenu visible as smaller wrappers

### decided against
- [ ] do rows as lower level container